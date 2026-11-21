// Prompt builder shared by the browser (direct OpenAI mode) and the serverless proxy (/api/ai).
// Keep this file free of DOM/browser APIs so it can run in Node.

const str = (v, max) => String(v ?? '').slice(0, max).trim();
const int = (v, lo, hi, d) => {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : d;
};

export const TASKS = ['prelims', 'mains', 'evaluate'];

const SYSTEM = `You are a senior UPSC Civil Services Examination paper-setter and Mains evaluator with two decades of experience.
You write questions that mirror the real UPSC standard: precise wording, conceptual depth, static-current linkage, and plausible distractors.
Accuracy is non-negotiable: use only facts verifiable from standard sources (NCERTs, M. Laxmikanth, Government of India publications, official reports). If unsure of a fact, do not use it.
Always reply with a single valid JSON object and nothing else.`;

export function sanitize(task, p = {}) {
  if (!TASKS.includes(task)) throw new Error('Unknown task');
  const base = {
    subject: str(p.subject, 80) || 'General Studies',
    topic: str(p.topic, 160),
    language: p.language === 'hi' ? 'hi' : 'en',
  };
  if (task === 'prelims') {
    return {
      ...base,
      paper: p.paper === 'csat' ? 'csat' : 'gs',
      count: int(p.count, 1, 20, 10),
      difficulty: str(p.difficulty, 30) || 'UPSC standard',
      patterns: (Array.isArray(p.patterns) ? p.patterns : []).map((x) => str(x, 40)).slice(0, 6),
      context: str(p.context, 6000),
    };
  }
  if (task === 'mains') {
    return { ...base, paper: str(p.paper, 20) || 'GS', count: int(p.count, 1, 5, 2), difficulty: str(p.difficulty, 30) || 'UPSC standard', context: str(p.context, 6000) };
  }
  return {
    ...base,
    question: str(p.question, 1200),
    marks: int(p.marks, 5, 20, 10),
    wordLimit: int(p.wordLimit, 50, 400, 150),
    answer: str(p.answer, 9000),
  };
}

const LANG = (l) => (l === 'hi' ? 'Write everything (questions, options, explanations) in clear standard Hindi (Devanagari) as used in the UPSC Hindi-medium paper. Keep JSON keys in English.' : 'Write in clear Indian English as used in UPSC papers.');

export function buildMessages(task, raw) {
  const p = sanitize(task, raw);
  let user;

  if (task === 'prelims' && p.paper === 'gs') {
    const patterns = p.patterns.length ? p.patterns.join(', ') : 'statement-based, pair matching, Statement-I/Statement-II, direct';
    user = `Create ${p.count} UPSC Civil Services Preliminary Examination (General Studies Paper I) multiple-choice questions.
Subject: ${p.subject}
Topic: ${p.topic || 'a balanced mix of high-yield topics from this subject’s syllabus'}
Difficulty: ${p.difficulty}
Question patterns to mix: ${patterns}
${p.context ? `Base the questions primarily on this study material (you may add closely related standard facts):\n"""\n${p.context}\n"""\n` : ''}
Format rules:
- Statement-based: put each statement (without numbering) in "statements"; "stem" introduces them (e.g. "Consider the following statements regarding ..."); "ask" is either "How many of the above statements are correct?" with options ["Only one","Only two","All three","None"] (adapt to the number of statements), or "Which of the statements given above is/are correct?" with options like ["1 only","2 only","Both 1 and 2","Neither 1 nor 2"].
- Pair matching: "statements" are pairs written as "X : Y"; "ask" is "How many of the above pairs are correctly matched?".
- Statement-I/Statement-II: statements are ["Statement-I: ...","Statement-II: ..."]; options are the standard four: "Both Statement-I and Statement-II are correct and Statement-II explains Statement-I", "Both Statement-I and Statement-II are correct but Statement-II does not explain Statement-I", "Statement-I is correct but Statement-II is incorrect", "Statement-I is incorrect but Statement-II is correct".
- Direct questions: "statements" is [] and "ask" is "".
- Exactly 4 options and exactly one correct answer. Vary the position of the correct answer.
- "explanation": 2–4 sentences on why the answer is right and why the tempting distractors are wrong.
- "concept": a 2–5 word tag of the concept tested.
${LANG(p.language)}
Return JSON exactly like: {"questions":[{"stem":"","statements":[],"ask":"","options":["","","",""],"answer":0,"explanation":"","concept":""}]} where "answer" is the 0-based index of the correct option.`;
  } else if (task === 'prelims') {
    user = `Create ${p.count} UPSC CSAT (Preliminary General Studies Paper II) questions.
Area: ${p.topic || 'a mix of reading comprehension, logical reasoning, and basic numeracy'}
Difficulty: ${p.difficulty}
${p.context ? `Use this passage/material where suitable:\n"""\n${p.context}\n"""\n` : ''}
Rules:
- For comprehension items include the passage in "passage" (120–220 words) and ask an inference/assumption question in "stem".
- For quant/reasoning, give a precise "stem" with all data needed. Double-check every calculation.
- Exactly 4 options, one correct. "explanation" shows the full worked solution concisely.
${LANG(p.language)}
Return JSON exactly like: {"questions":[{"passage":"","stem":"","statements":[],"ask":"","options":["","","",""],"answer":0,"explanation":"","concept":""}]} where "answer" is the 0-based index.`;
  } else if (task === 'mains') {
    user = `Create ${p.count} UPSC Civil Services Mains questions for ${p.paper}.
Subject: ${p.subject}
Topic: ${p.topic || 'high-yield syllabus themes with contemporary relevance'}
Difficulty: ${p.difficulty}
${p.context ? `Ground the questions in this material:\n"""\n${p.context}\n"""\n` : ''}
Rules:
- Mix 10-mark (150 words) and 15-mark (250 words) questions in authentic UPSC style using directives such as Discuss, Critically examine, Analyse, Evaluate, Comment, Elucidate.${p.paper === 'GS-IV' ? ' For Ethics you may include a short case study (marks 20, 250 words).' : ''}
- "demand": one line on what the examiner actually wants.
- "keywords": 6–10 must-use keywords, data points, committees, articles or judgments.
- "framework": a model answer skeleton with "introduction" (1–2 lines), "body" (5–8 crisp points, multi-dimensional), "conclusion" (1–2 forward-looking lines).
${LANG(p.language)}
Return JSON exactly like: {"questions":[{"question":"","paper":"${p.paper}","marks":10,"wordLimit":150,"directive":"","demand":"","keywords":[],"framework":{"introduction":"","body":[],"conclusion":""}}]}`;
  } else {
    user = `Evaluate the following UPSC Mains answer like a strict but constructive UPSC examiner.
Question (${p.marks} marks, ${p.wordLimit} words): ${p.question}
Candidate's answer:
"""
${p.answer}
"""
Assess: understanding of the demand/directive, structure (intro–body–conclusion), multi-dimensional coverage, use of facts/data/examples/articles/committees, balance, word limit, and conclusion quality.
Scoring reality: toppers typically score 40–55% of the maximum marks; an average answer gets 25–35%. Score in steps of 0.5.
${LANG(p.language)}
Return JSON exactly like: {"score":0,"outOf":${p.marks},"verdict":"one-line overall judgement","strengths":[""],"improvements":[""],"missingDimensions":[""],"suggestedIntro":"","suggestedConclusion":""}`;
  }

  return [
    { role: 'system', content: SYSTEM },
    { role: 'user', content: user },
  ];
}
