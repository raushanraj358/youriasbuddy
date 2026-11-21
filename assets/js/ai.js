// AI client. Uses the visitor's own key from Settings if present, otherwise the site's free AI
// (a Supabase Edge Function that holds the Gemini key and enforces a daily allowance per user / per guest).
import { S } from './store.js';
import { buildMessages } from './prompts.js';
import { callAI } from './providers.js';
import { config, aiEndpoint } from './config.js';
import { accessToken, cloud } from './cloud.js';
import { dateKey } from './utils.js';

const USE_KEY = 'yib:aiuse';
/** Free AI requests used today, as last reported by the server: { used, limit }. */
export function aiUsage() {
  const limit = cloud().user ? config().aiDailyLimit : config().aiGuestLimit;
  try {
    const u = JSON.parse(localStorage.getItem(USE_KEY)) || {};
    if (u.date === dateKey() && u.who === (cloud().user?.id || 'guest')) return { used: u.used || 0, limit: u.limit || limit };
  } catch {}
  return { used: 0, limit };
}
function saveUse(used, limit) {
  try { localStorage.setItem(USE_KEY, JSON.stringify({ date: dateKey(), who: cloud().user?.id || 'guest', used, limit })); } catch {}
}

export class AIError extends Error {
  constructor(msg, code) {
    super(msg);
    this.code = code;
  }
}

function parseJSON(text) {
  if (!text) throw new AIError('Empty response from AI', 'EMPTY');
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const m = cleaned.match(/\{[\s\S]*\}/);
    if (m) {
      try { return JSON.parse(m[0]); } catch {}
    }
    throw new AIError('The AI returned an unreadable response. Please try again.', 'PARSE');
  }
}

export function activeAI() {
  const s = S().settings;
  const provider = s.provider === 'openai' ? 'openai' : 'gemini';
  return provider === 'openai'
    ? { provider, key: s.apiKey, model: s.model || 'gpt-4o-mini' }
    : { provider, key: s.geminiKey, model: s.geminiModel || 'auto' };
}

export async function runAI(task, params, { signal } = {}) {
  const { provider, key, model } = activeAI();
  let content;

  if (key) {
    try {
      content = await callAI({ provider, key, model, messages: buildMessages(task, params), signal });
    } catch (e) {
      if (e.name === 'AbortError') throw e;
      throw new AIError(e.message, e.code || 'API');
    }
  } else {
    if (!config().serverAI) throw new AIError('AI is not set up on this site yet. Add your free Gemini API key in Settings (takes 1 minute).', 'NO_KEY');
    const token = (await accessToken()) || config().supabaseAnonKey;
    let res;
    try {
      res = await fetch(aiEndpoint(), {
        method: 'POST',
        signal,
        headers: { 'Content-Type': 'application/json', apikey: config().supabaseAnonKey, Authorization: `Bearer ${token}` },
        body: JSON.stringify({ task, params }),
      });
    } catch (e) {
      if (e.name === 'AbortError') throw e;
      throw new AIError('Could not reach the AI server. Check your connection and try again.', 'API');
    }
    const data = await res.json().catch(() => null);
    if (data && Number.isFinite(data.used)) saveUse(data.used, data.limit);
    if (!res.ok || !data) {
      if (res.status === 404 || !data) throw new AIError('The free AI is not available right now. You can add your own free Gemini key in Settings.', 'NO_KEY');
      throw new AIError(data.error || `AI server error (${res.status})`, res.status === 429 ? 'RATE' : 'API');
    }
    content = data.content;
  }
  return parseJSON(content);
}

export function hasAI() {
  const s = S().settings;
  return Boolean(s.geminiKey || s.apiKey) || config().serverAI;
}
/** True when the visitor is using the site's built-in (shared) AI rather than their own key. */
export function usingServerAI() {
  const { key } = activeAI();
  return !key && config().serverAI;
}

/** Normalise & validate MCQs coming back from the model. */
export function cleanMCQs(raw) {
  const list = Array.isArray(raw?.questions) ? raw.questions : Array.isArray(raw) ? raw : [];
  return list
    .map((q) => ({
      passage: String(q.passage || ''),
      stem: String(q.stem || q.question || ''),
      statements: Array.isArray(q.statements) ? q.statements.map(String).filter(Boolean) : [],
      ask: String(q.ask || ''),
      options: Array.isArray(q.options) ? q.options.map(String).slice(0, 4) : [],
      answer: Number(q.answer),
      explanation: String(q.explanation || ''),
      concept: String(q.concept || ''),
    }))
    .filter((q) => q.stem && q.options.length === 4 && Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4);
}
