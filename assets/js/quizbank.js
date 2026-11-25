// Offline MCQ bank, a few questions per syllabus topic, so practice works without AI or a network call to an AI service.
// Lazily-imported modules per subject: ./quizbank/<subjectId>.js plus extra parts <subjectId>-2.js, -3.js … (count in PARTS), each exporting
//   QUESTIONS = { '<exact SYLLABUS topic name>': [{ q, s?, ask?, o, a, e, p? }] }
//   q: stem (optional with s: defaults to "Consider the following statements/pairs:") · s: numbered statements/pairs · ask: question after the statements · o: 4 options or a shorthand below
//   a: index of the correct option (0–3) · e: explanation · p: passage (CSAT reading comprehension)
import { SUBJECTS } from './data.js';

// Option shorthands for the standard UPSC statement formats.
const OPTS = {
  C2: ['1 only', '2 only', 'Both 1 and 2', 'Neither 1 nor 2'],
  C3: ['1 and 2 only', '2 and 3 only', '1 and 3 only', '1, 2 and 3'],
  H3: ['Only one', 'Only two', 'All three', 'None'],
  H4: ['Only one', 'Only two', 'Only three', 'All four'],
  P3: ['Only one', 'Only two', 'All three', 'None'],
  P4: ['Only one', 'Only two', 'Only three', 'All four'],
};
const ASK = {
  C2: 'Which of the statements given above is/are correct?',
  C3: 'Which of the statements given above are correct?',
  H3: 'How many of the above statements are correct?',
  H4: 'How many of the above statements are correct?',
  P3: 'How many of the above pairs are correctly matched?',
  P4: 'How many of the above pairs are correctly matched?',
};

// Number of extra part files per subject (<subjectId>-2.js … -<n+1>.js). Update when adding a part.
const PARTS = { polity: 4, history: 5, geography: 3, economy: 3, environment: 2, scitech: 2, culture: 2, ir: 2, society: 2, security: 2, ethics: 2, current: 2, csat: 2 };

const cache = {};
const load = (file) => import(`./quizbank/${file}.js`).then((m) => m.QUESTIONS || {}).catch(() => ({}));

export async function subjectBank(sub) {
  if (!SUBJECTS.some((s) => s.id === sub)) return {};
  if (!cache[sub]) {
    const files = [sub, ...Array.from({ length: PARTS[sub] || 0 }, (_, i) => `${sub}-${i + 2}`)];
    cache[sub] = Promise.all(files.map(load)).then((parts) => {
      const bank = {};
      for (const part of parts) for (const [topic, qs] of Object.entries(part)) (bank[topic] ||= []).push(...qs);
      return bank;
    });
  }
  return cache[sub];
}

// Options that only make sense in a fixed order ("1 only", "Both I and II", "None of these"…) are never shuffled.
const ORDERED = /\b(above|these|both|neither|none|only [0-9IV]|[0-9IV]+ only|I+ follows|[0-9] and [0-9])\b/i;

function normalise(x, topic) {
  const short = typeof x.o === 'string' ? x.o : '';
  const statements = x.s || [];
  let options = short ? OPTS[short] : x.o;
  let answer = x.a;
  // Shuffle free-standing options each time, so the right answer isn't always in the same position.
  if (!short && !options.some((o) => ORDERED.test(o))) {
    const order = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
    options = order.map((i) => x.o[i]);
    answer = order.indexOf(x.a);
  }
  return {
    passage: x.p || '', concept: topic, stem: x.q || (statements.length ? `Consider the following ${short[0] === 'P' ? 'pairs' : 'statements'}:` : ''), statements,
    ask: x.ask || (statements.length ? ASK[short] || ASK.C2 : ''),
    options, answer, explanation: x.e,
  };
}

/** Questions for one topic, or for the whole subject when the topic has none (or isn't given). Normalised for the quiz player. */
export async function offlineQuestions(sub, topic) {
  const bank = await subjectBank(sub);
  if (topic && bank[topic]?.length) return bank[topic].map((x) => normalise(x, topic));
  return Object.entries(bank).flatMap(([t, qs]) => qs.map((x) => normalise(x, t)));
}
