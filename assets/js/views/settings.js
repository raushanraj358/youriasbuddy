import { S, commit, exportJSON, replaceAll, resetAll } from '../store.js';
import { icon } from '../icons.js';
import { esc, download, dateKey } from '../utils.js';
import { toast, confirmDialog } from '../ui.js';
import { runAI, cleanMCQs } from '../ai.js';
import { listGeminiModels, GEMINI_AUTO_CHAIN } from '../providers.js';

const OPENAI_MODELS = ['gpt-4o-mini', 'gpt-4.1-mini', 'gpt-4o', 'gpt-4.1', 'gpt-5-mini', 'gpt-5'];
let geminiModels = null; // loaded from the user's key

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
        <div class="card-head"><h3>${icon('sparkles', 17)} AI quiz engine</h3>${(s.provider === 'openai' ? s.apiKey : s.geminiKey) ? '<span class="tag" style="color:var(--good)">● Connected key saved</span>' : '<span class="tag">Not set up</span>'}</div>
        <div class="stack">
          <div class="field"><span class="label">Provider</span><div class="seg">
            <button class="${s.provider !== 'openai' ? 'on' : ''}" data-provider="gemini">Google Gemini · Free</button>
            <button class="${s.provider === 'openai' ? 'on' : ''}" data-provider="openai">OpenAI (paid)</button></div></div>
          ${s.provider !== 'openai' ? `
          <ol class="hint" style="margin:0;padding-left:18px;line-height:1.8">
            <li>Open <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener" style="font-weight:700">Google AI Studio → API keys</a> and sign in with any Google account.</li>
            <li>Click <b>Create API key</b> (no credit card needed) and copy it.</li>
            <li>Paste it below, then press <b>Save & test</b>.</li>
          </ol>
          <div class="field"><label for="geminiKey">Gemini API key</label>
            <div class="row"><input class="input mono" id="geminiKey" type="${showKey ? 'text' : 'password'}" placeholder="AIza…" value="${esc(s.geminiKey)}" autocomplete="off" spellcheck="false" style="font-size:13px">
            <button class="icon-btn" data-showkey aria-label="Show or hide key">${icon('eye', 16)}</button></div></div>
          <div class="field"><label for="geminiModel">Model</label>
            <div class="row"><select class="select" id="geminiModel">
              <option value="auto" ${s.geminiModel === 'auto' ? 'selected' : ''}>Auto (recommended)</option>
              ${[...new Set([...(geminiModels || GEMINI_AUTO_CHAIN), ...(s.geminiModel && s.geminiModel !== 'auto' ? [s.geminiModel] : [])])].map((m) => `<option value="${esc(m)}" ${s.geminiModel === m ? 'selected' : ''}>${esc(m)}</option>`).join('')}
            </select>
            <button class="btn" data-loadmodels title="Fetch the models your key can use">${icon('revise', 15)} Load</button></div>
            <span class="hint">Auto picks the best free model and switches if one hits its limit. ${geminiModels ? `${geminiModels.length} models available to your key.` : 'Press Load to list the models your key can use.'} Free-tier limits are per Google project (Flash ≈ a few requests/min; Flash-Lite allows more per day). Each quiz uses 1 request.</span></div>
          <p class="hint">Free-tier note: Google may use free-tier prompts to improve its products — don't paste personal information into quiz material.</p>`
          : `
          <div class="field"><label for="apiKey">OpenAI API key</label>
            <div class="row"><input class="input mono" id="apiKey" type="${showKey ? 'text' : 'password'}" placeholder="sk-…" value="${esc(s.apiKey)}" autocomplete="off" spellcheck="false" style="font-size:13px">
            <button class="icon-btn" data-showkey aria-label="Show or hide key">${icon('eye', 16)}</button></div>
            <span class="hint">The OpenAI API is pay-as-you-go (separate from a ChatGPT subscription) and needs billing credit.</span></div>
          <div class="field"><label for="model">Model</label>
            <input class="input" id="model" list="models" value="${esc(s.model)}"><datalist id="models">${OPENAI_MODELS.map((m) => `<option value="${m}">`).join('')}</datalist></div>`}
          <p class="hint">Keys are stored only in this browser and sent only to the provider. Leave empty if your deployed site has a server key.</p>
          <div class="row wrap">
            <button class="btn primary" data-test>${icon('sparkles', 15)} Save & test</button>
            ${(s.provider === 'openai' ? s.apiKey : s.geminiKey) ? `<button class="btn ghost danger" data-clearkey>Remove key</button>` : ''}
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
    if ('showkey' in d) { saveAI(); showKey = !showKey; draw(); }
    else if (d.provider) { saveAI(); s.provider = d.provider; commit(); draw(); }
    else if ('clearkey' in d) {
      if (s.provider === 'openai') s.apiKey = ''; else { s.geminiKey = ''; geminiModels = null; }
      commit(); draw(); toast('API key removed', 'good');
    } else if ('loadmodels' in d) {
      saveAI();
      if (!s.geminiKey) return toast('Paste your Gemini key first', 'bad');
      b.disabled = true;
      try {
        geminiModels = await listGeminiModels(s.geminiKey);
        draw();
        toast(`Found ${geminiModels.length} models`, 'good');
      } catch (err) {
        toast(err.message, 'bad');
        b.disabled = false;
      }
    }
    else if ('test' in d) {
      saveAI();
      if (!(s.provider === 'openai' ? s.apiKey : s.geminiKey)) return toast('Paste your API key first', 'bad');
      const out = el.querySelector('#testOut');
      out.innerHTML = `<div class="notice info">${icon('clock', 18)}<div>Saved. Asking ${s.provider === 'openai' ? 'OpenAI' : 'Gemini'} for a sample question…</div></div>`;
      b.disabled = true;
      try {
        const res = cleanMCQs(await runAI('prelims', { subject: 'Polity', topic: 'Preamble', count: 1, difficulty: 'Moderate' }));
        draw();
        el.querySelector('#testOut').innerHTML = `<div class="notice info" style="background:var(--good-soft);border-color:transparent">${icon('check', 18)}<div><b>Connected! AI quizzes are ready.</b><br>Sample: “${esc(res[0]?.stem || 'OK')}”</div></div>`;
        return;
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
    if (['geminiModel', 'geminiKey', 'apiKey', 'model'].includes(e.target.id)) { saveAI(); toast('AI settings saved', 'good'); }
    if (e.target.id === 'importFile') {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const data = JSON.parse(await file.text());
        if (!data || typeof data !== 'object' || !('profile' in data)) throw new Error('bad');
        if (!(await confirmDialog('Importing replaces all current data on this device with the backup. Continue?', 'Import'))) return;
        const { apiKey, geminiKey } = S().settings;
        replaceAll(data);
        Object.assign(S().settings, { apiKey, geminiKey }); // keep the keys the user already has
        commit();
        toast('Backup restored', 'good');
        setTimeout(() => location.reload(), 600);
      } catch {
        toast('That file is not a valid YourIASBuddy backup', 'bad');
      }
    }
  });

  function saveAI() {
    const s = S().settings;
    const v = (id) => el.querySelector(id)?.value.trim();
    if (el.querySelector('#apiKey')) s.apiKey = v('#apiKey');
    if (el.querySelector('#model')) s.model = v('#model') || 'gpt-4o-mini';
    if (el.querySelector('#geminiKey')) s.geminiKey = v('#geminiKey');
    if (el.querySelector('#geminiModel')) s.geminiModel = v('#geminiModel') || 'auto';
    commit();
  }

  draw();
}
