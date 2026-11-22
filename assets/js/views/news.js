// Current Affairs: hand-picked daily sources for UPSC news (links only; nothing is generated here).
import { icon } from '../icons.js';
import { esc, fmtDate } from '../utils.js';
import { VISION_IAS, LEVELUP_IAS } from '../data.js';

const DAILY = [
  { title: 'Level Up IAS · Current Affairs', desc: 'Daily UPSC-focused current affairs, organised by topic.', url: LEVELUP_IAS.currentAffairs },
  { title: 'Vision IAS · Daily News Summary', desc: 'The day\'s important news for Prelims and Mains in one place.', url: VISION_IAS.dailySummary },
  { title: 'Indian Express · UPSC Essentials', desc: 'Key terms and concepts in the news, explained for aspirants.', url: 'https://indianexpress.com/section/upsc-current-affairs/' },
];
const PRIMARY = [
  { title: 'Press Information Bureau', desc: 'Official releases on schemes, policies and government decisions.', url: 'https://pib.gov.in' },
  { title: 'The Hindu', desc: 'Daily newspaper; read the national, editorial and op-ed pages.', url: 'https://www.thehindu.com' },
  { title: 'PRS Legislative Research', desc: 'Bills, Acts and Parliament explained.', url: 'https://prsindia.org' },
];

/** Switch between daily news and the monthly magazines (shown on both pages; works on mobile too). */
export function caTabs(active) {
  return `<div class="seg ca-tabs" role="tablist">
    <a role="tab" href="#/news" class="${active === 'news' ? 'on' : ''}">${icon('globe', 15)} Daily news</a>
    <a role="tab" href="#/magazines" class="${active === 'magazines' ? 'on' : ''}">${icon('book', 15)} Magazines</a>
  </div>`;
}

const linkList = (items) => `<div class="list">${items.map((o) => `<a class="li" href="${o.url}" target="_blank" rel="noopener" style="text-decoration:none"><span class="stat-ico" style="width:30px;height:30px">${icon('globe', 15)}</span><div class="li-main"><div class="li-title">${esc(o.title)}</div><div class="li-sub">${esc(o.desc)}</div></div>${icon('external', 14)}</a>`).join('')}</div>`;

export function mount(el, _params, { setSub }) {
  setSub('Today\'s UPSC-relevant news, from trusted sources');
  const today = fmtDate(new Date(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  el.innerHTML = `
    ${caTabs('news')}
    <section class="card vision-card">
      <span class="eyebrow">Daily current affairs · ${esc(today)}</span>
      <h2 class="serif" style="font-size:28px;margin:6px 0 8px">Read today's news for UPSC</h2>
      <p class="hint">Pick one daily source and stick to it. Make short notes and link each story to the static syllabus.</p>
      <div class="row wrap" style="margin-top:14px">
        <a class="btn accent" href="${LEVELUP_IAS.currentAffairs}" target="_blank" rel="noopener">${icon('external', 15)} Level Up IAS current affairs</a>
        <a class="btn" href="${VISION_IAS.dailySummary}" target="_blank" rel="noopener">${icon('external', 15)} Vision IAS daily summary</a>
        <a class="btn ghost" href="#/magazines">${icon('book', 15)} Monthly magazines</a>
      </div>
    </section>
    <div class="grid g-2" style="margin-top:18px;align-items:start">
      <div class="card">
        <div class="card-head"><h3>${icon('star', 17)} Daily for UPSC</h3></div>
        ${linkList(DAILY)}
      </div>
      <div class="card">
        <div class="card-head"><h3>${icon('link', 17)} Primary sources</h3></div>
        ${linkList(PRIMARY)}
      </div>
    </div>`;
}
