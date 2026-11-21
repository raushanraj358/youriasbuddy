// AI client. Uses the key saved in Settings (Gemini or OpenAI) if present, otherwise the /api/ai serverless proxy.
import { S } from './store.js';
import { buildMessages } from './prompts.js';
import { callAI } from './providers.js';

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
    let res;
    try {
      res = await fetch('/api/ai', { method: 'POST', signal, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ task, params }) });
    } catch (e) {
      if (e.name === 'AbortError') throw e;
      throw new AIError('Could not reach the AI server.', 'NO_KEY');
    }
    const data = await res.json().catch(() => null);
    if (!res.ok || !data) {
      if ([404, 405, 501].includes(res.status) || !data) throw new AIError('AI is not set up yet. Add your free Gemini API key in Settings (takes 1 minute).', 'NO_KEY');
      throw new AIError(data.error || `AI server error (${res.status})`, res.status === 429 ? 'RATE' : 'API');
    }
    content = data.content;
  }
  return parseJSON(content);
}

export function hasAI() {
  const s = S().settings;
  return Boolean(s.geminiKey || s.apiKey) || location.protocol === 'https:';
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
