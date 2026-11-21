// Local-first persistent store (localStorage). All app data lives on the user's device.
import { HABITS } from './data.js';
import { dateKey, addDays, parseKey, startOfDay, daysBetween } from './utils.js';

const KEY = 'yib:v1';

function defaults() {
  return {
    v: 1,
    profile: { name: '', examDate: '2027-05-23', startDate: dateKey(), dailyTarget: 8, onboarded: false },
    settings: { theme: 'system', apiKey: '', model: 'gpt-4o-mini', pomoFocus: 25, pomoBreak: 5, sound: true },
    tasks: {}, // { 'YYYY-MM-DD': [{id,title,subject,mins,done,priority}] }
    journal: {}, // { 'YYYY-MM-DD': 'text' }
    habits: { defs: HABITS.map((h) => ({ ...h })), log: {} }, // log: { date: [habitIds] }
    sessions: [], // {id,date,subject,minutes,note,source,at}
    timer: null,
    reminders: [],
    notes: [],
    resources: [], // user-added
    library: {}, // curated id -> 'todo' | 'doing' | 'done'
    quizzes: [],
  };
}

const MERGE_KEYS = ['profile', 'settings', 'habits'];
function load() {
  const d = defaults();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return d;
    const s = JSON.parse(raw);
    for (const k of Object.keys(s)) {
      if (MERGE_KEYS.includes(k) && s[k] && typeof s[k] === 'object') d[k] = { ...d[k], ...s[k] };
      else d[k] = s[k];
    }
    return d;
  } catch {
    return d;
  }
}

let state = load();
const subs = new Set();

export const S = () => state;
export function subscribe(fn) {
  subs.add(fn);
  return () => subs.delete(fn);
}
export function commit() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    console.error(e);
    window.dispatchEvent(new CustomEvent('yib:toast', { detail: { msg: 'Storage is full — export a backup and delete old data.', type: 'bad' } }));
  }
  subs.forEach((fn) => fn(state));
}
export function replaceAll(next) {
  const d = defaults();
  state = { ...d, ...next, profile: { ...d.profile, ...(next.profile || {}) }, settings: { ...d.settings, ...(next.settings || {}) } };
  commit();
}
export function resetAll() {
  state = defaults();
  commit();
}
export function exportJSON() {
  const copy = JSON.parse(JSON.stringify(state));
  copy.settings.apiKey = ''; // never export secrets
  copy.exportedAt = new Date().toISOString();
  return JSON.stringify(copy, null, 2);
}

/* ---------------- Derived metrics ---------------- */

export function minutesOn(key) {
  return state.sessions.reduce((a, s) => (s.date === key ? a + s.minutes : a), 0);
}
export function minutesByDay() {
  const m = {};
  for (const s of state.sessions) m[s.date] = (m[s.date] || 0) + s.minutes;
  return m;
}
export function lastNDays(n, end = new Date()) {
  const out = [];
  for (let i = n - 1; i >= 0; i--) out.push(dateKey(addDays(end, -i)));
  return out;
}
export function minutesInRange(fromKey, toKey) {
  return state.sessions.reduce((a, s) => (s.date >= fromKey && s.date <= toKey ? a + s.minutes : a), 0);
}
export function studyStreak(minMinutes = 30) {
  const by = minutesByDay();
  let d = new Date();
  // Today doesn't break the streak until it's over.
  if ((by[dateKey(d)] || 0) < minMinutes) d = addDays(d, -1);
  let n = 0;
  while ((by[dateKey(d)] || 0) >= minMinutes) {
    n++;
    d = addDays(d, -1);
  }
  return n;
}
export function bestStreak(minMinutes = 30) {
  const by = minutesByDay();
  const keys = Object.keys(by).filter((k) => by[k] >= minMinutes).sort();
  let best = 0, cur = 0, prev = null;
  for (const k of keys) {
    cur = prev && daysBetween(parseKey(prev), parseKey(k)) === 1 ? cur + 1 : 1;
    best = Math.max(best, cur);
    prev = k;
  }
  return best;
}
export function tasksFor(key) {
  return state.tasks[key] || (state.tasks[key] = []);
}
export function daysToExam() {
  return Math.max(0, daysBetween(new Date(), parseKey(state.profile.examDate)));
}
export function journeyProgress() {
  const start = parseKey(state.profile.startDate || dateKey());
  const end = parseKey(state.profile.examDate);
  const total = Math.max(1, daysBetween(start, end));
  return Math.min(1, Math.max(0, daysBetween(start, new Date()) / total));
}
export function quizAccuracy(days = 30) {
  const since = Date.now() - days * 864e5;
  let c = 0, t = 0;
  for (const q of state.quizzes) {
    if (q.mode === 'mains' || q.at < since) continue;
    c += q.correct;
    t += q.correct + q.wrong;
  }
  return t ? Math.round((c / t) * 100) : null;
}
export function notesDue() {
  const today = dateKey();
  return state.notes.filter((n) => n.nextRevision && n.nextRevision <= today);
}
export function habitDoneCount(key) {
  return (state.habits.log[key] || []).length;
}
export { startOfDay };
