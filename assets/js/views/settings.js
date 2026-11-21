import { S, commit, exportJSON, replaceAll, resetAll } from '../store.js';
import { icon } from '../icons.js';
import { esc, download, dateKey } from '../utils.js';
import { toast, confirmDialog } from '../ui.js';
import { runAI, cleanMCQs } from '../ai.js';

const MODELS = ['gpt-4o-mini', 'gpt-4.1-mini', 'gpt-4o', 'gpt-4.1', 'gpt-5-mini', 'gpt-5'];

export function mount(el) {
  let showKey = false;

  function draw() {
    const { profile: p, settings: s } = S();
    el.innerHTML = `
    <div class="grid g-2">
      <div class="card">
        <div class="card-head"><h3>${icon('target', 17)} Profile & goal</h3></div>
        <form id="profile" class="stack">
          <div class="field"><label>Name</label><input class="input" name="name" value="${esc(p.name)}" placeholder="Your name"></div>
          <div class="grid g-2" style="gap:12px">
            <div class="field"><label>Prelims date</label><input class="input" type="date" name="examDate" value="${p.examDate}"></div>
            <div class="field"><label>Preparation started</label><input class="input" type="date" name="startDate" value="${p.startDate || dateKey()}" max="${dateKey()}"></div>
          </div>
          <div class="field"><label>Daily study target (hours)</label><input class="input" type="number" min="1" max="16" name="dailyTarget" value="${p.dailyTarget}"></div>
          <p class="hint">Default Prelims date is 23 May 2027. Verify on the <a href="https://upsc.gov.in/examinations/exam-calendar" target="_blank" rel="noopener">UPSC exam calendar</a>.</p>
          <div><button class="btn primary">Save profile</button></div>
        </form>
      </div>

      <div class="card">
        <div class="card-head"><h3>${icon('sparkles', 17)} AI quiz engine (ChatGPT)</h3></div>
        <div class="stack">
          <div class="field"><label for="apiKey">OpenAI API key</label>
            <div class="row"><input class="input mono" id="apiKey" type="${showKey ? 'text' : 'password'}" placeholder="sk-…" value="${esc(s.apiKey)}" autocomplete="off" spellcheck="false" style="font-size:13px">
            <button class="icon-btn" data-showkey aria-label="Show or hide key">${icon('eye', 16)}</button></div>
            <span class="hint">Get one at platform.openai.com → API keys. Stored only in this browser and sent only to OpenAI. Leave empty if your deployed site has a server key configured.</span></div>
          <div class="field"><label for="model">Model</label>
            <input class="input" id="model" list="models" value="${esc(s.model)}"><datalist id="models">${MODELS.map((m) => `<option value="${m}">`).join('')}</datalist>
            <span class="hint">Use a model your OpenAI account has access to. "mini" models are fast and cheap; larger models give sharper questions.</span></div>
          <div class="row wrap">
            <button class="btn primary" data-saveai>Save</button>
            <button class="btn" data-test>${icon('sparkles', 15)} Test connection</button>
            ${s.apiKey ? `<button class="btn ghost danger" data-clearkey>Remove key</button>` : ''}
          </div>
          <div id="testOut"></div>
        </div>
      </div>

      <div class="card">
        <div class="card-head"><h3>${icon('sun', 17)} Appearance & sound</h3></div>
        <div class="stack">
          <div class="field"><span class="label">Theme</span><div class="seg">${['system', 'light', 'dark'].map((t) => `<button class="${s.theme === t ? 'on' : ''}" data-theme="${t}">${t[0].toUpperCase() + t.slice(1)}</button>`).join('')}</div></div>
          <label class="row" style="cursor:pointer"><span class="switch"><input type="checkbox" id="sound" ${s.sound ? 'checked' : ''}><span></span></span><span>Play a chime for reminders & timer</span></label>
        </div>
      </div>

      <div class="card">
        <div class="card-head"><h3>${icon('download', 17)} Your data</h3></div>
        <p class="hint" style="margin-bottom:14px">Everything is stored privately in this browser. Export a backup regularly, and import it on another device to continue.</p>
        <div class="row wrap">
          <button class="btn" data-export>${icon('download', 15)} Export backup</button>
          <label class="btn">${icon('upload', 15)} Import backup<input type="file" id="importFile" accept="application/json,.json" hidden></label>
          <button class="btn ghost danger" data-reset>${icon('trash', 15)} Reset everything</button>
        </div>
        <hr class="divider">
        <p class="hint">${S().sessions.length} study sessions · ${S().notes.length} notes · ${S().quizzes.length} quizzes · ${S().reminders.length} reminders</p>
      </div>
    </div>
    <p class="hint" style="text-align:center;margin-top:28px">YourIASBuddy · made for the 2027 batch · <span class="serif" style="font-size:16px">Stay consistent.</span></p>`;
  }

  el.addEventListener('submit', (e) => {
    if (e.target.id !== 'profile') return;
    e.preventDefault();
    const f = e.target;
    const p = S().profile;
    p.name = f.name.value.trim();
    p.examDate = f.examDate.value || p.examDate;
    p.startDate = f.startDate.value || p.startDate;
    p.dailyTarget = Math.max(1, Math.min(16, Number(f.dailyTarget.value) || 8));
    commit();
    toast('Profile saved', 'good');
  });

  el.addEventListener('click', async (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    const d = b.dataset;
    const s = S().settings;
    if ('showkey' in d) { saveAI(false); showKey = !showKey; draw(); }
    else if ('saveai' in d) saveAI(true);
    else if ('clearkey' in d) { s.apiKey = ''; commit(); draw(); toast('API key removed', 'good'); }
    else if ('test' in d) {
      saveAI(false);
      const out = el.querySelector('#testOut');
      out.innerHTML = `<div class="notice info">${icon('clock', 18)}<div>Asking the AI for a sample question…</div></div>`;
      b.disabled = true;
      try {
        const res = cleanMCQs(await runAI('prelims', { subject: 'Polity', topic: 'Preamble', count: 1, difficulty: 'Moderate' }));
        out.innerHTML = `<div class="notice info" style="background:var(--good-soft);border-color:transparent">${icon('check', 18)}<div><b>Connected!</b> Sample: “${esc(res[0]?.stem || 'OK')}”</div></div>`;
      } catch (err) {
        out.innerHTML = `<div class="notice">${icon('alert', 18)}<div>${esc(err.message)}</div></div>`;
      }
      b.disabled = false;
    } else if (d.theme) {
      s.theme = d.theme;
      commit();
      const t = d.theme;
      if (t === 'system') delete document.documentElement.dataset.theme;
      else document.documentElement.dataset.theme = t;
      document.getElementById('themeBtn').innerHTML = icon((t === 'dark' || (t === 'system' && matchMedia('(prefers-color-scheme: dark)').matches)) ? 'sun' : 'moon', 18);
      draw();
    } else if ('export' in d) {
      download(`youriasbuddy-backup-${dateKey()}.json`, exportJSON());
      toast('Backup downloaded', 'good', 'Your API key is not included.');
    } else if ('reset' in d) {
      if (await confirmDialog('This permanently deletes all your tasks, sessions, notes, quizzes and settings on this device. Export a backup first if unsure.', 'Delete everything')) {
        resetAll();
        location.hash = '#/dashboard';
        location.reload();
      }
    }
  });

  el.addEventListener('change', async (e) => {
    if (e.target.id === 'sound') { S().settings.sound = e.target.checked; commit(); }
    if (e.target.id === 'importFile') {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const data = JSON.parse(await file.text());
        if (!data || typeof data !== 'object' || !('profile' in data)) throw new Error('bad');
        if (!(await confirmDialog('Importing replaces all current data on this device with the backup. Continue?', 'Import'))) return;
        const key = S().settings.apiKey;
        replaceAll(data);
        S().settings.apiKey = key; // keep the key the user already has
        commit();
        toast('Backup restored', 'good');
        setTimeout(() => location.reload(), 600);
      } catch {
        toast('That file is not a valid YourIASBuddy backup', 'bad');
      }
    }
  });

  function saveAI(notify) {
    const s = S().settings;
    const k = el.querySelector('#apiKey');
    const m = el.querySelector('#model');
    if (k) s.apiKey = k.value.trim();
    if (m) s.model = m.value.trim() || 'gpt-4o-mini';
    commit();
    if (notify) toast('AI settings saved', 'good');
  }

  draw();
}
