// Offline MCQ bank, a few questions per syllabus topic, so practice works without AI or a network call to an AI service.
// One lazily-imported module per subject in ./quizbank/<subjectId>.js, each exporting
//   QUESTIONS = { '<exact SYLLABUS topic name>': [{ q, s?, ask?, o, a, e, p? }] }
//   q: stem · s: numbered statements/pairs · ask: question after the statements · o: 4 options or a shorthand below
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

const cache = {};

export async function subjectBank(sub) {
  if (!SUBJECTS.some((s) => s.id === sub)) return {};
  if (!cache[sub]) cache[sub] = import(`./quizbank/${sub}.js`).then((m) => m.QUESTIONS || {}).catch(() => ({}));
  return cache[sub];
}

function normalise(x, topic) {
  const short = typeof x.o === 'string' ? x.o : '';
  const statements = x.s || [];
  return {
    passage: x.p || '', concept: topic, stem: x.q, statements,
    ask: x.ask || (statements.length ? ASK[short] || ASK.C2 : ''),
    options: short ? OPTS[short] : x.o, answer: x.a, explanation: x.e,
  };
}

/** Questions for one topic, or for the whole subject when the topic has none (or isn't given). Normalised for the quiz player. */
export async function offlineQuestions(sub, topic) {
  const bank = await subjectBank(sub);
  if (topic && bank[topic]?.length) return bank[topic].map((x) => normalise(x, topic));
  return Object.entries(bank).flatMap(([t, qs]) => qs.map((x) => normalise(x, t)));
}
