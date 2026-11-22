// Static, offline key notes per syllabus topic. One lazily-imported module per subject in ./content/<subjectId>.js,
// each exporting CONTENT = { '<exact SYLLABUS topic name>': { overview, sections: [[title, [points]]], prelims: [], mains: [], traps: [] } }.
import { SUBJECTS } from './data.js';

const cache = {};

export async function subjectNotes(sub) {
  if (!SUBJECTS.some((s) => s.id === sub)) return {};
  if (!cache[sub]) {
    cache[sub] = import(`./content/${sub}.js`).then((m) => m.CONTENT || {}).catch(() => ({}));
  }
  return cache[sub];
}

export async function keyNotes(sub, topic) {
  return (await subjectNotes(sub))[topic] || null;
}

export function keyNotesMarkdown(n) {
  if (!n) return '';
  const out = [];
  const block = (title, items, wrap = (x) => x) => {
    if (items?.length) out.push(`## ${title}`, ...items.map((x) => `- ${wrap(x)}`), '');
  };
  if (n.overview) out.push(n.overview, '');
  for (const [title, points] of n.sections || []) out.push(`## ${title}`, ...points.map((p) => `- ${p}`), '');
  block('Prelims pointers', n.prelims);
  block('Mains angles', n.mains);
  block('Common traps', n.traps, (x) => `==${x}==`);
  return out.join('\n').trim();
}
