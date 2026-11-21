# YourIASBuddy

A calm, modern study companion for UPSC Civil Services aspirants (built for the Prelims, May 2027 batch).

**Live site:** https://raushanraj358.github.io/youriasbuddy/

No install and no build step. It's a static web app on GitHub Pages, with optional accounts and free AI powered by Supabase.

## Features

| Section | What it does |
|---|---|
| **Dashboard** | Countdown to Prelims, today's hours vs target, streak, tasks, quiz accuracy, weekly chart, upcoming reminders, revision queue |
| **Daily Tracker** | Week-strip planner, subject-tagged tasks, priorities, carry-over, daily habits (newspaper, answer writing, PYQs…), 16-week consistency heatmap, day log |
| **Study Hours** | Pomodoro + stopwatch (survives reloads), manual logging, 14-day chart vs target, subject split, 6-month heatmap, session history |
| **Reminders** | Once / daily / weekdays / weekly reminders, presets, browser notifications + chime |
| **Study Material** | The UPSC CSE syllabus by paper → subject → topic. Track each topic (Not started / Reading / Done / Revised), generate AI study notes (English or हिन्दी) with Prelims pointers, Mains angles and PYQ themes, save them to Notes, quiz yourself on the topic, see recommended sources, add your own topics (e.g. for your optional) |
| **AI Quiz** | **Prelims GS** (statement-based, pair matching, Statement-I/II), **CSAT** and **Mains** questions with answer frameworks + **AI answer evaluation**. English & हिन्दी, practice/exam modes, negative marking, mistake book → Notes, accuracy by subject |
| **Notes** | Markdown notebook with highlights, subject filters, search, pinning, spaced revision (1-3-7-15-30-60 days), "Quiz me on this note" |
| **Resources** | Curated library (UPSC, NCERT, PIB, PRS, standard books…) with progress tracking, plus your own links/books/videos |
| **Profile** | Continue with Google to save and sync progress across devices. Goal & exam date, lifetime stats, hours and quiz accuracy by subject, syllabus covered, recent activity |
| **Settings** | AI (built-in free AI, or your own Gemini/OpenAI key), theme & sound, JSON backup/restore |

**No account needed.** Guests can use everything, and their data stays in the browser (localStorage). Signing in saves the same data
to the user's account so it follows them across phone and laptop.

## How it's hosted (all free, no credit card)

| Piece | Service | Notes |
|---|---|---|
| Website | GitHub Pages | Every push to `main` publishes the site via `.github/workflows/jekyll-gh-pages.yml` |
| Sign-in | Supabase Auth | Google sign-in (email magic link as a fallback) |
| Cloud sync | Supabase Postgres | One row per user, protected by row-level security |
| Free AI | Supabase Edge Function `ai` | Holds the Gemini key; GitHub Pages can't keep secrets or run server code |
| AI model | Google Gemini free tier | Stays free as long as billing is **not** enabled on the Google project |

**Free AI allowance:** 5 requests a day for guests (counted per IP address) and 25 a day for signed-in users. Each quiz, study-notes page or
Mains evaluation uses one. These caps stop the shared Gemini free quota from running out. Anyone who wants unlimited use can add
their own free Gemini key under Settings → *Advanced*.

## One-time setup (about 25 minutes)

Until this is done, the site still works in guest mode. AI only works for visitors who add their own key in Settings.

### 1. Create the Supabase project
1. Sign up at https://supabase.com → **New project** (region: Mumbai). Save the database password somewhere safe.
2. **SQL Editor → New query**: paste all of [`supabase/schema.sql`](supabase/schema.sql) → **Run**.

### 2. Free AI for everyone (Edge Function)
1. Create a free Gemini key at https://aistudio.google.com/apikey. Do **not** enable billing on that Google project.
2. Supabase → **Edge Functions → Secrets** → add `GEMINI_API_KEY` = your key.
3. **Edge Functions → Deploy a new function → Via Editor**. Name it exactly `ai`, replace the sample code with the whole of
   [`supabase/functions/ai/index.ts`](supabase/functions/ai/index.ts), then **Deploy**.
4. In the function's settings, turn **OFF** "Verify JWT" / "Enforce JWT verification" and save. The function checks callers itself, so guests can use it.
5. Optional secrets:

   | Secret | Default | Meaning |
   |---|---|---|
   | `AI_DAILY_LIMIT` | `25` | Requests/day for signed-in users |
   | `AI_GUEST_DAILY_LIMIT` | `5` | Requests/day per IP for guests |
   | `GEMINI_MODEL` | `auto` | `auto` tries Flash, then falls back to Flash-Lite / 2.5 models |
   | `ALLOWED_ORIGINS` | `https://raushanraj358.github.io,http://localhost:5173` | Sites allowed to call the function. Add your domain if you buy one |

   If you change the limits, update `aiDailyLimit` / `aiGuestLimit` in `assets/js/config.js` too (they're only used for display).

### 3. Google sign-in
1. Google Cloud Console (https://console.cloud.google.com) → create a project → **Google Auth Platform / OAuth consent screen**:
   app name *YourIASBuddy*, user type **External**, your email as the contact. Then **Publish app**. It's free, and the basic
   email/profile scopes need no Google review.
2. **Clients → Create client → Web application**. Under **Authorised redirect URIs**, add
   `https://<your-project-ref>.supabase.co/auth/v1/callback` (Supabase shows this exact URL in the next step).
3. Supabase → **Authentication → Sign In / Providers → Google** → enable it, paste the **Client ID** and **Client secret** → Save.
4. Supabase → **Authentication → URL Configuration**: set **Site URL** to `https://raushanraj358.github.io/youriasbuddy/`, and add
   that URL plus `http://localhost:5173/` under **Redirect URLs**.

### 4. Connect the website
1. Supabase → **Project Settings → API** (or the **Connect** button): copy the **Project URL** and the **anon / publishable** key.
2. Paste them into [`assets/js/config.js`](assets/js/config.js) as `supabaseUrl` and `supabaseAnonKey`, then commit and push.

Both values are meant to be public; row-level security protects each user's data. **Never** put the `service_role` / secret
key or the Gemini key in this file or anywhere else in the repo.

**Email sign-in** ("Use email instead") also works, but Supabase's built-in mailer sends only a few emails per hour. Set `emailAuth: false`
in `config.js` to hide it, or add free SMTP (e.g. Resend or Brevo) under Supabase → Authentication → Emails.

## How sync works

- Each signed-in user has one `user_data` row holding their whole study data as JSON.
- Changes save automatically a few seconds after you make them, and again when the tab is hidden or comes back into view.
- A revision number detects edits made on another device. If both sides changed, the user chooses which copy to keep.
- On first sign-in, data from this device is uploaded. If the account already has data, the user picks which copy to keep.
- API keys are never uploaded. Signing out clears this device; the data stays in the account. Profile → *Privacy & data* deletes the cloud copy.

## Run locally

```bash
cd youriasbuddy
python3 -m http.server 5173
# open http://localhost:5173
```

Opening `index.html` directly (`file://`) won't work, because browsers block ES modules there. Port 5173 matters: it's on the allowed lists
for Supabase redirects and the Edge Function, so sign-in and free AI work locally against the same Supabase project.

## Changing the AI prompts or the Edge Function

`supabase/functions/ai/index.ts` is **generated**, so the site and the function share the same prompt and provider code.

1. Edit `assets/js/prompts.js`, `assets/js/providers.js` or `tools/edge_handler.js`.
2. Run `python3 tools/build_edge_function.py`.
3. Paste the new `index.ts` into the Supabase function editor and deploy (or run `supabase functions deploy ai` with the Supabase CLI).

Database changes go in `supabase/schema.sql` (keep it safe to re-run) and are applied in the Supabase SQL Editor.

## Project structure

```
index.html                    App shell
manifest.webmanifest          Installable app (PWA) manifest
_config.yml                   GitHub Pages/Jekyll: excludes non-site folders
assets/css/styles.css         Design system (light/dark)
assets/js/app.js              Router, nav, onboarding, timer chip, reminder loop, cloud boot
assets/js/store.js            Local-first state (localStorage) + derived metrics
assets/js/config.js           Public Supabase URL + anon key, feature switches
assets/js/cloud.js            Supabase sign-in + cloud sync
assets/js/ai.js               AI client (own key, else the "ai" Edge Function)
assets/js/prompts.js          UPSC prompt templates (shared with the Edge Function)
assets/js/providers.js        Gemini + OpenAI adapters, Auto model fallback (shared)
assets/js/data.js             Subjects, syllabus topics, curated library, sample questions
assets/js/timer.js            Pomodoro/stopwatch engine
assets/js/reminders-engine.js Reminder scheduling
assets/js/ui.js, md.js, …     Toasts, modals, charts, safe Markdown, utilities
assets/js/views/*.js          One file per page (dashboard, tracker, study, reminders,
                              syllabus, quiz, notes, resources, profile, settings)
supabase/schema.sql           Tables, row-level security, AI usage counter
supabase/functions/ai/        Edge Function (generated, single file)
tools/                        Edge Function handler source + build script
```

## Troubleshooting

| Symptom | Fix |
|---|---|
| "The free AI is not available right now" | The `ai` function isn't deployed, or it's named differently. Check Supabase → Edge Functions |
| AI returns 401 | "Verify JWT" is still on for the `ai` function. Turn it off |
| AI returns "Forbidden" | The site's address isn't in `ALLOWED_ORIGINS` |
| "The server AI key is invalid" | Re-copy `GEMINI_API_KEY` into Edge Function secrets |
| Google sign-in returns to the wrong page or errors | Check the Site URL / Redirect URLs in Supabase and the redirect URI in Google Cloud |
| Sign-in button missing on Profile | `supabaseUrl` / `supabaseAnonKey` are empty in `assets/js/config.js` |
| Sync says "paused" | Both devices changed. Press **Sync now** on Profile and choose which copy to keep |

## Notes

- The Prelims date defaults to **23 May 2027**. Change it on the Profile page once UPSC publishes the official 2027 calendar.
- Reminders fire while the site is open in a tab. Installing it as an app (browser menu → *Install*) and keeping it open works best.
- AI-generated questions and notes can occasionally contain errors. Cross-check anything surprising against standard sources.
