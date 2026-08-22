# ClearCenters HQ — Setup Guide

Follow these in order. Every step is clicking buttons — no typed commands.

## 1. Get this code into your GitHub repo

1. Download and install **GitHub Desktop** (free): https://desktop.github.com
2. Open it and sign in with the same GitHub account you already created.
3. Click "Clone a repository from the internet," find `clearcenters`, and clone it
   to your computer.
4. Unzip the file I gave you (`clearcenters-app.zip`), and copy every file and
   folder from inside it into the folder GitHub Desktop just created on your
   computer (it'll be named `clearcenters`).
5. Go back to GitHub Desktop. It'll show a list of all the new files as
   changes. Type a short summary like "Initial app" in the box at the
   bottom left, then click the blue "Commit to main" button.
6. Click "Push origin" at the top. That's it — the code is now on GitHub.

## 2. Run the database setup

1. Go to your Supabase project dashboard.
2. Click "SQL Editor" in the left sidebar.
3. Click "New query."
4. Open `supabase_schema.sql` (included in this zip) on your computer, copy
   its entire contents, and paste them into the SQL editor.
5. Click "Run" (or press Cmd/Ctrl + Enter). You should see a success message.
   This creates all the real tables and loads in all 19 real cases.

## 3. Find your three Supabase keys

1. In Supabase, click "Project Settings" (gear icon) → "API."
2. You'll see:
   - **Project URL** → this is `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → this is `SUPABASE_SERVICE_ROLE_KEY`
     (click "Reveal" to see it — keep this one private, never share it publicly)

## 4. Add those keys to Vercel

1. Go to your Vercel dashboard → your project → "Settings" → "Environment Variables."
2. Add all three, using the exact names above on the left and the matching
   value from Supabase on the right.
3. Click "Save" for each one.

## 5. Deploy

1. Back on the Vercel dashboard, go to "Deployments" (or "Import Project" if
   this is the first time).
2. If prompted, select the `clearcenters` repository.
3. Vercel will auto-detect this is a Next.js project — leave all settings as
   default and click "Deploy."
4. After a minute or two, Vercel gives you a real URL like
   `clearcenters-hq.vercel.app`. That's your pilot's live address.

## 6. Create your first real teacher account

Since there's no sign-up page yet (that comes in a later pass), create your
first teacher account directly in Supabase:

1. In Supabase, click "Authentication" → "Users" → "Add user."
2. Enter your email and a password.
3. Click "SQL Editor" → "New query" and run this (replace the email):

```sql
insert into teachers (id, name, school)
select id, 'Your Name', 'Your School'
from auth.users where email = 'your-email@example.com';
```

You can now sign in at your live URL as a teacher. Student class codes and
rosters come in the next build pass, once the real Assign Case & Roster
screen is wired up to these tables.
