# YourIASBuddy — youriasbuddy.com

A calm, modern study companion for UPSC CSE aspirants (built for the Prelims, May 2027 batch).

| Section | What it does |
|---|---|
| **Dashboard** | Countdown to Prelims, today's hours vs target, streak, tasks, quiz accuracy, weekly chart, upcoming reminders, revision queue |
| **Daily Tracker** | Week strip planner, subject-tagged tasks, priorities, carry-over, daily habits (newspaper, answer writing, PYQs…), 16-week consistency heatmap, day log |
| **Study Hours** | Pomodoro + stopwatch (survives reloads), manual logging, 14-day chart vs target, subject split, 6-month heatmap, session history |
| **Reminders** | Once / daily / weekdays / weekly reminders, presets, browser notifications + chime |
| **AI Quiz** | AI-generated (free Google Gemini, or OpenAI) **Prelims GS** (statement-based, pair-matching, Statement-I/II), **CSAT**, and **Mains** questions with answer frameworks + **AI answer evaluation**. English & हिन्दी, practice/exam modes, negative marking, mistake book → Notes, accuracy by subject |
| **Notes** | Markdown notebook with highlights, subject filters, search, pinning, spaced revision (1-3-7-15-30-60 days), "Quiz me on this note" |
| **Resources** | Curated library (UPSC, NCERT, PIB, PRS, standard books…) with progress tracking, plus your own links/books/videos |
| **Settings** | Profile & exam date, AI provider (Gemini free / OpenAI), theme, JSON backup/restore |

All data is stored locally in the browser (localStorage). No account needed.

## Run locally

No build step or dependencies. Serve the folder with any static server:

```bash
cd youriasbuddy
python3 -m http.server 5173
# open http://localhost:5173
```

(Opening `index.html` directly via `file://` won't work, because browsers block ES modules there.)

## Set up the free AI (Google Gemini)

1. Go to https://aistudio.google.com/apikey and sign in with any Google account.
2. Click **Create API key** (no credit card needed) and copy it.
3. In the app, open **Settings → AI quiz engine**, keep **Google Gemini · Free** selected, paste the key, and press **Save & test**.

Model **Auto** is recommended: it tries Google's current Flash model first and automatically falls back to Flash-Lite
(or older 2.5 models) when a model is unavailable or out of free quota. Press **Load** to see every model your key can use.

Free-tier limits are set per Google project and change over time (roughly a few requests per minute, with daily caps that reset at
midnight Pacific / 1:30 PM IST). Each generated quiz or Mains evaluation uses 1 request. Check your exact limits in AI Studio.
On the free tier Google may use prompts to improve its products, so don't paste personal data into quiz material.

OpenAI is still supported (Settings → **OpenAI (paid)**), but the API is pay-as-you-go and separate from a ChatGPT subscription.

## Deploy to youriasbuddy.com (Vercel, recommended)

1. Push this folder to a GitHub repo, then import it in Vercel (framework preset: **Other**, no build command).
2. In **Project → Settings → Environment Variables** add **one** of:
   - `GEMINI_API_KEY`: your free Gemini key (preferred when set). Optional `GEMINI_MODEL`, default `auto`
   - `OPENAI_API_KEY`: OpenAI key. Optional `OPENAI_MODEL`, default `gpt-4o-mini`
   - Optional `AI_RATE_LIMIT_PER_HOUR`: per-IP cap, default 40
3. In **Domains**, add `youriasbuddy.com` and point your DNS as Vercel instructs.

When no key is saved in a visitor's Settings, the app calls `/api/ai` (`api/ai.js`). That endpoint only accepts the three
whitelisted tasks (`prelims`, `mains`, `evaluate`) and builds prompts server-side, so it can't be used as an open OpenAI proxy.
The built-in rate limit is best-effort (per warm instance). For a public launch, add a durable limiter (e.g. Upstash/Vercel KV) and
note that one shared free Gemini key is shared by **all** visitors. Its free quota will run out fast on a public site,
so either ask visitors to add their own key in Settings or enable billing on the Google project.

## Project structure

```
index.html                 App shell
assets/css/styles.css      Design system (light/dark)
assets/js/app.js           Router, nav, timer chip, onboarding, reminder loop
assets/js/store.js         Local-first state + derived metrics
assets/js/prompts.js       UPSC prompt templates (shared by browser + server)
assets/js/ai.js            AI client (key in Settings or /api/ai)
assets/js/providers.js     Gemini + OpenAI adapters, Auto model fallback
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
