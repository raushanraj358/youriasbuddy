// Study Material: the UPSC CSE syllabus subject → topic, with progress tracking and AI-written study notes per topic.
import { S, commit } from '../store.js';
import { icon } from '../icons.js';
import { esc, uid, dateKey, addDays, timeAgo } from '../utils.js';
import { SUBJECTS, SYLLABUS, LIBRARY, subjectById } from '../data.js';
import { runAI, hasAI, friendlyError, AIError } from '../ai.js';
import { toast, confirmDialog } from '../ui.js';
import { md } from '../md.js';

const STATUSES = [
  { id: '', label: 'Not started', color: 'var(--muted)' },
  { id: 'reading', label: 'Reading', color: 'var(--info)' },
  { id: 'done', label: 'Done', color: 'var(--good)' },
  { id: 'revised', label: 'Revised', color: 'var(--accent)' },
];
const statusOf = (id) => STATUSES.find((s) => s.id === (id || '')) || STATUSES[0];
const isDone = (st) => st === 'done' || st === 'revised';
const keyOf = (sub, topic) => `${sub}::${topic}`;
const syl = () => S().syllabus;
const topicsOf = (sub) => [...(SYLLABUS[sub] || []), ...((syl().custom || {})[sub] || [])];
const href = (sub, topic) => `#/syllabus?subject=${encodeURIComponent(sub)}${topic ? `&topic=${encodeURIComponent(topic)}` : ''}`;
const LOADING_LINES = ['Reading the syllabus…', 'Pulling facts from standard sources…', 'Linking static and current…', 'Adding Prelims pointers…', 'Framing Mains angles…', 'Writing a quick-revision box…'];

// Module-level so a generation keeps going (and is saved) if the user navigates away.
let paperFilter = 'All';
let generating = null; // { key, controller }
let lastError = null; // { key, message, code }

function stats(sub) {
  const topics = topicsOf(sub);
  const st = syl().status;
  const done = topics.filter((t) => isDone(st[keyOf(sub, t)])).length;
  const notes = topics.filter((t) => syl().material[keyOf(sub, t)]).length;
  return { total: topics.length, done, notes };
}

function str(v, max = 2000) {
  return String(v ?? '').trim().slice(0, max);
}
function list(v, max = 20) {
  return (Array.isArray(v) ? v : []).map((x) => str(typeof x === 'object' ? Object.values(x).join(': ') : x, 1200)).filter(Boolean).slice(0, max);
}
function clean(raw) {
  const d = raw && typeof raw === 'object' ? raw : {};
  return {
    title: str(d.title, 200),
    overview: str(d.overview, 1500),
    sections: (Array.isArray(d.sections) ? d.sections : [])
      .map((s) => ({ heading: str(s?.heading, 200), points: list(s?.points, 14) }))
      .filter((s) => s.heading || s.points.length)
      .slice(0, 10),
    keyTerms: (Array.isArray(d.keyTerms) ? d.keyTerms : []).map((t) => ({ term: str(t?.term, 120), meaning: str(t?.meaning, 600) })).filter((t) => t.term).slice(0, 15),
    prelimsFacts: list(d.prelimsFacts),
    mainsAngles: list(d.mainsAngles),
    pyqThemes: list(d.pyqThemes),
    currentLinks: list(d.currentLinks),
    mnemonic: str(d.mnemonic, 600),
    quickRevision: list(d.quickRevision),
    furtherReading: list(d.furtherReading, 10),
  };
}

function toMarkdown(d) {
  const out = [];
  const block = (title, items) => {
    if (!items.length) return;
    out.push(`## ${title}`, ...items.map((x) => `- ${x}`), '');
  };
  if (d.overview) out.push(d.overview, '');
  for (const s of d.sections) out.push(`## ${s.heading || 'Notes'}`, ...s.points.map((p) => `- ${p}`), '');
  block('Key terms', d.keyTerms.map((t) => `**${t.term}**: ${t.meaning}`));
  block('Prelims pointers', d.prelimsFacts);
  block('Mains angles', d.mainsAngles);
  block('Asked before (PYQ themes)', d.pyqThemes);
  block('Current affairs links', d.currentLinks);
  if (d.mnemonic) out.push('## Memory hook', `> ${d.mnemonic}`, '');
  block('Quick revision', d.quickRevision);
  block('Further reading', d.furtherReading);
  return out.join('\n').trim();
}

function sourcesFor(sub) {
  const items = LIBRARY.filter((r) => r.subject === sub || (r.subject === 'general' && ['ncert', 'upsc-pyq'].includes(r.id)));
  return `<div class="list">${items
    .map((r) => {
      const ico = r.type === 'book' ? 'book' : r.type === 'pdf' ? 'file' : 'globe';
      const body = `<span class="stat-ico" style="width:30px;height:30px">${icon(ico, 15)}</span><div class="li-main"><div class="li-title">${esc(r.title)}</div><div class="li-sub">${esc(r.desc)}</div></div>`;
      return r.url
        ? `<a class="li" href="${esc(r.url)}" target="_blank" rel="noopener" style="text-decoration:none">${body}${icon('external', 14)}</a>`
        : `<div class="li">${body}</div>`;
    })
    .join('')}</div>
    <a class="hint" href="#/resources" style="display:inline-block;margin-top:10px">Track your reading in the Library →</a>`;
}

async function generate(sub, topic, language) {
  const key = keyOf(sub, topic);
  if (generating) return toast('Already writing notes for another topic. Please wait.', 'info');
  const controller = new AbortController();
  generating = { key, controller };
  lastError = null;
  window.dispatchEvent(new Event('yib:syllabus'));
  try {
    const s = subjectById(sub);
    const raw = await runAI('material', { subject: s.name, paper: s.paper, topic, language }, { signal: controller.signal });
    const data = clean(raw);
    if (!data.overview && !data.sections.length) throw new AIError('The AI returned empty notes. Please try again.', 'EMPTY');
    syl().material[key] = { data, at: Date.now(), lang: language };
    if (!syl().status[key]) syl().status[key] = 'reading';
    commit();
    if (!location.hash.includes(encodeURIComponent(topic))) toast('Study notes ready', 'good', topic);
  } catch (e) {
    if (e.name !== 'AbortError') {
      lastError = { key, message: friendlyError(e), code: e.code };
      if (!location.hash.includes(encodeURIComponent(topic))) toast(lastError.message, 'bad');
    }
  } finally {
    generating = null;
    window.dispatchEvent(new Event('yib:syllabus'));
  }
}

export function mount(el, params, { setSub }) {
  const sub = SUBJECTS.some((s) => s.id === params.subject) ? params.subject : null;
  const topic = sub && params.topic && topicsOf(sub).includes(params.topic) ? params.topic : null;
  let lang = S().settings.materialLang || 'en';
  let loadTimer = null;

  /* ---------------- All subjects ---------------- */
  function overview() {
    const all = SUBJECTS.map((s) => ({ s, ...stats(s.id) })).filter((x) => x.total || x.s.id === 'optional');
    const total = all.reduce((a, x) => a + x.total, 0);
    const done = all.reduce((a, x) => a + x.done, 0);
    const st = Object.values(syl().status);
    const reading = st.filter((v) => v === 'reading').length;
    const revised = st.filter((v) => v === 'revised').length;
    const notes = Object.keys(syl().material).length;
    const papers = ['All', ...new Set(SUBJECTS.map((s) => s.paper))];
    const shown = all.filter((x) => paperFilter === 'All' || x.s.paper === paperFilter);
    return `
    <div class="card syl-hero">
      <div style="flex:1 1 260px">
        <span class="eyebrow">UPSC CSE syllabus</span>
        <h2 class="serif" style="font-size:30px;margin:4px 0">${done} of ${total} topics covered</h2>
        <p class="hint">Open a subject, pick a topic, read its study notes, then test yourself with a quiz.</p>
      </div>
      <div style="flex:1 1 240px">
        <div class="progress good" style="height:10px"><i style="width:${total ? (done / total) * 100 : 0}%"></i></div>
        <p class="hint" style="margin-top:8px">${reading} reading · ${revised} revised · ${notes} study note${notes === 1 ? '' : 's'} ready</p>
      </div>
    </div>
    <div class="row wrap" style="gap:6px;margin:18px 0 14px">${papers.map((p) => `<button class="chip ${paperFilter === p ? 'on' : ''}" data-paper="${esc(p)}">${esc(p)}</button>`).join('')}</div>
    <div class="syl-grid">
      ${shown.map(({ s, total: t, done: d, notes: n }) => `
        <a class="syl-card" href="${href(s.id)}">
          <div class="row between"><span class="tag"><span class="dot" style="background:${s.color}"></span>${esc(s.paper)}</span><span class="hint">${d}/${t}</span></div>
          <h4>${esc(s.name)}</h4>
          <div class="progress"><i style="width:${t ? (d / t) * 100 : 0}%;background:${s.color}"></i></div>
          <span class="hint">${t ? `${n} of ${t} topics have notes` : 'Add your own topics'}</span>
        </a>`).join('')}
    </div>`;
  }

  /* ---------------- One subject ---------------- */
  function subjectView() {
    const s = subjectById(sub);
    const topics = topicsOf(sub);
    const custom = new Set((syl().custom || {})[sub] || []);
    const { total, done } = stats(sub);
    return `
    <a class="btn sm ghost" href="#/syllabus">${icon('left', 14)} All subjects</a>
    <div class="grid g-3" style="margin-top:12px;align-items:start">
      <div class="card span-2">
        <div class="card-head"><h3><span class="dot" style="background:${s.color};width:10px;height:10px"></span> ${esc(s.name)}</h3><span class="tag">${esc(s.paper)}</span></div>
        <div class="progress" style="margin-bottom:6px"><i style="width:${total ? (done / total) * 100 : 0}%;background:${s.color}"></i></div>
        <p class="hint" style="margin-bottom:10px">${done} of ${total} topics done. Tap a status to change it.</p>
        <div class="list">
          ${topics.map((t, i) => {
            const k = keyOf(sub, t);
            const stt = statusOf(syl().status[k]);
            const mat = syl().material[k];
            return `<div class="li syl-topic">
              <button class="status-pill" data-cycle="${i}" style="--c:${stt.color}" title="Change status">${stt.label}</button>
              <a class="li-main" href="${href(sub, t)}" style="text-decoration:none;color:inherit"><div class="li-title">${esc(t)}</div>
                <div class="li-sub">${generating?.key === k ? 'Writing notes…' : mat ? `${icon('check', 12)} Study notes ready` : 'Open to read study notes'}</div></a>
              ${custom.has(t) ? `<button class="icon-btn sm bare" data-remove="${i}" aria-label="Remove topic">${icon('trash', 14)}</button>` : ''}
              <a class="icon-btn sm bare" href="${href(sub, t)}" aria-label="Open">${icon('right', 16)}</a>
            </div>`;
          }).join('') || '<p class="hint" style="padding:10px 0">No topics yet. Add the topics of your optional subject below.</p>'}
        </div>
        <form id="addTopic" class="row" style="margin-top:14px">
          <input class="input" name="t" maxlength="140" placeholder="Add your own topic…" autocomplete="off" aria-label="New topic">
          <button class="btn">${icon('plus', 15)} Add</button>
        </form>
      </div>
      <div class="card">
        <div class="card-head"><h3>${icon('library', 17)} Read from</h3></div>
        ${sourcesFor(sub)}
      </div>
    </div>`;
  }

  /* ---------------- One topic ---------------- */
  function topicView() {
    const s = subjectById(sub);
    const k = keyOf(sub, topic);
    const topics = topicsOf(sub);
    const idx = topics.indexOf(topic);
    const prev = topics[idx - 1];
    const next = topics[idx + 1];
    const mat = syl().material[k];
    const busy = generating?.key === k;
    const err = lastError?.key === k ? lastError : null;
    const cur = syl().status[k] || '';
    const langSeg = `<div class="seg"><button class="${lang === 'en' ? 'on' : ''}" data-lang="en">English</button><button class="${lang === 'hi' ? 'on' : ''}" data-lang="hi">हिन्दी</button></div>`;

    let body;
    if (busy) {
      body = `<div class="loader"><div class="orbit"></div>
        <div><h3 class="serif" style="font-size:26px">Writing your study notes</h3><p class="muted" id="loadLine">${LOADING_LINES[0]}</p></div>
        <div style="width:min(420px,100%)" class="stack"><div class="skeleton"></div><div class="skeleton" style="width:80%"></div><div class="skeleton" style="width:60%"></div></div>
        <p class="hint">This takes 15–40 seconds. You can keep using the app; we'll save the notes here.</p>
        <button class="btn ghost" data-cancel>Cancel</button></div>`;
    } else if (mat) {
      body = `<div class="notice info" style="margin-bottom:16px">${icon('info', 18)}<div class="hint">AI-written notes, ${timeAgo(mat.at)}${mat.lang === 'hi' ? ' · हिन्दी' : ''}. Cross-check anything surprising against standard sources.</div></div>
        <article class="md">${md(toMarkdown(mat.data))}</article>
        <hr class="divider">
        <div class="row wrap">
          ${mat.noteId && S().notes.some((n) => n.id === mat.noteId) ? `<a class="btn" href="#/notes?id=${esc(mat.noteId)}">${icon('notes', 15)} Open in my notes</a>` : `<button class="btn" data-savenote>${icon('notes', 15)} Save to my notes</button>`}
          <span class="spacer"></span>${langSeg}
          <button class="btn ghost" data-generate>${icon('revise', 15)} Rewrite</button>
        </div>`;
    } else {
      body = `<div class="empty" style="padding:28px 8px">
        <div class="em-icon">${icon('book', 24)}</div>
        <h4>Study notes for this topic</h4>
        <p>Concise, exam-oriented notes: key concepts, Articles & Acts, Prelims pointers, Mains angles, PYQ themes and a quick-revision box.</p>
        ${err ? `<div class="notice" style="margin:14px auto 0;max-width:520px;text-align:left">${icon('alert', 18)}<div>${esc(err.message)}${['NO_KEY', 'AUTH', 'MODEL'].includes(err.code) ? ` <a href="#/settings" style="font-weight:700">Open Settings →</a>` : ''}</div></div>` : ''}
        ${hasAI()
          ? `<div class="row wrap" style="justify-content:center;margin-top:16px">${langSeg}<button class="btn accent" data-generate>${icon('sparkles', 16)} Generate study notes</button></div>`
          : `<div class="notice info" style="margin:14px auto 0;max-width:520px;text-align:left">${icon('key', 18)}<div>To generate notes, add a free Google Gemini key in <a href="#/settings" style="font-weight:700">Settings</a>. Meanwhile, use the sources on the right.</div></div>`}
      </div>`;
    }

    return `
    <div class="row wrap" style="gap:8px"><a class="btn sm ghost" href="${href(sub)}">${icon('left', 14)} ${esc(s.name)}</a></div>
    <div class="grid g-3" style="margin-top:12px;align-items:start">
      <div class="card span-2">
        <div class="syl-topic-head">
          <span class="tag"><span class="dot" style="background:${s.color}"></span>${esc(s.paper)} · ${esc(s.short)}</span>
          <h2 class="serif">${esc(topic)}</h2>
          <div class="seg" role="group" aria-label="Topic status">${STATUSES.map((x) => `<button class="${cur === x.id ? 'on' : ''}" data-status="${x.id}">${x.label}</button>`).join('')}</div>
        </div>
        ${body}
      </div>
      <div class="stack">
        <div class="card">
          <div class="card-head"><h3>${icon('target', 17)} Practise</h3></div>
          <div class="stack" style="gap:8px">
            <a class="btn block" href="#/quiz?subject=${encodeURIComponent(sub === 'csat' ? 'csat' : sub)}&topic=${encodeURIComponent(topic)}">${icon('sparkles', 15)} Quiz me on this topic</a>
            <a class="btn block" href="#/study?subject=${encodeURIComponent(sub)}&start=1">${icon('timer', 15)} Start a focus session</a>
          </div>
        </div>
        <div class="card">
          <div class="card-head"><h3>${icon('library', 17)} Read from</h3></div>
          ${sourcesFor(sub)}
        </div>
        <div class="row between">
          ${prev ? `<a class="btn sm ghost" href="${href(sub, prev)}" title="${esc(prev)}">${icon('left', 14)} Previous</a>` : '<span></span>'}
          ${next ? `<a class="btn sm ghost" href="${href(sub, next)}" title="${esc(next)}">Next ${icon('right', 14)}</a>` : ''}
        </div>
      </div>
    </div>`;
  }

  function draw() {
    clearInterval(loadTimer);
    if (topic) {
      setSub(`${subjectById(sub).name} · ${subjectById(sub).paper}`);
      el.innerHTML = topicView();
      if (generating?.key === keyOf(sub, topic)) {
        let i = 0;
        loadTimer = setInterval(() => {
          const line = el.querySelector('#loadLine');
          if (line) line.textContent = LOADING_LINES[++i % LOADING_LINES.length];
        }, 2600);
      }
    } else if (sub) {
      setSub(`${subjectById(sub).paper} · topic-wise study material and progress`);
      el.innerHTML = subjectView();
    } else el.innerHTML = overview();
  }

  el.addEventListener('click', async (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    const d = b.dataset;
    if (d.paper) { paperFilter = d.paper; draw(); }
    else if (d.cycle !== undefined) {
      const t = topicsOf(sub)[Number(d.cycle)];
      const k = keyOf(sub, t);
      const i = STATUSES.findIndex((x) => x.id === (syl().status[k] || ''));
      const nextSt = STATUSES[(i + 1) % STATUSES.length].id;
      if (nextSt) syl().status[k] = nextSt; else delete syl().status[k];
      commit();
      draw();
    } else if (d.remove !== undefined) {
      const t = topicsOf(sub)[Number(d.remove)];
      if (!(await confirmDialog(`Remove "${t}" and its notes from this subject?`, 'Remove'))) return;
      syl().custom[sub] = (syl().custom[sub] || []).filter((x) => x !== t);
      delete syl().status[keyOf(sub, t)];
      delete syl().material[keyOf(sub, t)];
      commit();
      draw();
    } else if (d.status !== undefined) {
      const k = keyOf(sub, topic);
      if (d.status) syl().status[k] = d.status; else delete syl().status[k];
      commit();
      draw();
    } else if (d.lang) {
      lang = d.lang;
      S().settings.materialLang = lang;
      commit();
      draw();
    } else if ('generate' in d) {
      if (syl().material[keyOf(sub, topic)] && !(await confirmDialog('Rewrite these notes? The current version will be replaced.', 'Rewrite'))) return;
      generate(sub, topic, lang);
    } else if ('cancel' in d) {
      generating?.controller.abort();
    } else if ('savenote' in d) {
      const k = keyOf(sub, topic);
      const mat = syl().material[k];
      if (!mat) return;
      const now = Date.now();
      const note = {
        id: uid(), title: topic, subject: sub, tags: ['study-material'], pinned: false,
        body: toMarkdown(mat.data), createdAt: now, updatedAt: now, openedAt: now,
        revisions: 0, nextRevision: dateKey(addDays(new Date(), 1)),
      };
      S().notes.push(note);
      mat.noteId = note.id;
      commit();
      toast('Saved to Notes', 'good', 'Added to your revision schedule.');
      draw();
    }
  });

  el.addEventListener('submit', (e) => {
    if (e.target.id !== 'addTopic') return;
    e.preventDefault();
    const v = e.target.t.value.trim().replace(/\s+/g, ' ');
    if (!v) return;
    if (topicsOf(sub).includes(v)) return toast('That topic is already in the list', 'info');
    syl().custom[sub] = [...(syl().custom[sub] || []), v];
    commit();
    draw();
    el.querySelector('#addTopic input')?.focus();
  });

  const onChange = () => el.isConnected && draw();
  window.addEventListener('yib:syllabus', onChange);
  draw();
  return () => {
    clearInterval(loadTimer);
    window.removeEventListener('yib:syllabus', onChange);
  };
}
