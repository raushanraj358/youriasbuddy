// Vercel serverless function: POST /api/ai
// Keeps GEMINI_API_KEY (free) or OPENAI_API_KEY on the server. Prompts are built server-side from a fixed whitelist of tasks,
// so this endpoint cannot be used as a general-purpose OpenAI proxy.
import { buildMessages } from '../assets/js/prompts.js';
import { callAI } from '../assets/js/providers.js';

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = Number(process.env.AI_RATE_LIMIT_PER_HOUR || 40);
const hits = new Map(); // best-effort, per warm instance

function limited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  return list.length > MAX_PER_WINDOW;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  // Prefer free Gemini when configured; fall back to OpenAI.
  const provider = process.env.GEMINI_API_KEY ? 'gemini' : process.env.OPENAI_API_KEY ? 'openai' : null;
  if (!provider) return res.status(501).json({ error: 'Server AI is not configured' });
  const key = provider === 'gemini' ? process.env.GEMINI_API_KEY : process.env.OPENAI_API_KEY;
  const model = provider === 'gemini' ? process.env.GEMINI_MODEL || 'auto' : process.env.OPENAI_MODEL || 'gpt-4o-mini';

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'anon';
  if (limited(ip)) return res.status(429).json({ error: 'Too many AI requests. Please try again in a while.' });

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const { task, params } = body || {};

  let messages;
  try {
    messages = buildMessages(task, params || {});
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }

  try {
    const content = await callAI({ provider, key, model, messages });
    return res.status(200).json({ content });
  } catch (e) {
    const status = e.code === 'RATE' ? 429 : 502;
    return res.status(status).json({ error: e.code === 'AUTH' ? 'The server AI key is invalid.' : e.message || 'AI provider error' });
  }
}
