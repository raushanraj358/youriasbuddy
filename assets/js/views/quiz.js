import { S, commit } from '../store.js';
import { icon } from '../icons.js';
import { esc, uid, fmtClock, shuffle, wordCount, timeAgo, dateKey, addDays } from '../utils.js';
import { SUBJECTS, SYLLABUS, SAMPLE_QUIZ, subjectById } from '../data.js';
import { runAI, cleanMCQs, hasAI, friendlyError, AIError } from '../ai.js';
import { toast, hbars, emptyState, ring } from '../ui.js';
import { cachedNews } from '../ai.js';
import { digestToMarkdown } from './news.js';

const DIFFICULTY = ['Foundation', 'Moderate', 'UPSC standard', 'Tough'];
const PATTERNS = ['Statement-based', 'Pair matching', 'Statement-I / Statement-II', 'Direct'];
const MODES = {
  prelims: { label: 'Prelims GS', desc: 'Paper I MCQs · +2 / −0.66', icon: 'target', counts: [5, 10, 15, 20], mark: 2, neg: 2 / 3 },
  csat: { label: 'CSAT', desc: 'Paper II aptitude · +2.5 / −0.83', icon: 'calc', counts: [5, 10, 15], mark: 2.5, neg: 2.5 / 3 },
  mains: { label: 'Mains', desc: 'Write answers · AI evaluation', icon: 'pen', counts: [1, 2, 3, 5] },
};
const LOADING_LINES = ['Scanning the syllabus…', 'Studying PYQ patterns…', 'Framing statements carefully…', 'Crafting tricky distractors…', 'Double-checking facts…', 'Writing explanations…'];

// Module-level state survives navigation within the session.
let cfg = { mode: 'prelims', subject: 'polity', topic: '', difficulty: 'UPSC standard', count: 10, language: 'en', patterns: [...PATTERNS], practice: false, context: '', contextTitle: '' };
let phase = 'setup'; // setup | loading | play | result | mains
let session = null;
let lastError = null;
let controller = null;

export function mount(el, params) {
  if (params.note) {
    const n = S().notes.find((x) => x.id === params.note);
    if (n) {
      cfg.context = `${n.title}\n\n${n.body}`.slice(0, 6000);
      cfg.contextTitle = n.title || 'Untitled note';
      cfg.topic = n.title || '';
      if (n.subject && n.subject !== 'csat') { cfg.subject = n.subject; if (cfg.mode === 'csat') cfg.mode = 'prelims'; }
      phase = 'setup';
    }
  }
  if (params.news) {
    const nd = cachedNews(params.news);
    if (nd?.data) {
      cfg.context = digestToMarkdown(nd.day, nd.data).slice(0, 6000);
      cfg.contextTitle = `Current affairs · ${params.news}`;
      cfg.topic = 'Current affairs of the day';
      cfg.subject = 'current';
      if (cfg.mode === 'csat') cfg.mode = 'prelims';
      phase = 'setup';
    }
  }
  if (params.topic) { cfg.topic = params.topic; phase = 'setup'; }
  if (params.subject && SUBJECTS.some((s) => s.id === params.subject)) cfg.subject = params.subject;

  const draw = () => {
    if (phase === 'setup') el.innerHTML = setupView();
    else if (phase === 'loading') el.innerHTML = loadingView();
    else if (phase === 'play') el.innerHTML = playView();
    else if (phase === 'result') el.innerHTML = resultView();
    else if (phase === 'mains') el.innerHTML = mainsView();
    else if (phase === 'history') el.innerHTML = historyView();
  };

  /* ---------------- Setup ---------------- */
  function setupView() {
    const m = MODES[cfg.mode];
    const topics = cfg.mode === 'csat' ? SYLLABUS.csat : SYLLABUS[cfg.subject] || [];
    const aiReady = hasAI();
    return `
    <div class="quiz-setup">
      <div class="card" style="padding:24px">
        <div class="stack" style="gap:20px">
          <div class="mode-cards">${Object.entries(MODES).map(([k, v]) => `
            <button class="mode-card ${cfg.mode === k ? 'on' : ''}" data-mode="${k}"><span class="mc-ico">${icon(v.icon, 18)}</span><b>${v.label}</b><span>${v.desc}</span></button>`).join('')}</div>

          ${cfg.mode !== 'csat' ? `<div class="field"><span class="label">Subject</span><div class="subj-grid">${SUBJECTS.filter((s) => s.id !== 'csat' && (cfg.mode === 'mains' || s.id !== 'essay')).map((s) => `
            <button class="chip ${cfg.subject === s.id ? 'on' : ''}" data-subject="${s.id}"><span class="dot" style="background:${s.color}"></span>${esc(s.short)}</button>`).join('')}</div></div>` : ''}

          <div class="field">
            <label for="qTopic">Topic <span class="muted" style="font-weight:500">— be as specific as you like</span></label>
            <input class="input" id="qTopic" value="${esc(cfg.topic)}" placeholder="${cfg.mode === 'csat' ? 'e.g. Time & work, Syllogisms' : 'e.g. Anti-defection law, El Niño, Bhakti movement'}" autocomplete="off">
            ${topics.length ? `<div class="row wrap" style="gap:6px;margin-top:4px">${topics.map((t) => `<button class="chip ${cfg.topic === t ? 'on' : ''}" data-topic="${esc(t)}">${esc(t)}</button>`).join('')}</div>` : ''}
          </div>

          <div class="field"><span class="label">Difficulty</span><div class="seg">${DIFFICULTY.map((d) => `<button class="${cfg.difficulty === d ? 'on' : ''}" data-diff="${d}">${d === 'UPSC standard' ? 'UPSC standard' : d}</button>`).join('')}</div></div>
          <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px">
            <div class="field"><span class="label">${cfg.mode === 'mains' ? 'Questions' : 'Number of questions'}</span><div class="seg">${m.counts.map((c) => `<button class="${cfg.count === c ? 'on' : ''}" data-count="${c}">${c}</button>`).join('')}</div></div>
            <div class="field"><span class="label">Language</span><div class="seg"><button class="${cfg.language === 'en' ? 'on' : ''}" data-lang="en">English</button><button class="${cfg.language === 'hi' ? 'on' : ''} hi" data-lang="hi">हिन्दी</button></div></div>
          </div>

          ${cfg.mode === 'prelims' ? `<div class="field"><span class="label">Question patterns</span><div class="row wrap" style="gap:6px">${PATTERNS.map((p) => `<button class="chip ${cfg.patterns.includes(p) ? 'on' : ''}" data-pattern="${p}">${cfg.patterns.includes(p) ? icon('check', 12) : ''}${p}</button>`).join('')}</div></div>` : ''}

          ${cfg.mode !== 'mains' ? `<label class="row" style="cursor:pointer"><span class="switch"><input type="checkbox" id="qPractice" ${cfg.practice ? 'checked' : ''}><span></span></span>
            <span><b style="font-size:14px">Practice mode</b><br><span class="hint">See the answer and explanation right after each question (otherwise: exam mode).</span></span></label>` : ''}

          ${cfg.contextTitle ? `<div class="notice info">${icon('notes', 18)}<div style="flex:1">Quizzing from your note <b>${esc(cfg.contextTitle)}</b></div><button class="icon-btn sm bare" data-clear-context aria-label="Remove note context">${icon('x', 15)}</button></div>`
            : `<details ${cfg.context ? 'open' : ''}><summary class="label" style="cursor:pointer">Paste study material to quiz from (optional)</summary>
              <textarea class="textarea" id="qContext" rows="4" style="margin-top:8px" placeholder="Paste an editorial, PIB release or your notes — questions will be grounded in it.">${esc(cfg.context)}</textarea></details>`}

          ${lastError ? `<div class="notice">${icon('alert', 18)}<div style="flex:1">${esc(lastError.message)}${['NO_KEY', 'AUTH', 'MODEL', 'RATE'].includes(lastError.code) ? ` <a href="#/settings" style="font-weight:700">Open Settings →</a>` : ''}</div></div>`
            : !aiReady ? `<div class="notice info">${icon('key', 18)}<div style="flex:1">To generate fresh questions on any topic, add a <b>free Google Gemini key</b> in <a href="#/settings" style="font-weight:700">Settings</a> (takes 1 minute). Meanwhile, try the offline sample quiz.</div></div>` : ''}

          <div class="row wrap">
            <button class="btn accent lg" data-generate>${icon('sparkles', 17)} Generate ${cfg.mode === 'mains' ? 'Mains questions' : 'quiz'}</button>
            ${cfg.mode !== 'mains' ? `<button class="btn lg ghost" data-sample>Try sample quiz</button>` : ''}
          </div>
        </div>
      </div>
      ${statsPanel()}
    </div>`;
  }

  function statsPanel() {
    const qz = S().quizzes;
    const mcq = qz.filter((q) => q.mode !== 'mains');
    const c = mcq.reduce((a, q) => a + q.correct, 0);
    const w = mcq.reduce((a, q) => a + q.wrong, 0);
    const solved = mcq.reduce((a, q) => a + q.total, 0);
    const acc = c + w ? c / (c + w) : 0;
    const bySub = {};
    mcq.forEach((q) => {
      const k = q.mode === 'csat' ? 'csat' : q.subject;
      bySub[k] ||= { c: 0, t: 0 };
      bySub[k].c += q.correct;
      bySub[k].t += q.correct + q.wrong;
    });
    const items = Object.entries(bySub).filter(([, v]) => v.t).map(([k, v]) => ({ label: subjectById(k).short, value: Math.round((v.c / v.t) * 100), color: subjectById(k).color })).sort((a, b) => a.value - b.value);
    return `
      <div class="stack" style="gap:18px">
        <div class="card">
          <div class="card-head"><h3>${icon('trophy', 17)} Your performance</h3>${qz.length ? `<button class="btn sm ghost" data-history>History</button>` : ''}</div>
          ${qz.length ? `
          <div class="row" style="gap:18px">${ring(acc, 86, 9, 'var(--good)', `${Math.round(acc * 100)}%`)}
            <div class="stack" style="gap:4px"><span><b>${qz.length}</b> <span class="muted">quizzes taken</span></span><span><b>${solved}</b> <span class="muted">MCQs solved</span></span><span><b>${qz.filter((q) => q.mode === 'mains').length}</b> <span class="muted">Mains sets</span></span></div></div>
          ${items.length ? `<hr class="divider"><p class="eyebrow" style="margin-bottom:10px">Accuracy by subject · weakest first</p>${hbars(items, (v) => v + '%')}` : ''}`
          : emptyState('trophy', 'No attempts yet', 'Your accuracy, weak areas and history will appear here.')}
        </div>
        ${qz.length ? `<div class="card"><div class="card-head"><h3>Recent</h3></div><div class="list">${qz.slice(0, 5).map(histRow).join('')}</div></div>` : ''}
      </div>`;
  }

  function histRow(q) {
    const s = q.mode === 'csat' ? subjectById('csat') : subjectById(q.subject);
    const right = q.mode === 'mains' ? (q.maxScore ? `${q.score}/${q.maxScore}` : `${q.total} Q`) : `${q.correct}/${q.total}`;
    return `<button class="li" style="width:100%;background:none;border-left:0;border-right:0;border-top:0;text-align:left;cursor:pointer" data-review="${q.id}" ${q.questions ? '' : 'disabled'}>
      <span class="dot" style="background:${s.color}"></span>
      <div class="li-main"><div class="li-title">${esc(q.topic || s.short)}</div><div class="li-sub">${MODES[q.mode].label}${q.sample ? ' · sample' : ''} · ${timeAgo(q.at)}</div></div>
      <b>${right}</b></button>`;
  }

  function historyView() {
    const qz = S().quizzes;
    return `<div class="row" style="margin-bottom:14px"><button class="btn sm" data-back>${icon('left', 14)} Back</button><span class="spacer"></span>
      ${qz.length ? `<button class="btn sm ghost danger" data-clear-history>${icon('trash', 14)} Clear history</button>` : ''}</div>
      <div class="card">${qz.length ? `<div class="list">${qz.map(histRow).join('')}</div>` : emptyState('trophy', 'No history', '')}</div>`;
  }

  /* ---------------- Loading ---------------- */
  function loadingView() {
    return `<div class="card"><div class="loader"><div class="orbit"></div>
      <div><h3 class="serif" style="font-size:28px">Setting your ${cfg.mode === 'mains' ? 'Mains paper' : 'question paper'}</h3>
      <p class="muted" id="loadLine">${LOADING_LINES[0]}</p></div>
      <div style="width:min(420px,100%)" class="stack"><div class="skeleton"></div><div class="skeleton" style="width:80%"></div><div class="skeleton" style="width:60%"></div></div>
      <button class="btn ghost" data-cancel>Cancel</button></div></div>`;
  }

  async function generate() {
    const isMains = cfg.mode === 'mains';
    const sub = subjectById(cfg.mode === 'csat' ? 'csat' : cfg.subject);
    phase = 'loading';
    lastError = null;
    draw();
    let li = 0;
    const iv = setInterval(() => {
      const n = el.querySelector('#loadLine');
      if (n) n.textContent = LOADING_LINES[++li % LOADING_LINES.length];
    }, 1800);
    controller = new AbortController();
    try {
      const params = {
        subject: sub.name, topic: cfg.topic, difficulty: cfg.difficulty, count: cfg.count, language: cfg.language, context: cfg.context,
        ...(isMains ? { paper: sub.paper === 'GS' ? 'GS-II' : sub.paper } : { paper: cfg.mode === 'csat' ? 'csat' : 'gs', patterns: cfg.patterns }),
      };
      const res = await runAI(isMains ? 'mains' : 'prelims', params, { signal: controller.signal });
      if (isMains) {
        const qs = (res.questions || []).filter((q) => q.question).map((q) => ({
          question: String(q.question), paper: String(q.paper || params.paper), marks: Number(q.marks) || 10, wordLimit: Number(q.wordLimit) || 150,
          directive: String(q.directive || ''), demand: String(q.demand || ''), keywords: Array.isArray(q.keywords) ? q.keywords.map(String) : [],
          framework: q.framework || {}, answer: '', feedback: null, showFw: false,
        }));
        if (!qs.length) throw new AIError('No questions were generated. Please try again.', 'EMPTY');
        session = { kind: 'mains', id: uid(), questions: qs, startedAt: Date.now(), meta: { ...cfg } };
        phase = 'mains';
      } else {
        const qs = cleanMCQs(res);
        if (!qs.length) throw new AIError('The AI response had no valid questions. Please try again.', 'EMPTY');
        startMCQ(qs, false);
      }
    } catch (e) {
      if (e.name === 'AbortError') phase = 'setup';
      else {
        lastError = { message: friendlyError(e), code: e.code };
        phase = 'setup';
      }
    } finally {
      clearInterval(iv);
      controller = null;
    }
    draw();
  }

  function startMCQ(questions, sample) {
    session = { kind: cfg.mode, id: uid(), questions, answers: Array(questions.length).fill(null), review: [], cur: 0, startedAt: Date.now(), sample, practice: cfg.practice, meta: { ...cfg } };
    phase = 'play';
  }

  /* ---------------- MCQ player ---------------- */
  function qBody(q, idx, { answer = null, reveal = false, interactive = true } = {}) {
    return `
      ${q.passage ? `<div class="q-passage ${cfg.language === 'hi' ? 'hi' : ''}">${esc(q.passage)}</div>` : ''}
      <div class="q-stem">${esc(q.stem)}</div>
      ${q.statements.length ? `<ol class="q-statements ${q.statements.every((s) => /^statement[-\s]/i.test(s)) ? 'raw' : ''}">${q.statements.map((s) => `<li><span>${esc(s)}</span></li>`).join('')}</ol>` : ''}
      ${q.ask ? `<div class="q-ask">${esc(q.ask)}</div>` : ''}
      <div class="options">${q.options.map((o, i) => {
        let cls = '';
        if (reveal) cls = i === q.answer ? 'right' : i === answer ? 'wrong' : '';
        else if (answer === i) cls = 'sel';
        return `<button class="opt ${cls}" ${interactive && !reveal ? `data-opt="${i}"` : 'disabled'}><span class="ol">${'ABCD'[i]}</span><span>${esc(o)}</span></button>`;
      }).join('')}</div>
      ${reveal ? `<div class="explain"><b>${answer === null ? 'Not attempted' : answer === q.answer ? '✓ Correct' : '✗ Incorrect'} — Answer: ${'ABCD'[q.answer]}</b>${esc(q.explanation)}</div>` : ''}`;
  }

  function playView() {
    const s = session;
    const q = s.questions[s.cur];
    const n = s.questions.length;
    const a = s.answers[s.cur];
    const locked = s.practice && a !== null;
    const answered = s.answers.filter((x) => x !== null).length;
    const sub = subjectById(s.kind === 'csat' ? 'csat' : s.meta.subject);
    return `
    <div class="q-shell">
      <div class="card q-card">
        <div class="row between" style="margin-bottom:6px">
          <span class="q-num">Question ${s.cur + 1} <span style="font-size:16px">/ ${n}</span></span>
          <span class="row"><span class="tag"><span class="dot" style="background:${sub.color}"></span>${esc(sub.short)}</span>${q.concept ? `<span class="tag">${esc(q.concept)}</span>` : ''}</span>
        </div>
        <div class="progress" style="margin-bottom:22px"><i style="width:${(answered / n) * 100}%"></i></div>
        <div class="stack ${s.meta.language === 'hi' ? 'hi' : ''}" style="gap:16px">${qBody(q, s.cur, { answer: a, reveal: locked })}</div>
        <div class="row" style="margin-top:22px;flex-wrap:wrap">
          <button class="btn" data-nav="-1" ${s.cur === 0 ? 'disabled' : ''}>${icon('left', 16)} Prev</button>
          ${!s.practice ? `<button class="btn ghost" data-mark>${icon('flag', 15)} ${s.review.includes(s.cur) ? 'Unmark' : 'Mark for review'}</button>` : ''}
          ${a !== null && !s.practice ? `<button class="btn ghost" data-clear>Clear</button>` : ''}
          <span class="spacer"></span>
          ${s.cur < n - 1 ? `<button class="btn primary" data-nav="1">Next ${icon('right', 16)}</button>` : `<button class="btn accent" data-submit>Submit ${icon('check', 16)}</button>`}
        </div>
        <p class="hint" style="margin-top:14px">Shortcuts: <span class="kbd">A</span>–<span class="kbd">D</span> answer · <span class="kbd">←</span> <span class="kbd">→</span> navigate</p>
      </div>
      <div class="card" style="position:sticky;top:92px">
        <div class="row between" style="margin-bottom:12px"><span class="eyebrow">Time</span><span class="mono" id="qClock" style="font-size:20px">${fmtClock(Date.now() - s.startedAt)}</span></div>
        <div class="palette">${s.questions.map((qq, i) => {
          let c = '';
          if (s.practice && s.answers[i] !== null) c = s.answers[i] === qq.answer ? 'right' : 'wrong';
          else if (s.answers[i] !== null) c = 'ans';
          return `<button class="${c} ${s.review.includes(i) ? 'rev' : ''} ${i === s.cur ? 'cur' : ''}" data-go="${i}">${i + 1}</button>`;
        }).join('')}</div>
        <hr class="divider">
        <p class="hint">${answered}/${n} answered${s.review.length ? ` · ${s.review.length} marked` : ''}</p>
        <button class="btn accent block" data-submit style="margin-top:12px">Submit test</button>
        <button class="btn ghost block sm" data-quit style="margin-top:6px">Quit</button>
      </div>
    </div>`;
  }

  function submit() {
    const s = session;
    const m = MODES[s.kind];
    let correct = 0, wrong = 0, skipped = 0;
    s.questions.forEach((q, i) => {
      if (s.answers[i] === null) skipped++;
      else if (s.answers[i] === q.answer) correct++;
      else wrong++;
    });
    const score = +(correct * m.mark - wrong * m.neg).toFixed(2);
    s.result = { correct, wrong, skipped, score, maxScore: s.questions.length * m.mark, timeSec: Math.round((Date.now() - s.startedAt) / 1000) };
    saveHistory({ mode: s.kind, subject: s.meta.subject, topic: s.meta.topic, total: s.questions.length, ...s.result, sample: s.sample, questions: s.questions, answers: s.answers });
    phase = 'result';
  }

  function saveHistory(entry) {
    const q = S().quizzes;
    q.unshift({ id: session.id, at: Date.now(), ...entry });
    // Keep full question data only for the most recent 30 attempts to save space.
    q.forEach((x, i) => { if (i >= 30) { delete x.questions; delete x.answers; } });
    if (q.length > 300) q.length = 300;
    commit();
  }

  /* ---------------- Result ---------------- */
  function resultView() {
    const s = session;
    const r = s.result;
    const acc = r.correct + r.wrong ? Math.round((r.correct / (r.correct + r.wrong)) * 100) : 0;
    const verdict = acc >= 80 ? 'Outstanding — topper territory.' : acc >= 65 ? 'Strong attempt. Polish the misses.' : acc >= 45 ? 'Decent. Revise the concepts below.' : 'Tough round — revisit the basics and retry.';
    return `
    <div class="card" style="padding:26px">
      <div class="score-hero">
        ${ring(r.maxScore ? Math.max(0, r.score) / r.maxScore : 0, 150, 12, acc >= 60 ? 'var(--good)' : 'var(--accent)', `<span class="serif" style="font-size:38px;font-weight:400">${acc}%</span><br><span class="hint">accuracy</span>`)}
        <div class="stack" style="gap:14px">
          <div><span class="eyebrow">${MODES[s.kind].label}${s.meta.topic ? ' · ' + esc(s.meta.topic) : ''}${s.sample ? ' · sample' : ''}</span>
          <div class="score-big">${r.score}<small> / ${r.maxScore}</small></div><p class="muted">${verdict} Negative marking applied.</p></div>
          <div class="kpis">
            <div class="kpi"><b style="color:var(--good)">${r.correct}</b><span>Correct</span></div>
            <div class="kpi"><b style="color:var(--bad)">${r.wrong}</b><span>Wrong</span></div>
            <div class="kpi"><b>${r.skipped}</b><span>Skipped</span></div>
            <div class="kpi"><b>${fmtClock(r.timeSec * 1000)}</b><span>Time taken</span></div>
          </div>
          <div class="row wrap">
            <button class="btn accent" data-new>${icon('sparkles', 16)} New quiz</button>
            <button class="btn" data-retake>${icon('revise', 16)} Retake</button>
            ${r.wrong || r.skipped ? `<button class="btn" data-mistakes>${icon('notes', 16)} Save mistakes to Notes</button>` : ''}
          </div>
        </div>
      </div>
    </div>
    <h3 class="serif" style="font-size:28px;margin:28px 0 14px">Answer review</h3>
    <div class="stack" style="gap:14px">${s.questions.map((q, i) => `
      <div class="card ${s.meta.language === 'hi' ? 'hi' : ''}"><div class="row between" style="margin-bottom:10px"><span class="q-num" style="font-size:18px">Q${i + 1}</span>
        <span class="tag" style="${s.answers[i] === null ? '' : s.answers[i] === q.answer ? 'color:var(--good)' : 'color:var(--bad)'}">${s.answers[i] === null ? 'Skipped' : s.answers[i] === q.answer ? '+' + MODES[s.kind].mark : '−' + MODES[s.kind].neg.toFixed(2)}</span></div>
        <div class="stack" style="gap:14px">${qBody(q, i, { answer: s.answers[i], reveal: true, interactive: false })}</div></div>`).join('')}</div>`;
  }

  function saveMistakes() {
    const s = session;
    const lines = [];
    s.questions.forEach((q, i) => {
      if (s.answers[i] === q.answer) return;
      lines.push(`### ${q.stem}`);
      q.statements.forEach((st, k) => lines.push(`${k + 1}. ${st}`));
      if (q.ask) lines.push(`**${q.ask}**`);
      lines.push(`- Your answer: ${s.answers[i] === null ? 'Skipped' : q.options[s.answers[i]]}`);
      lines.push(`- ==Correct: ${q.options[q.answer]}==`);
      lines.push(`> ${q.explanation}`);
      lines.push('');
    });
    const sub = s.kind === 'csat' ? 'csat' : s.meta.subject;
    const note = {
      id: uid(), title: `Mistake book — ${s.meta.topic || subjectById(sub).short} (${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })})`,
      subject: sub, tags: ['mistakes'], body: lines.join('\n'), pinned: false, createdAt: Date.now(), updatedAt: Date.now(),
      revisions: 0, nextRevision: dateKey(addDays(new Date(), 1)),
    };
    S().notes.unshift(note);
    commit();
    toast('Mistakes saved to Notes', 'good', 'Scheduled for revision tomorrow.');
  }

  /* ---------------- Mains ---------------- */
  function mainsView() {
    const s = session;
    return `
    <div class="row wrap" style="margin-bottom:16px">
      <button class="btn sm" data-new>${icon('left', 14)} New set</button>
      <span class="spacer"></span>
      <span class="hint">${s.questions.filter((q) => q.feedback).length}/${s.questions.length} evaluated</span>
      <button class="btn sm accent" data-finish-mains>${icon('check', 14)} Finish & save</button>
    </div>
    <div class="stack" style="gap:18px">${s.questions.map((q, i) => {
      const wc = wordCount(q.answer);
      const fw = q.framework || {};
      const fb = q.feedback;
      return `
      <div class="card mains-q ${s.meta.language === 'hi' ? 'hi' : ''}" style="padding:24px">
        <div class="row wrap"><span class="q-num">Q${i + 1}</span><span class="tag">${esc(q.paper)}</span><span class="tag">${q.marks} marks</span><span class="tag">${q.wordLimit} words</span>${q.directive ? `<span class="tag" style="color:var(--accent)">${esc(q.directive)}</span>` : ''}</div>
        <div class="q-text">${esc(q.question)}</div>
        <textarea class="textarea answer-box" data-ans="${i}" placeholder="Write your answer here. Aim for intro → body (multi-dimensional) → way forward. Use keywords, data, articles, committees and examples.">${esc(q.answer)}</textarea>
        <div class="row wrap">
          <span class="hint" data-wc="${i}" style="${wc > q.wordLimit * 1.15 ? 'color:var(--bad)' : ''}">${wc} / ${q.wordLimit} words</span>
          <span class="spacer"></span>
          <button class="btn sm" data-fw="${i}">${icon('eye', 14)} ${q.showFw ? 'Hide' : 'Show'} answer framework</button>
          <button class="btn sm primary" data-eval="${i}" ${q.evaluating ? 'disabled' : ''}>${q.evaluating ? 'Evaluating…' : `${icon('sparkles', 14)} Evaluate with AI`}</button>
        </div>
        ${q.evalError ? `<div class="notice">${icon('alert', 18)}<div>${esc(q.evalError)}</div></div>` : ''}
        ${fb ? `
          <div class="row" style="gap:16px;align-items:center;padding:14px;border-radius:14px;background:var(--surface-2);border:1px solid var(--line)">
            ${ring((Number(fb.score) || 0) / (Number(fb.outOf) || q.marks), 64, 7, 'var(--accent)', `${fb.score}`)}
            <div><b style="font-size:16px">${fb.score} / ${fb.outOf || q.marks}</b><p class="muted">${esc(fb.verdict || '')}</p></div>
          </div>
          <div class="fb-grid">
            <div class="fb good"><h5>Strengths</h5><ul>${(fb.strengths || []).map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
            <div class="fb bad"><h5>Improve</h5><ul>${(fb.improvements || []).map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
            ${(fb.missingDimensions || []).length ? `<div class="fb info"><h5>Missing dimensions</h5><ul>${fb.missingDimensions.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>` : ''}
            ${fb.suggestedIntro || fb.suggestedConclusion ? `<div class="fb"><h5>Better intro & conclusion</h5><ul>${fb.suggestedIntro ? `<li><b>Intro:</b> ${esc(fb.suggestedIntro)}</li>` : ''}${fb.suggestedConclusion ? `<li><b>Conclusion:</b> ${esc(fb.suggestedConclusion)}</li>` : ''}</ul></div>` : ''}
          </div>` : ''}
        ${q.showFw ? `
          <div class="fb" style="background:var(--accent-soft);border-color:transparent">
            ${q.demand ? `<p style="margin-bottom:10px"><b>Demand of the question:</b> ${esc(q.demand)}</p>` : ''}
            ${fw.introduction ? `<p><b>Introduction:</b> ${esc(fw.introduction)}</p>` : ''}
            ${(fw.body || []).length ? `<p style="margin-top:8px"><b>Body:</b></p><ul>${fw.body.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
            ${fw.conclusion ? `<p style="margin-top:8px"><b>Conclusion:</b> ${esc(fw.conclusion)}</p>` : ''}
            ${q.keywords.length ? `<div class="row wrap" style="gap:6px;margin-top:12px">${q.keywords.map((k) => `<span class="tag">${esc(k)}</span>`).join('')}</div>` : ''}
          </div>` : ''}
      </div>`;
    }).join('')}</div>`;
  }

  async function evaluate(i) {
    const q = session.questions[i];
    if (wordCount(q.answer) < 30) return toast('Write at least 30 words before evaluation', 'bad');
    q.evaluating = true;
    q.evalError = null;
    draw();
    try {
      const fb = await runAI('evaluate', { question: q.question, marks: q.marks, wordLimit: q.wordLimit, answer: q.answer, language: session.meta.language, subject: session.meta.subject });
      q.feedback = { ...fb, score: Number(fb.score) || 0, outOf: Number(fb.outOf) || q.marks };
    } catch (e) {
      q.evalError = friendlyError(e);
    }
    q.evaluating = false;
    if (phase === 'mains') draw();
  }

  function finishMains() {
    const s = session;
    const ev = s.questions.filter((q) => q.feedback);
    saveHistory({
      mode: 'mains', subject: s.meta.subject, topic: s.meta.topic, total: s.questions.length, correct: 0, wrong: 0, skipped: 0,
      score: +ev.reduce((a, q) => a + q.feedback.score, 0).toFixed(1), maxScore: ev.reduce((a, q) => a + (q.feedback.outOf || q.marks), 0),
      questions: s.questions.map(({ evaluating, evalError, ...q }) => q),
    });
    toast('Mains practice saved', 'good');
    session = null;
    phase = 'setup';
    draw();
  }

  /* ---------------- Events ---------------- */
  el.addEventListener('click', async (e) => {
    const b = e.target.closest('button');
    if (!b || b.disabled) return;
    const d = b.dataset;
    if (d.mode) { cfg.mode = d.mode; cfg.count = MODES[d.mode].counts.includes(cfg.count) ? cfg.count : MODES[d.mode].counts[1] || MODES[d.mode].counts[0]; if (d.mode !== 'csat' && cfg.subject === 'essay' && d.mode !== 'mains') cfg.subject = 'polity'; cfg.topic = ''; lastError = null; draw(); }
    else if (d.subject) { cfg.subject = d.subject; cfg.topic = ''; draw(); }
    else if (d.topic !== undefined) { cfg.topic = cfg.topic === d.topic ? '' : d.topic; draw(); }
    else if (d.diff) { cfg.difficulty = d.diff; draw(); }
    else if (d.count) { cfg.count = Number(d.count); draw(); }
    else if (d.lang) { cfg.language = d.lang; draw(); }
    else if (d.pattern) {
      const i = cfg.patterns.indexOf(d.pattern);
      if (i >= 0 && cfg.patterns.length > 1) cfg.patterns.splice(i, 1);
      else if (i < 0) cfg.patterns.push(d.pattern);
      draw();
    } else if ('clearContext' in d) { cfg.context = ''; cfg.contextTitle = ''; draw(); }
    else if ('generate' in d) generate();
    else if ('sample' in d) {
      const pool = cfg.mode === 'csat' ? SAMPLE_QUIZ.filter((q) => q.subject === 'csat') : SAMPLE_QUIZ.filter((q) => q.subject !== 'csat');
      startMCQ(shuffle(pool).map((q) => ({ passage: '', concept: '', ...q })), true);
      draw();
    } else if ('cancel' in d) { controller?.abort(); }
    else if (d.opt !== undefined) {
      session.answers[session.cur] = Number(d.opt);
      draw();
    } else if (d.nav) { session.cur = Math.max(0, Math.min(session.questions.length - 1, session.cur + Number(d.nav))); draw(); }
    else if (d.go !== undefined) { session.cur = Number(d.go); draw(); }
    else if ('mark' in d) { const r = session.review; const i = r.indexOf(session.cur); i >= 0 ? r.splice(i, 1) : r.push(session.cur); draw(); }
    else if ('clear' in d) { session.answers[session.cur] = null; draw(); }
    else if ('submit' in d) {
      const left = session.answers.filter((x) => x === null).length;
      if (left && !confirm(`${left} question(s) unanswered. Submit anyway?`)) return;
      submit();
      draw();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if ('quit' in d) { if (confirm('Quit this quiz? Progress will be lost.')) { session = null; phase = 'setup'; draw(); } }
    else if ('new' in d) { session = null; phase = 'setup'; draw(); }
    else if ('retake' in d) { startMCQ(session.questions, session.sample); draw(); }
    else if ('mistakes' in d) { saveMistakes(); b.disabled = true; }
    else if ('history' in d) { phase = 'history'; draw(); }
    else if ('back' in d) { phase = 'setup'; draw(); }
    else if ('clearHistory' in d) { if (confirm('Delete all quiz history?')) { S().quizzes = []; commit(); phase = 'setup'; draw(); } }
    else if (d.review) {
      const h = S().quizzes.find((x) => x.id === d.review);
      if (!h?.questions) return;
      if (h.mode === 'mains') {
        session = { kind: 'mains', id: uid(), questions: h.questions.map((q) => ({ ...q, showFw: false })), startedAt: Date.now(), meta: { ...cfg, subject: h.subject, topic: h.topic } };
        phase = 'mains';
      } else {
        session = { kind: h.mode, id: h.id, questions: h.questions, answers: h.answers, review: [], cur: 0, sample: h.sample, meta: { ...cfg, subject: h.subject, topic: h.topic }, result: { correct: h.correct, wrong: h.wrong, skipped: h.skipped, score: h.score, maxScore: h.maxScore, timeSec: h.timeSec } };
        phase = 'result';
      }
      draw();
      window.scrollTo({ top: 0 });
    } else if (d.fw !== undefined) { const q = session.questions[d.fw]; q.showFw = !q.showFw; draw(); }
    else if (d.eval !== undefined) evaluate(Number(d.eval));
    else if ('finishMains' in d) finishMains();
  });

  el.addEventListener('input', (e) => {
    if (e.target.id === 'qTopic') cfg.topic = e.target.value;
    if (e.target.id === 'qContext') cfg.context = e.target.value;
    if (e.target.dataset.ans !== undefined) {
      const i = Number(e.target.dataset.ans);
      session.questions[i].answer = e.target.value;
      const wc = wordCount(e.target.value);
      const lab = el.querySelector(`[data-wc="${i}"]`);
      lab.textContent = `${wc} / ${session.questions[i].wordLimit} words`;
      lab.style.color = wc > session.questions[i].wordLimit * 1.15 ? 'var(--bad)' : '';
    }
  });
  el.addEventListener('change', (e) => {
    if (e.target.id === 'qPractice') cfg.practice = e.target.checked;
  });
  el.addEventListener('keydown', (e) => {
    if (e.target.id === 'qTopic' && e.key === 'Enter') generate();
  });

  const onKey = (e) => {
    if (phase !== 'play' || e.target.matches('input, textarea, select')) return;
    const k = e.key.toUpperCase();
    const idx = 'ABCD'.indexOf(k) >= 0 ? 'ABCD'.indexOf(k) : '1234'.indexOf(k);
    const locked = session.practice && session.answers[session.cur] !== null;
    if (idx >= 0 && !locked) { session.answers[session.cur] = idx; draw(); }
    else if (e.key === 'ArrowRight' && session.cur < session.questions.length - 1) { session.cur++; draw(); }
    else if (e.key === 'ArrowLeft' && session.cur > 0) { session.cur--; draw(); }
  };
  document.addEventListener('keydown', onKey);
  const onTick = () => {
    const c = el.querySelector('#qClock');
    if (c && session) c.textContent = fmtClock(Date.now() - session.startedAt);
  };
  window.addEventListener('yib:tick', onTick);

  if (phase === 'loading') phase = 'setup'; // a request was abandoned by navigating away
  draw();
  return () => {
    controller?.abort(); // don't leave a request running for a view that's gone
    document.removeEventListener('keydown', onKey);
    window.removeEventListener('yib:tick', onTick);
  };
}
