// Current Affairs: a daily UPSC digest compiled from Google Search by the site's AI function (cached once per day for everyone).
import { S, commit } from '../store.js';
import { icon } from '../icons.js';
import { esc, uid, dateKey, addDays, fmtDate } from '../utils.js';
import { subjectById } from '../data.js';
import { fetchNews, cachedNews } from '../ai.js';
import { config } from '../config.js';
import { toast } from '../ui.js';

const CATEGORY_SUBJECT = {
  'Polity & Governance': 'polity',
  Economy: 'economy',
  'International Relations': 'ir',
  'Environment & Ecology': 'environment',
  'Science & Technology': 'scitech',
  'Society & Welfare': 'society',
  'Security & Defence': 'security',
  'Geography & Places': 'geography',
  'History & Culture': 'culture',
  'Schemes & Reports': 'current',
};
const LOADING_LINES = ['Searching Google for today\'s news…', 'Reading PIB, courts and Parliament updates…', 'Picking what matters for UPSC…', 'Linking news to the static syllabus…', 'Writing Prelims facts and Mains angles…', 'Explaining key terms…'];
const FALLBACK_LINKS = [
  ['Indian Express · UPSC Essentials', 'https://indianexpress.com/section/upsc-current-affairs/'],
  ['Press Information Bureau', 'https://pib.gov.in'],
  ['The Hindu', 'https://www.thehindu.com'],
  ['PRS Legislative Research', 'https://prsindia.org'],
];

export const istToday = () => new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10);
const longDate = (d) => fmtDate(d, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
const subjectOf = (cat) => subjectById(CATEGORY_SUBJECT[cat] || 'current');

/** Plain-text/markdown version of a digest, used for notes and as quiz material. */
export function digestToMarkdown(day, d, only) {
  const items = only ? [only] : d.items;
  const out = only ? [] : [`# Current affairs · ${longDate(day)}`, '', d.theme ? `> ${d.theme}` : '', ''];
  for (const it of items) {
    out.push(`## ${it.title}`, `*${it.category}${it.gs ? ` · ${it.gs}` : ''}${it.source ? ` · ${it.source}` : ''}*`, '', it.summary, '');
    if (it.upscAngle) out.push(`**UPSC angle:** ${it.upscAngle}`, '');
    if (it.prelimsFacts?.length) out.push('**Prelims facts**', ...it.prelimsFacts.map((f) => `- ${f}`), '');
    if (it.mainsQuestion) out.push(`**Mains question:** ${it.mainsQuestion}`, '');
    if (it.keywords?.length) out.push(`Keywords: ${it.keywords.join(', ')}`, '');
  }
  if (!only && d.essentials?.length) out.push('## UPSC Essentials: terms in the news', ...d.essentials.map((e) => `- **${e.term}**: ${e.explanation}`), '');
  return out.join('\n').trim();
}

let filter = 'All';

export function mount(el, params, { setSub }) {
  const today = istToday();
  let day = /^\d{4}-\d{2}-\d{2}$/.test(params.day || '') ? params.day : today;
  let state = { status: 'loading', days: [] };
  let controller = null;
  let pollTimer = null;
  let lineTimer = null;
  let polls = 0;

  const cached = cachedNews(day);
  if (cached) state = { status: 'ready', ...cached, days: [] };

  async function load({ quiet = false } = {}) {
    clearTimeout(pollTimer);
    if (!config().serverAI) { state = { status: 'offline', days: [] }; return draw(); }
    if (!quiet && state.status !== 'ready') { state = { ...state, status: 'loading' }; draw(); }
    controller?.abort();
    controller = new AbortController();
    try {
      const res = await fetchNews(day === today ? '' : day, { signal: controller.signal });
      if (!el.isConnected) return;
      if (res.status === 'ready') state = { ...res };
      else if (state.status === 'ready' && state.day === day) state = { ...state, days: res.days || state.days };
      else state = { ...res };
      if (res.status === 'generating' && polls++ < 25) pollTimer = setTimeout(() => load({ quiet: true }), 8000);
    } catch (e) {
      if (e.name === 'AbortError' || !el.isConnected) return;
      if (state.status !== 'ready') state = { status: 'error', error: e.message, days: state.days || [] };
    }
    draw();
  }

  function nav() {
    const days = [...new Set([today, ...(state.days || []), day])].sort().reverse();
    const i = days.indexOf(day);
    const older = days[i + 1];
    const newer = days[i - 1];
    return `<div class="row wrap news-nav">
      ${older ? `<a class="btn sm ghost" href="#/news?day=${older}">${icon('left', 14)} Previous day</a>` : ''}
      <select class="select" id="daySel" aria-label="Choose a day">${days.map((d) => `<option value="${d}" ${d === day ? 'selected' : ''}>${d === today ? 'Today' : fmtDate(d, { weekday: 'short', day: 'numeric', month: 'short' })}</option>`).join('')}</select>
      ${newer ? `<a class="btn sm ghost" href="#/news?day=${newer}">Next day ${icon('right', 14)}</a>` : ''}
    </div>`;
  }

  function fallbackLinks() {
    return `<div class="list" style="margin-top:10px">${FALLBACK_LINKS.map(([t, u]) => `<a class="li" href="${u}" target="_blank" rel="noopener" style="text-decoration:none"><span class="stat-ico" style="width:30px;height:30px">${icon('globe', 15)}</span><div class="li-main"><div class="li-title">${esc(t)}</div></div>${icon('external', 14)}</a>`).join('')}</div>`;
  }

  function loadingView(msg) {
    return `<div class="card"><div class="loader"><div class="orbit"></div>
      <div><h3 class="serif" style="font-size:26px">${msg}</h3><p class="muted" id="loadLine">${LOADING_LINES[0]}</p></div>
      <div style="width:min(420px,100%)" class="stack"><div class="skeleton"></div><div class="skeleton" style="width:80%"></div><div class="skeleton" style="width:60%"></div></div>
      <p class="hint">The first reader each day triggers a fresh search. This takes up to a minute; after that it opens instantly for everyone.</p></div></div>`;
  }

  function digestView() {
    const d = state.data || { items: [], essentials: [] };
    const cats = ['All', ...new Set(d.items.map((it) => it.category))];
    if (!cats.includes(filter)) filter = 'All';
    const shown = d.items.map((it, i) => ({ it, i })).filter(({ it }) => filter === 'All' || it.category === filter);
    return `
    <section class="card news-hero">
      <span class="eyebrow">Daily current affairs · ${esc(longDate(state.day))}</span>
      <h2 class="serif">${esc(d.theme || 'Today in UPSC-relevant news')}</h2>
      <p class="hint">${d.items.length} stories · ${d.essentials.length} key terms · compiled with AI from Google Search. Verify important facts with the linked sources.</p>
      <div class="row wrap" style="margin-top:14px">
        <a class="btn accent" href="#/quiz?news=${state.day}">${icon('sparkles', 15)} Quiz me on this</a>
        <button class="btn" data-saveall>${icon('notes', 15)} Save digest to notes</button>
      </div>
      ${nav()}
    </section>

    <div class="row wrap" style="gap:6px;margin:18px 0 14px">${cats.map((c) => `<button class="chip ${filter === c ? 'on' : ''}" data-cat="${esc(c)}">${c === 'All' ? 'All' : `<span class="dot" style="background:${subjectOf(c).color}"></span>${esc(c)}`}${c === 'All' ? ` · ${d.items.length}` : ''}</button>`).join('')}</div>

    <div class="grid g-3" style="align-items:start">
      <div class="span-2 stack news-list">
        ${shown.map(({ it, i }) => `
        <article class="card news-item">
          <div class="row wrap" style="gap:6px"><span class="tag"><span class="dot" style="background:${subjectOf(it.category).color}"></span>${esc(it.category)}</span>${it.gs ? `<span class="tag">${esc(it.gs)}</span>` : ''}</div>
          <h3>${esc(it.title)}</h3>
          <p>${esc(it.summary)}</p>
          ${it.upscAngle ? `<div class="news-angle"><b>UPSC angle</b> ${esc(it.upscAngle)}</div>` : ''}
          ${it.prelimsFacts.length || it.mainsQuestion ? `<details><summary>Prelims facts & Mains question</summary>
            ${it.prelimsFacts.length ? `<ul>${it.prelimsFacts.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>` : ''}
            ${it.mainsQuestion ? `<p><b>Mains:</b> ${esc(it.mainsQuestion)}</p>` : ''}</details>` : ''}
          <div class="row between wrap" style="gap:8px">
            <div class="row wrap" style="gap:5px">${it.keywords.map((k) => `<span class="kw">${esc(k)}</span>`).join('')}</div>
            <div class="row" style="gap:8px">${it.source ? `<span class="hint">${esc(it.source)}</span>` : ''}<button class="btn sm ghost" data-save="${i}">${icon('notes', 14)} Save</button></div>
          </div>
        </article>`).join('')}
      </div>
      <div class="stack">
        ${d.essentials.length ? `<div class="card">
          <div class="card-head"><h3>${icon('bulb', 17)} UPSC Essentials</h3></div>
          <p class="hint" style="margin-bottom:10px">Key terms in today's news</p>
          <div class="stack" style="gap:12px">${d.essentials.map((e) => `<div class="essential"><b>${esc(e.term)}</b><p>${esc(e.explanation)}</p></div>`).join('')}</div>
        </div>` : ''}
        <div class="card">
          <div class="card-head"><h3>${icon('link', 17)} Sources</h3></div>
          ${state.sources?.length ? `<div class="list">${state.sources.slice(0, 15).map((s) => `<a class="li" href="${esc(s.uri)}" target="_blank" rel="noopener" style="text-decoration:none"><div class="li-main"><div class="li-title">${esc(s.title || 'Source')}</div></div>${icon('external', 14)}</a>`).join('')}</div>` : '<p class="hint">Source links are shown when available.</p>'}
          ${state.searchHtml ? `<iframe class="search-suggest" title="Related Google searches" sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe>` : ''}
        </div>
        <div class="card">
          <div class="card-head"><h3>${icon('globe', 17)} Read more</h3></div>
          ${fallbackLinks()}
        </div>
      </div>
    </div>`;
  }

  function draw() {
    clearInterval(lineTimer);
    setSub(day === today ? 'Today\'s UPSC-relevant news, explained' : longDate(day));
    let html;
    if (state.status === 'ready' && state.data) html = digestView();
    else if (state.status === 'loading') html = loadingView('Compiling today\'s current affairs');
    else if (state.status === 'generating') html = loadingView('Another reader is compiling today\'s digest');
    else {
      const msg = state.status === 'offline'
        ? 'Current affairs need the site\'s AI server, which isn\'t connected yet.'
        : state.status === 'missing' ? `There's no digest saved for ${longDate(day)}.`
        : esc(state.error || 'Could not load current affairs.');
      html = `<div class="card">
        <div class="notice">${icon('alert', 18)}<div style="flex:1">${msg}</div></div>
        <div class="row wrap" style="margin-top:14px">${state.status !== 'offline' ? `<button class="btn" data-retry>${icon('revise', 15)} Try again</button>` : ''}${day !== today ? `<a class="btn ghost" href="#/news">Go to today</a>` : ''}</div>
        ${(state.days || []).length ? nav() : ''}
        <p class="hint" style="margin-top:16px">Meanwhile, read today's news from these sources:</p>${fallbackLinks()}</div>`;
    }
    el.innerHTML = html;

    const frame = el.querySelector('.search-suggest');
    if (frame) {
      frame.addEventListener('load', () => {
        try { frame.style.height = `${frame.contentDocument.documentElement.scrollHeight + 4}px`; } catch {}
      });
      frame.srcdoc = `<!doctype html><html><head><base target="_blank"><style>body{margin:0}</style></head><body>${state.searchHtml}</body></html>`;
    }
    if (el.querySelector('#loadLine')) {
      let i = 0;
      lineTimer = setInterval(() => {
        const line = el.querySelector('#loadLine');
        if (line) line.textContent = LOADING_LINES[++i % LOADING_LINES.length];
      }, 3000);
    }
  }

  function saveNote(title, body, subject) {
    const now = Date.now();
    S().notes.push({ id: uid(), title, subject, tags: ['current-affairs', state.day], pinned: false, body, createdAt: now, updatedAt: now, openedAt: now, revisions: 0, nextRevision: dateKey(addDays(new Date(), 1)) });
    commit();
  }

  el.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    const d = b.dataset;
    if (d.cat) { filter = d.cat; draw(); }
    else if ('retry' in d) { polls = 0; load(); }
    else if (d.save !== undefined) {
      const it = state.data.items[Number(d.save)];
      saveNote(it.title, digestToMarkdown(state.day, state.data, it), CATEGORY_SUBJECT[it.category] || 'current');
      b.disabled = true;
      b.innerHTML = `${icon('check', 14)} Saved`;
      toast('Saved to Notes', 'good', 'Added to your revision schedule.');
    } else if ('saveall' in d) {
      saveNote(`Current affairs · ${fmtDate(state.day, { day: 'numeric', month: 'short', year: 'numeric' })}`, digestToMarkdown(state.day, state.data), 'current');
      toast('Digest saved to Notes', 'good');
    }
  });
  el.addEventListener('change', (e) => {
    if (e.target.id === 'daySel') location.hash = e.target.value === today ? '#/news' : `#/news?day=${e.target.value}`;
  });

  draw();
  load({ quiet: Boolean(cached) });
  return () => {
    controller?.abort();
    clearTimeout(pollTimer);
    clearInterval(lineTimer);
  };
}
