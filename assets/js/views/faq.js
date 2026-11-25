// FAQs: about YourIASBuddy and about the UPSC Civil Services Examination. Static content; answers support **bold** via md().
import { icon } from '../icons.js';
import { esc } from '../utils.js';
import { md } from '../md.js';
import { config } from '../config.js';

const FAQS = () => [
  {
    id: 'app', title: 'About YourIASBuddy', icon: 'info', items: [
      ['What is YourIASBuddy?', 'A free study companion for UPSC Civil Services aspirants. It brings together a daily tracker, a focus timer, reminders, the full syllabus with key notes, quizzes, a notebook with spaced revision and curated current-affairs sources, all in one place.'],
      ['Is it free?', 'Yes. Every feature is free to use. The built-in AI has a small daily allowance so the shared free quota lasts for everyone (see the AI questions below).'],
      ['Do I need an account?', 'No. Everything works as a guest, and your data stays in this browser. Sign in with Google (or an email link) from **Profile** only if you want your progress saved to your account and synced across devices.'],
      ['Can I use it on my phone?', 'Yes. The site works in any modern mobile browser. Use your browser\'s **Add to Home Screen** option to open it like an app.'],
      ['How do I report a problem or suggest a feature?', 'Open the **Contact** page (in the menu and the footer), choose what your message is about and send it. You can also email **youriasbuddy@gmail.com**, or follow and message us on Instagram and X at **@youriasbuddy**.'],
      ['Is YourIASBuddy affiliated with UPSC?', 'No. It is an independent study tool. Always check exam dates, eligibility and rules in the official notification on **upsc.gov.in**.'],
    ],
  },
  {
    id: 'quiz', title: 'Quizzes & study material', icon: 'target', items: [
      ['What is the offline quiz?', 'A ready-made question bank with **5 Prelims-style questions on every syllabus topic**, written from standard sources (NCERT, Laxmikanth, government documents). It needs no AI and no API key. Open **Quiz → Offline quiz**, or use **Offline quiz (no AI)** on any topic page in Study Material.'],
      ['How is the quiz scored?', 'Prelims GS questions carry **+2** for a correct answer and **−0.66** (one-third) for a wrong one. CSAT carries **+2.5 / −0.83**. Unattempted questions score zero, just like the real exam.'],
      ['What is the difference between practice mode and exam mode?', 'In **practice mode** you see the answer and explanation right after each question. In **exam mode** you answer everything first, can mark questions for review, and see the full analysis after you submit.'],
      ['Where do my mistakes go?', 'After a quiz, tap **Save mistakes to Notes**. Your wrong and skipped questions become a note that is scheduled for revision the next day.'],
      ['What are key notes and AI notes?', 'Every syllabus topic has **key notes**: a short, offline summary with Prelims pointers, Mains angles and common traps. **AI notes** are longer, generated on demand, and can be in English or Hindi. Both can be saved to your notebook.'],
      ['Can I add my own topics, for example for my optional?', 'Yes. Open a subject in **Study Material** and add your own topics. You can track their status and generate AI notes and quizzes for them.'],
    ],
  },
  {
    id: 'ai', title: 'AI features', icon: 'sparkles', items: [
      ['How many AI requests do I get?', `Guests get **${config().aiGuestLimit} a day** and signed-in users get **${config().aiDailyLimit} a day**. Each AI quiz, AI notes page or Mains evaluation uses one request. The count resets every day.`],
      ['How can I get unlimited AI?', 'Add your own free Google Gemini key under **Settings → AI quiz engine → Advanced**. Requests then go straight from your browser to Google, and the daily allowance no longer applies. Your key stays on this device; it is never synced or included in exports.'],
      ['Can AI answers be wrong?', 'Yes, occasionally. The prompts insist on standard sources, but always cross-check facts, figures and dates with NCERT, Laxmikanth, PIB or the official source before you rely on them.'],
      ['Can I get questions and notes in Hindi?', 'Yes. Choose **हिन्दी** before generating an AI quiz, AI notes or a Mains set. The offline quiz and key notes are in English.'],
      ['How does Mains answer evaluation work?', 'Write your answer in the box (at least 30 words) and tap **Evaluate with AI**. You get a score, strengths, areas to improve, missing dimensions and a better introduction and conclusion. Use it as guidance, not as an official score.'],
    ],
  },
  {
    id: 'data', title: 'Your data & sync', icon: 'cloud', items: [
      ['Where is my data stored?', 'As a guest, everything stays in this browser\'s local storage. When you sign in, the same data is also saved to your account so it is available on your other devices.'],
      ['What happens if I clear my browser data?', 'Guest data is deleted with it. To be safe, sign in, or use **Export backup** under **Settings → Your data** from time to time.'],
      ['I used the site as a guest, then signed in. Will I lose my progress?', 'No. If both this device and your account have data, you are asked which one to keep.'],
      ['Can I move my data to another device without an account?', 'Yes. Use **Export backup** under **Settings → Your data** to download a JSON file, then **Import backup** on the other device.'],
      ['How do I delete my data?', 'To clear this device, use **Reset everything** under **Settings → Your data**. To remove your synced data, go to **Profile → Privacy & data → Delete my data from the cloud**.'],
    ],
  },
  {
    id: 'upsc', title: 'About the UPSC exam', icon: 'book', items: [
      ['What are the stages of the Civil Services Examination?', 'Three stages: **Preliminary** (objective, screening only), **Main** (written, descriptive) and the **Personality Test** (interview). Only Mains and interview marks count for the final merit list.'],
      ['What is the Prelims pattern?', 'Two objective papers of **200 marks** each, on the same day. **GS Paper I** has 100 questions; **CSAT (Paper II)** has 80 questions. Each wrong answer costs one-third of that question\'s marks. The cut-off is decided on GS Paper I alone.'],
      ['Is CSAT counted for merit?', 'No. CSAT is **qualifying**: you need at least **33%** (66 marks out of 200). Your GS Paper I marks decide whether you clear Prelims.'],
      ['What is the Mains pattern?', 'Nine descriptive papers. Two are qualifying (**Paper A**: an Indian language, **Paper B**: English; 300 marks each, 25% to qualify). Seven are counted: **Essay** and **GS I–IV** (250 marks each) and **two Optional papers** (250 each), a total of **1750**. The interview carries **275**, making **2025** in all.'],
      ['What is the age limit and how many attempts are allowed?', 'Generally a candidate must be **21 to 32 years** old on 1 August of the exam year, with **6 attempts** for the general category. Relaxations apply: OBC up to 35 years and 9 attempts; SC/ST up to 37 years with no limit on attempts; further relaxation for PwBD and some other categories. **Always confirm in the current year\'s notification.**'],
      ['Does appearing in Prelims count as an attempt?', 'Yes. Appearing in even one paper of the Preliminary examination counts as an attempt. Applying without appearing does not.'],
      ['Where do I find previous year questions?', 'UPSC publishes previous question papers on **upsc.gov.in** under Examinations → Previous Question Papers. A link is in **Resources**.'],
      ['When is Prelims 2027?', `The app pre-fills **23 May 2027**. Update your exam date in **Profile** once UPSC publishes its official calendar.`],
    ],
  },
];

export function mount(el) {
  const sections = FAQS();
  let q = '';
  let open = null; // section filter

  const item = ([ques, ans]) => `
    <details class="faq-item">
      <summary><span>${esc(ques)}</span>${icon('right', 16)}</summary>
      <div class="faq-a md">${md(ans)}</div>
    </details>`;

  const draw = () => {
    const needle = q.trim().toLowerCase();
    const shown = sections
      .filter((s) => !open || s.id === open)
      .map((s) => ({ ...s, items: s.items.filter(([a, b]) => !needle || (a + ' ' + b).toLowerCase().includes(needle)) }))
      .filter((s) => s.items.length);
    el.querySelector('#faqList').innerHTML = shown.length
      ? shown.map((s) => `
        <section class="card faq-sec">
          <div class="card-head"><h3>${icon(s.icon, 17)} ${esc(s.title)}</h3></div>
          ${s.items.map(item).join('')}
        </section>`).join('')
      : `<div class="card"><p class="muted">No questions match “${esc(q)}”. Try another word.</p></div>`;
    el.querySelectorAll('[data-sec]').forEach((b) => b.classList.toggle('on', (b.dataset.sec || null) === open));
    if (needle) el.querySelectorAll('.faq-item').forEach((d) => (d.open = true));
  };

  el.innerHTML = `
    <div class="stack" style="gap:16px;max-width:860px">
      <div class="faq-search"><span class="faq-search-ico">${icon('search', 17)}</span><input class="input" id="faqQ" type="search" placeholder="Search the FAQs" autocomplete="off" aria-label="Search the FAQs"></div>
      <div class="row wrap" style="gap:6px">
        <button class="chip on" data-sec="">All</button>
        ${sections.map((s) => `<button class="chip" data-sec="${s.id}">${esc(s.title)}</button>`).join('')}
      </div>
      <div class="stack" id="faqList" style="gap:16px"></div>
      <p class="hint">Still stuck? Read the <a href="privacy.html">Privacy</a> and <a href="terms.html">Terms</a> pages, or check the official notification on <a href="https://upsc.gov.in" target="_blank" rel="noopener">upsc.gov.in</a>.</p>
    </div>`;

  el.addEventListener('input', (e) => {
    if (e.target.id === 'faqQ') { q = e.target.value; draw(); }
  });
  el.addEventListener('click', (e) => {
    const b = e.target.closest('[data-sec]');
    if (b) { open = b.dataset.sec || null; draw(); }
  });
  draw();
}
