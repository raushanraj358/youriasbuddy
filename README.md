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
| **Profile** | Sign in (email link or Google) to sync progress across devices, goal & exam date, lifetime stats, subject split, recent activity |
| **Study Material** | The UPSC CSE syllabus by paper → subject → topic: status tracking (Not started / Reading / Done / Revised), AI study notes per topic (English/हिन्दी) with Prelims pointers, Mains angles and PYQ themes, save to Notes, quiz on the topic, curated sources, your own topics (e.g. optional) |
| **Settings** | AI (built-in, or your own Gemini/OpenAI key), theme, JSON backup/restore |

Guests can use everything with no account: data stays in the browser (localStorage). Signing in (optional, Supabase) saves the same data to the user's account so it follows them across devices.

## Hosting: GitHub Pages + Supabase (all free, no card)

- **Website:** GitHub Pages. Every push to `main` publishes https://raushanraj358.github.io/youriasbuddy/ via `.github/workflows/jekyll-gh-pages.yml`.
- **Accounts, cloud sync and free AI:** Supabase Free. GitHub Pages can't keep secrets or run server code, so the Gemini key lives
  in a Supabase **Edge Function** (`supabase/functions/ai`), and sign-in plus data sync use Supabase Auth and Postgres.

Free AI allowance: **5 requests/day for guests** (counted per IP address) and **25/day for signed-in users**. Each quiz, study-notes page
or Mains evaluation uses one. Gemini's own free quota is shared by everyone, so these caps keep it from running out. Users who want
unlimited use can add their own free key in Settings → *Advanced*.

### One-time setup (about 25 minutes)

**1. Create the Supabase project**
1. Sign up at https://supabase.com → **New project** (region: Mumbai). Save the database password somewhere safe.
2. **SQL Editor → New query**: paste all of `supabase/schema.sql` → **Run**.

**2. Free AI for everyone (Edge Function)**
1. Get a free Gemini key at https://aistudio.google.com/apikey. Do **not** enable billing on that Google project; that keeps it free.
2. Supabase → **Edge Functions → Secrets** → add `GEMINI_API_KEY` = your key.
3. **Edge Functions → Deploy a new function → Via Editor**. Name it exactly `ai`, replace the sample code with the whole of
   `supabase/functions/ai/index.ts`, and **Deploy**.
4. Open the function's **Details / Settings** and turn **OFF** "Verify JWT" / "Enforce JWT verification" (the function checks callers
   itself so guests can use it), then save.
5. Optional secrets: `AI_DAILY_LIMIT` (default 25), `AI_GUEST_DAILY_LIMIT` (default 5), `GEMINI_MODEL` (default `auto`),
   `ALLOWED_ORIGINS` (default `https://raushanraj358.github.io,http://localhost:5173`; add your domain here if you buy one later).

**3. Google sign-in**
1. Google Cloud Console (https://console.cloud.google.com) → create a project → **Google Auth Platform / OAuth consent screen**:
   app name *YourIASBuddy*, user type **External**, add your email as support/developer contact. Then **Publish app** (stays free;
   basic email/profile scopes need no Google review).
2. **Clients → Create client → Web application**. Under **Authorised redirect URIs**, add
   `https://<your-project-ref>.supabase.co/auth/v1/callback` (Supabase shows this exact URL in step 3).
3. Supabase → **Authentication → Sign In / Providers → Google** → enable, paste the **Client ID** and **Client secret** → Save.
4. Supabase → **Authentication → URL Configuration**: set **Site URL** to `https://raushanraj358.github.io/youriasbuddy/`,
   and add the same URL plus `http://localhost:5173/` under **Redirect URLs**.

**4. Connect the website**
1. Supabase → **Project Settings → API** (or the **Connect** button): copy the **Project URL** and the **anon / publishable** key.
2. Paste both into `assets/js/config.js` (`supabaseUrl`, `supabaseAnonKey`), then commit and push. Both are meant to be public.
   **Never** put the `service_role` / secret key or the Gemini key in this file.

Email sign-in links also work as a fallback ("Use email instead"), but Supabase's built-in mailer only sends a few emails per hour.
Set `emailAuth: false` in `config.js` to hide it, or add free SMTP (e.g. Resend/Brevo) under Authentication → Emails.

### How sync works

Each signed-in user has one row (`user_data`) holding their whole study data as JSON, protected by row-level security. Changes save automatically
a few seconds after you make them, and again when the tab is hidden. A revision number detects edits made on another device; if both sides changed,
the user picks which copy to keep. API keys are never uploaded. Signing out clears the device; the data stays in the account.

### Changing prompts or the AI function

`supabase/functions/ai/index.ts` is generated so the site and the function share the same prompt code. After editing `assets/js/prompts.js`,
`assets/js/providers.js` or `tools/edge_handler.js`, run `python3 tools/build_edge_function.py` and paste the new `index.ts` into the
Supabase editor again (or `supabase functions deploy ai` with the CLI).

## Run locally

No build step or dependencies:

```bash
cd youriasbuddy
python3 -m http.server 5173
# open http://localhost:5173
```

Locally it uses the same Supabase project as the live site (sign-in, sync, free AI), because `http://localhost:5173` is in the allowed lists above.

## Project structure

```
index.html                 App shell
assets/css/styles.css      Design system (light/dark)
assets/js/app.js           Router, nav, timer chip, onboarding, reminder loop
assets/js/store.js         Local-first state + derived metrics
assets/js/prompts.js       UPSC prompt templates (shared by browser + server)
assets/js/ai.js            AI client (own key in Settings, else the Supabase "ai" Edge Function)
assets/js/cloud.js         Supabase sign-in + cloud sync
assets/js/config.js        Public Supabase URL + anon key, feature switches
assets/js/providers.js     Gemini + OpenAI adapters, Auto model fallback
assets/js/timer.js         Pomodoro/stopwatch engine
assets/js/reminders-engine.js
assets/js/views/*.js       Dashboard, Tracker, Study, Quiz, Notes, Resources, Reminders, Settings
assets/js/data.js          Subjects, syllabus topics, curated library, sample questions
assets/js/views/profile.js Account, goal, lifetime stats
assets/js/views/syllabus.js Study Material (syllabus topics, progress, AI study notes)
supabase/schema.sql        Tables, row-level security, AI usage counter
supabase/functions/ai/     Edge Function holding the Gemini key (generated)
tools/                     Edge Function source + build script
```

## Notes

- The Prelims date defaults to **23 May 2027**. Update it in Settings once UPSC publishes the official 2027 calendar.
- Reminders fire while the site is open in a tab. Installing it as an app (browser menu → *Install*) and keeping it pinned works best.
- AI-generated questions can occasionally contain errors. Cross-check anything surprising against standard sources.
