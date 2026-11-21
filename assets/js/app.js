import { S, commit, subscribe, daysToExam, journeyProgress, notesDue } from './store.js';
import { icon } from './icons.js';
import { $, esc, fmtClock, fmtDate, dateKey } from './utils.js';
import { openModal, toast } from './ui.js';
import * as timer from './timer.js';
import { checkReminders } from './reminders-engine.js';
import { subjectById } from './data.js';

import * as dashboard from './views/dashboard.js';
import * as tracker from './views/tracker.js';
import * as study from './views/study.js';
import * as quiz from './views/quiz.js';
import * as notes from './views/notes.js';
import * as resources from './views/resources.js';
import * as reminders from './views/reminders.js';
import * as settings from './views/settings.js';
import * as profile from './views/profile.js';
import * as syllabus from './views/syllabus.js';
import { initCloud, cloud, onCloudChange } from './cloud.js';

const ROUTES = {
  dashboard: { title: 'Dashboard', icon: 'home', view: dashboard, group: 'Plan', tab: 'Home' },
  tracker: { title: 'Daily Tracker', icon: 'tracker', view: tracker, group: 'Plan', tab: 'Tracker', sub: 'Plan the day, build habits, review consistency' },
  study: { title: 'Study Hours', icon: 'timer', view: study, group: 'Plan', tab: 'Timer', sub: 'Focus timer, logs and analytics' },
  reminders: { title: 'Reminders', icon: 'bell', view: reminders, group: 'Plan', sub: 'Never miss your routine' },
  syllabus: { title: 'Study Material', icon: 'book', view: syllabus, group: 'Learn', tab: 'Study', sub: 'The UPSC CSE syllabus, topic by topic, with study notes' },
  quiz: { title: 'AI Quiz', icon: 'sparkles', view: quiz, group: 'Learn', tab: 'Quiz', sub: 'UPSC Prelims & Mains practice, generated on any topic' },
  notes: { title: 'Notes', icon: 'notes', view: notes, group: 'Learn', tab: 'Notes', sub: 'Your notebook with spaced revision' },
  resources: { title: 'Resources', icon: 'library', view: resources, group: 'Learn', sub: 'Curated sources and your own reading list' },
  profile: { title: 'Profile', icon: 'user', view: profile, group: 'You', sub: 'Your account, goal and journey so far' },
  settings: { title: 'Settings', icon: 'settings', view: settings, group: 'You', sub: 'AI, appearance and data' },
};

/* ---------- Navigation ---------- */
function renderNav() {
  const due = notesDue().length;
  let html = '';
  let group = '';
  for (const [k, r] of Object.entries(ROUTES)) {
    if (r.group !== group) {
      group = r.group;
      html += `<div class="nav-label">${group}</div>`;
    }
    const badge = k === 'notes' && due ? `<span class="badge" title="Notes due for revision">${due}</span>` : '';
    html += `<a href="#/${k}" data-route="${k}">${icon(r.icon, 19)}<span>${r.title}</span>${badge}</a>`;
  }
  $('#nav').innerHTML = html;
  $('#tabbar').innerHTML = Object.entries(ROUTES)
    .filter(([, r]) => r.tab)
    .map(([k, r]) => `<a href="#/${k}" data-route="${k}">${icon(r.icon, 20)}<span>${r.tab}</span></a>`)
    .join('');
  $('#settingsBtn').innerHTML = icon('settings', 18);
  $('#remBtn').innerHTML = icon('bell', 18);
  markActive();
}
function markActive() {
  const cur = parseHash().route;
  document.querySelectorAll('[data-route]').forEach((a) => a.classList.toggle('active', a.dataset.route === cur));
}

function renderCountdown() {
  const d = daysToExam();
  const p = journeyProgress();
  $('#countdownCard').innerHTML = `
    <div class="lbl">Days to Prelims</div>
    <div class="big">${d}</div>
    <div class="sub">${fmtDate(S().profile.examDate, { day: 'numeric', month: 'long', year: 'numeric' })}</div>
    <div class="bar"><i style="width:${(p * 100).toFixed(1)}%"></i></div>`;
}

function renderAccountBtn() {
  const btn = $('#accountBtn');
  const c = cloud();
  const u = c.user;
  btn.dataset.sync = u ? c.status : '';
  const name = S().profile.name || u?.user_metadata?.full_name || u?.email || '';
  if (u?.user_metadata?.avatar_url) btn.innerHTML = `<img src="${esc(u.user_metadata.avatar_url)}" alt="" referrerpolicy="no-referrer">`;
  else if (u) btn.innerHTML = `<span class="avatar">${esc((name[0] || '?').toUpperCase())}</span>`;
  else btn.innerHTML = icon('user', 18);
  btn.title = u ? `Profile · ${u.email || 'signed in'}` : 'Profile · sign in to save your progress';
}

function renderThemeBtn() {
  const dark = document.documentElement.dataset.theme === 'dark' || (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
  $('#themeBtn').innerHTML = icon(dark ? 'sun' : 'moon', 18);
}
export function applyTheme() {
  const t = S().settings.theme;
  if (t === 'system') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = t;
  renderThemeBtn();
}
$('#themeBtn').addEventListener('click', () => {
  const isDark = document.documentElement.dataset.theme === 'dark' || (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
  S().settings.theme = isDark ? 'light' : 'dark';
  commit();
  applyTheme();
});

/* ---------- Timer chip ---------- */
function renderTimerChip() {
  const t = S().timer;
  const chip = $('#timerChip');
  if (!t) {
    chip.hidden = true;
    return;
  }
  chip.hidden = false;
  chip.classList.toggle('paused', !t.running);
  const ms = t.mode === 'pomodoro' ? timer.phaseLength(t) - timer.elapsed(t) : timer.elapsed(t);
  const label = t.phase === 'break' ? 'Break' : subjectById(t.subject).short;
  chip.innerHTML = `<span class="pulse"></span>${fmtClock(ms)}<span style="opacity:.6;font-family:var(--font);font-size:12px">${esc(label)}</span>`;
}

/* ---------- Router ---------- */
let unmount = null;
function parseHash() {
  const h = location.hash.replace(/^#\/?/, '');
  const [path, q = ''] = h.split('?');
  const route = ROUTES[path] ? path : 'dashboard';
  return { route, params: Object.fromEntries(new URLSearchParams(q)) };
}
function navigate() {
  const { route, params } = parseHash();
  const r = ROUTES[route];
  if (typeof unmount === 'function') unmount();
  unmount = null;
  const viewEl = $('#view');
  const fresh = viewEl.cloneNode(false); // drop old listeners
  viewEl.replaceWith(fresh);
  document.title = `${r.title} · YourIASBuddy`;
  $('#pageTitle').textContent = r.title;
  $('#pageSub').textContent = r.sub || '';
  markActive();
  unmount = r.view.mount(fresh, params, { setSub: (t) => ($('#pageSub').textContent = t) });
  window.scrollTo({ top: 0 });
}
window.addEventListener('hashchange', navigate);

/* ---------- Onboarding ---------- */
function onboarding() {
  const p = S().profile;
  openModal({
    title: 'Welcome',
    body: `
      <div class="onboard-hero"><img src="assets/img/logo.svg" alt=""><h3>Your UPSC journey, organised.</h3>
      <p class="muted" style="margin:6px 0 18px">Tracker, focus timer, reminders, notes, resources and AI quizzes — all in one calm place. ${cloud().configured ? 'Already have an account? Sign in to bring back your progress.' : 'Your data stays on this device.'}</p></div>
      <div class="stack">
        <div class="field"><label for="obName">What should we call you?</label><input class="input" id="obName" placeholder="Your name" value="${esc(p.name)}"></div>
        <div class="grid g-2" style="gap:12px">
          <div class="field"><label for="obExam">Prelims date</label><input class="input" type="date" id="obExam" value="${p.examDate}"></div>
          <div class="field"><label for="obTarget">Daily study target (hours)</label><input class="input" type="number" min="1" max="16" id="obTarget" value="${p.dailyTarget}"></div>
        </div>
        <p class="hint">CSE Prelims 2027 is pre-filled as 23 May 2027 — update it once UPSC publishes the official calendar.</p>
      </div>`,
    foot: `${cloud().configured && !cloud().user ? `<a class="btn ghost lg" href="#/profile" data-close>Sign in</a>` : ''}<button class="btn accent lg block" id="obGo" style="flex:1">Start preparing ${icon('arrow', 18)}</button>`,
    onMount(m, close) {
      m.querySelector('a[href="#/profile"]')?.addEventListener('click', () => {
        p.onboarded = true; // they'll set up their profile after signing in
        commit();
      });
      m.querySelector('#obGo').addEventListener('click', () => {
        p.name = m.querySelector('#obName').value.trim();
        p.examDate = m.querySelector('#obExam').value || p.examDate;
        p.dailyTarget = Math.max(1, Math.min(16, Number(m.querySelector('#obTarget').value) || 8));
        p.startDate = p.startDate || dateKey();
        p.onboarded = true;
        commit();
        close();
        navigate();
        toast(`Welcome aboard${p.name ? ', ' + p.name : ''}!`, 'good', 'Tip: start a focus session from Study Hours.');
      });
    },
  });
}

/* ---------- Boot ---------- */
renderNav();
renderCountdown();
applyTheme();
renderTimerChip();
renderAccountBtn();
navigate();
onCloudChange(renderAccountBtn);
// Cloud data replaced what was on this device (sign-in on a new device, edits from another device, sign-out).
window.addEventListener('yib:datareplaced', () => {
  renderNav();
  renderCountdown();
  applyTheme();
  renderTimerChip();
  renderAccountBtn();
  navigate();
});
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', renderThemeBtn);

let lastNavDue = notesDue().length;
subscribe(() => {
  renderCountdown();
  renderTimerChip();
  renderAccountBtn();
  const due = notesDue().length;
  if (due !== lastNavDue) {
    lastNavDue = due;
    renderNav();
  }
});

let n = 0;
setInterval(() => {
  timer.tick();
  renderTimerChip();
  window.dispatchEvent(new Event('yib:tick'));
  if (++n % 15 === 0) checkReminders();
}, 1000);
checkReminders();

// Restore a signed-in user's data before deciding whether this is a first visit.
Promise.race([initCloud(), new Promise((r) => setTimeout(r, 6000))])
  .catch((e) => console.warn(e))
  .finally(() => {
    renderAccountBtn();
    if (!S().profile.onboarded && !document.querySelector('.modal-backdrop')) onboarding();
  });
