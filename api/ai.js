// Vercel serverless function: POST /api/ai
// Keeps OPENAI_API_KEY on the server. Prompts are built server-side from a fixed whitelist of tasks,
// so this endpoint cannot be used as a general-purpose OpenAI proxy.
import { buildMessages } from '../assets/js/prompts.js';

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
  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(501).json({ error: 'Server AI is not configured' });

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
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages,
        response_format: { type: 'json_object' },
      }),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) return res.status(502).json({ error: data?.error?.message || 'Upstream AI error' });
    return res.status(200).json({ content: data?.choices?.[0]?.message?.content || '' });
  } catch (e) {
    return res.status(502).json({ error: 'Could not reach OpenAI' });
  }
}
