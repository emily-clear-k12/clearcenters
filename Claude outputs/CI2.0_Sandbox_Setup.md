# CI2.0 Sandbox — Setup Guide

This sets up a private copy of ClearCenters where we can build CI2.0 without touching the live site.

**What you'll end up with:**

- **The live site:** unchanged, still running from `main` with the real database.
- **The sandbox site:** its own private web address, running from a branch called `ci2-sandbox`, with its own database of made-up data.
- **A yellow bar at the top of every sandbox page:** **A · Current site | B · CI2.0**. The bar only ever appears in the sandbox.

Everything below is clicking, no typed commands. If a screen looks different from what's described, take a screenshot and send it to Claude.

---

## Part 1 — Make the sandbox branch (GitHub Desktop)

1. Open **GitHub Desktop**. At the top left, make sure **Current Repository** says `clearcenters`.
2. Click **Current Branch** (top middle), then **New Branch**.
3. Name it `ci2-sandbox`. If it asks what to base it on, choose **main**. Click **Create Branch**.
4. Click **Publish branch** (top right).
5. Check that **Current Branch** now says `ci2-sandbox`.
6. **Tell Claude "the branch is ready."** Claude will then put the sandbox files into your clearcenters folder.

---

## Part 2 — Make the sandbox database (Supabase)

The sandbox needs its own database so nothing you try there can change real data. There are two ways to do it.

**Option A (recommended): let Claude do it.**

1. In Claude, open **Settings → Connectors**, find **Supabase**, and connect it.
2. Tell Claude it's connected.
3. Claude creates a free project called `clearcenters-sandbox`. It copies the live database's *structure* and the content tables (cases, planets, badges, word lists). It copies **no** teachers, students or student work.

**Option B: do it yourself.**

1. Go to supabase.com and click **New project**.
2. Name it `clearcenters-sandbox` and choose the **Free** plan. Pick the same region as your live project.
3. Click **Generate a password** and save it somewhere safe. Then click **Create new project**.
4. Tell Claude it's created. Claude will send you one SQL file to paste into the **SQL Editor** and **Run**, the same way you did in SETUP.md.

**Either way, turn off email confirmation, in the sandbox only:**

1. In the **sandbox** project, go to **Authentication**, then **Sign In / Providers**, then **Email**.
2. Turn off **Confirm email** and click **Save**.

This lets you make pretend teacher accounts without real inboxes. Never change this setting in the live project.

---

## Part 3 — Copy the sandbox keys

1. In the **sandbox** project, open **Project Settings**, then **API Keys** (it may be called **API**).
2. Copy these three values into a note:
   - **Project URL**
   - **anon / public** key
   - **service_role** key (secret; keep it private)

---

## Part 4 — Point the sandbox site at the sandbox database (Vercel)

1. Open your ClearCenters project on vercel.com, then go to **Settings**, then **Environment Variables**.

**a) Keep the live database for the live site only.**
For each of these three variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

click the **⋯** menu, then **Edit**. Under **Environments**, leave **only Production** checked, then click **Save**. The live site keeps working exactly as before.

**b) Add the sandbox database for the sandbox site.**
Click **Add Environment Variable** and add the same three names with the **sandbox** values from Part 3:

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | sandbox Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | sandbox anon / public key |
| `SUPABASE_SERVICE_ROLE_KEY` | sandbox service_role key |

For each one, set **Environment** to **Preview only**. If it offers a branch box, type `ci2-sandbox`.

**c) Turn on the sandbox bar.**
Add one more variable, also **Preview only** (branch `ci2-sandbox` if offered):

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_SANDBOX` | `true` |

**d) Let SAM work in the sandbox.**
Find `ANTHROPIC_API_KEY`, click **Edit**, and make sure **Preview** is checked along with Production. Click **Save**.

---

## Part 5 — Send the sandbox files up (GitHub Desktop)

Do this after Claude says the files are in your folder.

1. In GitHub Desktop, **check that Current Branch says `ci2-sandbox`.** This matters.
2. You'll see the new files listed on the left.
3. In the **Summary** box at the bottom left, type `Add CI2.0 sandbox bar`.
4. Click **Commit to ci2-sandbox**, then **Push origin**.

---

## Part 6 — Open the sandbox

1. In Vercel, click **Deployments**. Find the newest one labeled `ci2-sandbox` and wait until it says **Ready** (a minute or two).
2. Click it, then click **Visit**. Bookmark this address; it's your sandbox.
3. If Vercel asks you to log in first, that's expected. It keeps the sandbox private.
4. You should see the yellow **SANDBOX** bar at the top. Click **B · CI2.0** to see the new CI2.0 home.

---

## Part 7 — Add made-up data

1. In the sandbox, click **I'm a Teacher** and sign up with a pretend name and email (for example, `demo.teacher@example.com`).
2. Create a class and add a few pretend students.
3. Log in as one of those students to see the student side.

---

## Golden rules

- **Yellow bar = sandbox = safe to play.** No yellow bar means you're on the live site.
- **Before every commit, check that GitHub Desktop says `ci2-sandbox`.**
- **Never click "Merge into main"** unless you've decided, with Claude, that something is ready for the live site.
- The CI2.0 pages (everything under `/v2`) and the yellow bar are built to stay hidden on the live site, even if the code ever reaches `main`.
