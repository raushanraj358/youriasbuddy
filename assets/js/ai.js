// AI client. Uses the user's own OpenAI key (Settings) if present, otherwise the /api/ai serverless proxy.
import { S } from './store.js';
import { buildMessages } from './prompts.js';

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
    if (m) return JSON.parse(m[0]);
    throw new AIError('The AI returned an unreadable response. Please try again.', 'PARSE');
  }
}

export async function runAI(task, params, { signal } = {}) {
  const { apiKey, model } = S().settings;
  let content;

  if (apiKey) {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      signal,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: model || 'gpt-4o-mini', messages: buildMessages(task, params), response_format: { type: 'json_object' } }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = data?.error?.message || `OpenAI error (${res.status})`;
      throw new AIError(res.status === 401 ? 'Your OpenAI API key was rejected. Check it in Settings.' : msg, res.status === 401 ? 'AUTH' : 'API');
    }
    content = data?.choices?.[0]?.message?.content;
  } else {
    let res;
    try {
      res = await fetch('/api/ai', {
        method: 'POST',
        signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task, params }),
      });
    } catch (e) {
      if (e.name === 'AbortError') throw e;
      throw new AIError('Could not reach the AI server.', 'NO_KEY');
    }
    const data = await res.json().catch(() => null);
    if (!res.ok || !data) {
      if ([404, 405, 501].includes(res.status) || !data) throw new AIError('AI is not configured yet. Add your OpenAI API key in Settings.', 'NO_KEY');
      throw new AIError(data.error || `AI server error (${res.status})`, 'API');
    }
    content = data.content;
  }
  return parseJSON(content);
}

export function hasAI() {
  return Boolean(S().settings.apiKey) || location.protocol === 'https:';
}

/** Normalise & validate MCQs coming back from the model. */
export function cleanMCQs(raw) {
  const list = Array.isArray(raw?.questions) ? raw.questions : [];
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
