// Magazines: month-by-month links to the Vision IAS Monthly Current Affairs Magazine (with read tracking) and other standard magazines.
import { S, commit } from '../store.js';
import { icon } from '../icons.js';
import { esc } from '../utils.js';
import { VISION_IAS } from '../data.js';
import { caTabs } from './news.js';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const FIRST_YEAR = 2017; // the Vision IAS archive goes back to 2017
const OTHERS = [
  { title: 'Yojana & Kurukshetra', desc: 'Government of India monthlies (Publications Division) on development and rural themes. Great for Mains and Essay.', url: 'https://www.publicationsdivision.nic.in' },
  { title: 'Down To Earth', desc: 'Fortnightly on environment, science and development.', url: 'https://www.downtoearth.org.in' },
];

let year = null; // module-level so the chosen year survives navigation

export function mount(el, _params, { setSub }) {
  const now = new Date();
  const curY = now.getFullYear();
  const curM = now.getMonth() + 1;
  if (!year) year = curM === 1 ? curY - 1 : curY;
  const read = () => S().magazines.read;
  const keyOf = (y, m) => `vision:${y}-${String(m).padStart(2, '0')}`;

  function months(y) {
    const last = y === curY ? curM - 1 : 12; // an issue covers a finished month
    return Array.from({ length: Math.max(0, last) }, (_, i) => last - i); // newest first
  }

  function draw() {
    setSub('Monthly current affairs magazines, month by month');
    const list = months(year);
    const done = list.filter((m) => read()[keyOf(year, m)]).length;
    const years = [];
    for (let y = curY; y >= Math.max(FIRST_YEAR, curY - 4); y--) if (months(y).length) years.push(y);

    el.innerHTML = `
    ${caTabs('magazines')}
    <section class="card mag-hero">
      <div style="flex:1 1 300px">
        <span class="eyebrow">Vision IAS</span>
        <h2 class="serif">Monthly Current Affairs Magazine</h2>
        <p class="hint">The month's news organised by GS paper, a standard read for Prelims and Mains. Opens on visionias.in; downloading the PDF may ask you to log in to Vision IAS.</p>
        <div class="row wrap" style="margin-top:14px">
          <a class="btn accent" href="${VISION_IAS.magazineArchive}" target="_blank" rel="noopener">${icon('external', 15)} Open magazine archive</a>
          <a class="btn" href="#/news">${icon('globe', 15)} Today's current affairs</a>
        </div>
      </div>
      <div class="mag-progress">
        <div class="v">${done}<small>/ ${list.length}</small></div>
        <span class="hint">issues read in ${year}</span>
        <div class="progress good" style="margin-top:8px"><i style="width:${list.length ? (done / list.length) * 100 : 0}%"></i></div>
      </div>
    </section>

    <div class="row wrap" style="gap:6px;margin:18px 0 14px">${years.map((y) => `<button class="chip ${y === year ? 'on' : ''}" data-year="${y}">${y}</button>`).join('')}
      <a class="chip" href="${VISION_IAS.magazineArchive}" target="_blank" rel="noopener">Older ${icon('external', 12)}</a></div>

    <div class="mag-grid">
      ${list.map((m) => {
        const k = keyOf(year, m);
        const isRead = Boolean(read()[k]);
        const fresh = year === curY && m >= curM - 2; // recent issues are usually published a few weeks after month-end
        return `<div class="mag-card ${isRead ? 'read' : ''}">
          <div class="row between"><span class="eyebrow">${year}</span>${isRead ? `<span class="tag" style="color:var(--good)">${icon('check', 12)} Read</span>` : fresh ? '<span class="tag">New</span>' : ''}</div>
          <h4>${MONTHS[m - 1]}</h4>
          <p class="hint">Vision IAS Monthly Current Affairs</p>
          ${fresh && !isRead ? '<p class="hint" style="font-size:12px">If it isn\'t listed yet, it\'s usually published a few weeks after the month ends.</p>' : ''}
          <div class="row wrap" style="gap:6px;margin-top:auto">
            <a class="btn sm" href="${VISION_IAS.magazineMonth(year, m)}" target="_blank" rel="noopener">${icon('external', 13)} Open</a>
            <button class="btn sm ghost" data-read="${k}">${isRead ? 'Mark unread' : `${icon('check', 13)} Mark read`}</button>
          </div>
        </div>`;
      }).join('') || '<p class="hint">No issues for this year yet.</p>'}
    </div>

    <div class="card" style="margin-top:18px">
      <div class="card-head"><h3>${icon('library', 17)} Other magazines</h3></div>
      <div class="list">${OTHERS.map((o) => `<a class="li" href="${o.url}" target="_blank" rel="noopener" style="text-decoration:none"><span class="stat-ico" style="width:30px;height:30px">${icon('book', 15)}</span><div class="li-main"><div class="li-title">${esc(o.title)}</div><div class="li-sub">${esc(o.desc)}</div></div>${icon('external', 14)}</a>`).join('')}</div>
    </div>`;
  }

  el.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.year) { year = Number(b.dataset.year); draw(); }
    else if (b.dataset.read) {
      const k = b.dataset.read;
      if (read()[k]) delete read()[k]; else read()[k] = true;
      commit();
      draw();
    }
  });

  draw();
}
