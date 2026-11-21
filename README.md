# YourIASBuddy — youriasbuddy.com

A calm, modern study companion for UPSC CSE aspirants (built for the Prelims, May 2027 batch).

| Section | What it does |
|---|---|
| **Dashboard** | Countdown to Prelims, today's hours vs target, streak, tasks, quiz accuracy, weekly chart, upcoming reminders, revision queue |
| **Daily Tracker** | Week strip planner, subject-tagged tasks, priorities, carry-over, daily habits (newspaper, answer writing, PYQs…), 16-week consistency heatmap, day log |
| **Study Hours** | Pomodoro + stopwatch (survives reloads), manual logging, 14-day chart vs target, subject split, 6-month heatmap, session history |
| **Reminders** | Once / daily / weekdays / weekly reminders, presets, browser notifications + chime |
| **AI Quiz** | ChatGPT-generated **Prelims GS** (statement-based, pair-matching, Statement-I/II), **CSAT**, and **Mains** questions with answer frameworks + **AI answer evaluation**. English & हिन्दी, practice/exam modes, negative marking, mistake book → Notes, accuracy by subject |
| **Notes** | Markdown notebook with highlights, subject filters, search, pinning, spaced revision (1-3-7-15-30-60 days), "Quiz me on this note" |
| **Resources** | Curated library (UPSC, NCERT, PIB, PRS, standard books…) with progress tracking, plus your own links/books/videos |
| **Settings** | Profile & exam date, OpenAI key/model, theme, JSON backup/restore |

All data is stored locally in the browser (localStorage). No account needed.

## Run locally

No build step or dependencies. Serve the folder with any static server:

```bash
cd youriasbuddy
python3 -m http.server 5173
# open http://localhost:5173
```

(Opening `index.html` directly via `file://` won't work, because browsers block ES modules there.)

To use the AI quiz locally, open **Settings → AI quiz engine**, paste your OpenAI API key, and press **Test connection**.
The key stays in your browser and is sent only to `api.openai.com`.

## Deploy to youriasbuddy.com (Vercel, recommended)

1. Push this folder to a GitHub repo, then import it in Vercel (framework preset: **Other**, no build command).
2. In **Project → Settings → Environment Variables** add:
   - `OPENAI_API_KEY`: your key (kept on the server; visitors never see it)
   - `OPENAI_MODEL` (optional): defaults to `gpt-4o-mini`
   - `AI_RATE_LIMIT_PER_HOUR` (optional): per-IP cap, defaults to 40
3. In **Domains**, add `youriasbuddy.com` and point your DNS as Vercel instructs.

When no key is saved in a visitor's Settings, the app calls `/api/ai` (`api/ai.js`). That endpoint only accepts the three
whitelisted tasks (`prelims`, `mains`, `evaluate`) and builds prompts server-side, so it can't be used as an open OpenAI proxy.
The built-in rate limit is best-effort (per warm instance). For a public launch, add a durable limiter (e.g. Upstash/Vercel KV) and
set a monthly spend cap in your OpenAI dashboard.

## Project structure

```
index.html                 App shell
assets/css/styles.css      Design system (light/dark)
assets/js/app.js           Router, nav, timer chip, onboarding, reminder loop
assets/js/store.js         Local-first state + derived metrics
assets/js/prompts.js       UPSC prompt templates (shared by browser + server)
assets/js/ai.js            OpenAI client (direct key or /api/ai)
assets/js/timer.js         Pomodoro/stopwatch engine
assets/js/reminders-engine.js
assets/js/views/*.js       Dashboard, Tracker, Study, Quiz, Notes, Resources, Reminders, Settings
assets/js/data.js          Subjects, syllabus topics, curated library, sample questions
api/ai.js                  Vercel serverless function
```

## Notes

- The Prelims date defaults to **23 May 2027**. Update it in Settings once UPSC publishes the official 2027 calendar.
- Reminders fire while the site is open in a tab. Installing it as an app (browser menu → *Install*) and keeping it pinned works best.
- AI-generated questions can occasionally contain errors. Cross-check anything surprising against standard sources.
