// AI provider adapters (Google Gemini + OpenAI). Pure fetch, no DOM — runs in the browser and in Node 18+ (api/ai.js).

export class ProviderError extends Error {
  constructor(msg, code, status) {
    super(msg);
    this.code = code; // AUTH | RATE | MODEL | API | BLOCKED | EMPTY
    this.status = status;
  }
}

const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta';

// "Auto" tries these in order and moves on when a model is missing or out of free quota.
// The -latest aliases track Google's current Flash models; the 2.5 names are a safety net.
export const GEMINI_AUTO_CHAIN = ['gemini-flash-latest', 'gemini-flash-lite-latest', 'gemini-2.5-flash', 'gemini-2.5-flash-lite'];

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
    if (!text) {
      const reason = data?.promptFeedback?.blockReason || cand?.finishReason || 'unknown';
      throw new ProviderError(`Gemini returned no text (reason: ${reason}). Try rephrasing the topic.`, 'BLOCKED', 200);
    }
    return text;
  }
  const msg = data?.error?.message || `Gemini error (${res.status})`;
  if (res.status === 401 || res.status === 403 || (res.status === 400 && /api key/i.test(msg))) {
    throw new ProviderError('Your Gemini API key was rejected. Re-copy it from Google AI Studio into Settings.', 'AUTH', res.status);
  }
  if (res.status === 429) throw new ProviderError('Gemini free-tier limit reached. Wait a minute and retry — daily limits reset at midnight Pacific time (1:30 PM IST).', 'RATE', 429);
  if (res.status === 404) throw new ProviderError(`Model "${model}" isn't available for your key. Pick another in Settings.`, 'MODEL', 404);
  throw new ProviderError(msg, 'API', res.status);
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
  throw last;
}

export async function listGeminiModels(key) {
  const res = await fetch(`${GEMINI_BASE}/models?pageSize=200`, { headers: { 'x-goog-api-key': key } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if ([400, 401, 403].includes(res.status)) throw new ProviderError('Your Gemini API key was rejected. Re-copy it from Google AI Studio.', 'AUTH', res.status);
    throw new ProviderError(data?.error?.message || `Gemini error (${res.status})`, 'API', res.status);
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
    if (res.status === 401) throw new ProviderError('Your OpenAI API key was rejected. Check it in Settings.', 'AUTH', 401);
    if (res.status === 429) throw new ProviderError('OpenAI quota exceeded — add billing credit or switch to free Gemini in Settings.', 'RATE', 429);
    throw new ProviderError(data?.error?.message || `OpenAI error (${res.status})`, 'API', res.status);
  }
  return data?.choices?.[0]?.message?.content || '';
}

export function callAI({ provider, ...rest }) {
  return provider === 'openai' ? callOpenAI(rest) : callGemini(rest);
}
