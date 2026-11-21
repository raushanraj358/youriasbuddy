// AI provider adapters (Google Gemini + OpenAI). Pure fetch, no DOM; runs in the browser and in the Supabase Edge Function.
// Errors shown to people always use the standard messages below. Providers' raw error text only goes to the console.

export class ProviderError extends Error {
  constructor(msg, code, status) {
    super(msg);
    this.code = code; // AUTH | RATE | MODEL | API | BLOCKED | EMPTY
    this.status = status;
  }
}

export const AI_MESSAGES = {
  AUTH: 'Your API key was rejected. Please re-copy it into Settings.',
  RATE: 'The AI is busy right now. Please wait a minute and try again.',
  MODEL: 'The selected AI model is not available. Choose "Auto" in Settings and try again.',
  BLOCKED: "The AI couldn't answer this request. Please try rephrasing the topic.",
  API: 'The AI service is temporarily unavailable. Please try again in a few minutes.',
};

function fail(code, status, raw) {
  if (raw) console.warn(`[AI ${code} ${status}]`, raw);
  return new ProviderError(AI_MESSAGES[code] || AI_MESSAGES.API, code, status);
}

/** True when an error says the model is missing, retired or unsupported (so Auto should try the next one). */
export function isModelUnavailable(status, msg = '') {
  return status === 404 || /no longer available|not found|not supported|unsupported|deprecated|is not available|decommission|retired/i.test(msg);
}

const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta';

// "Auto" tries these in order and moves on when a model is missing, retired or out of free quota.
// The -latest aliases track Google's current Flash models; the named 3.5 models are a safety net.
export const GEMINI_AUTO_CHAIN = ['gemini-flash-latest', 'gemini-flash-lite-latest', 'gemini-3.5-flash', 'gemini-3.5-flash-lite'];

function split(messages) {
  const system = messages.filter((m) => m.role === 'system').map((m) => m.content).join('\n\n');
  const user = messages.filter((m) => m.role !== 'system').map((m) => m.content).join('\n\n');
  return { system, user };
}

async function geminiOnce({ key, model, messages, signal }) {
  const { system, user } = split(messages);
  const res = await fetch(`${GEMINI_BASE}/models/${encodeURIComponent(model)}:generateContent`, {
    method: 'POST',
    signal,
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ role: 'user', parts: [{ text: user }] }],
      generationConfig: { responseMimeType: 'application/json', temperature: 0.7 },
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (res.ok) {
    const cand = data?.candidates?.[0];
    const text = (cand?.content?.parts || []).filter((p) => !p.thought).map((p) => p.text || '').join('');
    if (!text) throw fail('BLOCKED', 200, `no text: ${data?.promptFeedback?.blockReason || cand?.finishReason || 'unknown'}`);
    return text;
  }
  const msg = data?.error?.message || '';
  if (isModelUnavailable(res.status, msg)) throw fail('MODEL', res.status, `${model}: ${msg}`);
  if (res.status === 401 || res.status === 403 || (res.status === 400 && /api key/i.test(msg))) throw fail('AUTH', res.status, msg);
  if (res.status === 429) throw fail('RATE', 429, msg);
  throw fail('API', res.status, msg);
}

export async function callGemini({ key, model, messages, signal }) {
  const chain = !model || model === 'auto' ? GEMINI_AUTO_CHAIN : [model];
  let last;
  for (const m of chain) {
    try {
      return await geminiOnce({ key, model: m, messages, signal });
    } catch (e) {
      if (e.name === 'AbortError' || e.code === 'AUTH' || e.code === 'BLOCKED') throw e;
      last = e;
      // Fall through to the next model on missing model / quota / transient server errors.
      if (!['MODEL', 'RATE'].includes(e.code) && !(e.status >= 500)) throw e;
    }
  }
  // Every model failed: report "busy" for quota limits, otherwise a general "unavailable".
  if (chain.length > 1 && last?.code !== 'RATE') throw new ProviderError(AI_MESSAGES.API, 'API', last?.status);
  throw last;
}

export async function listGeminiModels(key) {
  const res = await fetch(`${GEMINI_BASE}/models?pageSize=200`, { headers: { 'x-goog-api-key': key } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if ([400, 401, 403].includes(res.status)) throw fail('AUTH', res.status, data?.error?.message);
    throw fail('API', res.status, data?.error?.message);
  }
  return (data.models || [])
    .filter((m) => (m.supportedGenerationMethods || []).includes('generateContent'))
    .map((m) => m.name.replace(/^models\//, ''))
    .filter((n) => /^gemini/.test(n) && !/(embed|image|tts|audio|live|vision|computer|robotics|aqa)/i.test(n))
    .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
}

export async function callOpenAI({ key, model, messages, signal }) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    signal,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model: model || 'gpt-4o-mini', messages, response_format: { type: 'json_object' } }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.error?.message || '';
    if (res.status === 401) throw fail('AUTH', 401, msg);
    if (res.status === 429) throw fail('RATE', 429, msg);
    if (isModelUnavailable(res.status, msg)) throw fail('MODEL', res.status, msg);
    throw fail('API', res.status, msg);
  }
  return data?.choices?.[0]?.message?.content || '';
}

export function callAI({ provider, ...rest }) {
  return provider === 'openai' ? callOpenAI(rest) : callGemini(rest);
}
