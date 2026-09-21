# OPSNORA Social

A production-oriented first version of a multi-workspace social media operations platform. The current build focuses on the core product experience—dashboard, post composer with live previews, calendar, content lists, media, analytics, connections, team and settings—and explicitly labels all sample data.

## Stack

- Next.js 15 App Router, React 19 and strict TypeScript
- Hand-built responsive design system (no template/UI framework)
- Zod and React Hook Form available for server-backed forms
- PostgreSQL reference schema, compatible with Supabase or a managed Postgres provider
- Provider-neutral OAuth and publishing service contracts

## Run locally

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Demo mode is enabled by default. Run `npm run typecheck` and `npm run build` before shipping.

## Structure

- `src/app/(app)` — authenticated product screens
- `src/components` — shared shell, status, table and modal components
- `src/lib/demo-data.ts` — centralized sample data
- `src/lib/social-services.ts` — Instagram/LinkedIn provider boundary
- `src/lib/scheduler.ts` — worker and durable job-store contract
- `database/schema.sql` — normalized multi-tenant reference schema

## Database and authorization

Apply `database/schema.sql` to PostgreSQL, then add row-level-security policies that require membership in the row's workspace. Every content, connection, media, analytics and audit record is workspace scoped. Server routes must derive the user from the authenticated session; never accept a workspace identity from the client without checking membership and role.

## Firebase authentication and storage

Authentication uses Firebase Email/Password Auth, including account creation, sign-in, sign-out, auth-state restoration and password-reset emails. Product routes are guarded and redirect unauthenticated visitors to `/login`. Media uploads use resumable Firebase Storage uploads when Firebase is configured; local object URLs are used only in explicitly selected demo mode.

1. Create a Firebase project and Web App.
2. In **Authentication → Sign-in method**, enable Email/Password.
3. Create the default Storage bucket (Firebase may require the Blaze plan for Storage).
4. Copy `.env.example` to `.env.local` and add the six `NEXT_PUBLIC_FIREBASE_*` values from **Project settings → Your apps**. The Firebase Web API key identifies the project; access is enforced by Auth and Security Rules—not by treating that key as a server secret.
5. Install the Firebase CLI, authenticate, select the project and deploy the included rules: `firebase deploy --only storage`.
6. Restart the development server after changing environment variables.

`storage.rules` denies access by default, allows only an authenticated owner to access their workspace upload path, limits uploads to 10 MB, and permits only JPEG, PNG and WebP content types. For production team sharing, extend the rule to verify workspace membership stored in Firestore or custom claims before allowing reads.

## OAuth connections

Set the Meta and LinkedIn variables in `.env.local`. A connect endpoint should create a cryptographically random, short-lived OAuth state tied to the session and workspace, then redirect to the official provider. The callback must validate state, exchange the code server-side, encrypt tokens at rest, select an eligible page/account and save it to `social_connections`. Tokens and secrets must never enter browser JavaScript or logs. Until credentials exist, the UI honestly reports configuration required instead of simulating success.

## Scheduling and publishing

Creating a scheduled post writes platform-specific content and one `publishing_jobs` row per platform in a single transaction. A managed cron invokes a server-side worker. The store claims rows atomically with `FOR UPDATE SKIP LOCKED`; each job carries a unique idempotency key. The worker records external references, applies exponential backoff to recoverable failures and never treats a browser session as a scheduler. A watchdog can release stale locks after a safe timeout.

## Deployment

Deploy the Next.js app to Vercel, Cloud Run or a similar platform; provision managed PostgreSQL, object storage, encryption/KMS and a scheduler/queue. Configure HTTPS callback URLs in both developer portals and set all server-only environment variables in the host secret store. Run schema migrations before deploying application code.

## Current limitations and roadmap

This repository supplies Firebase-backed authentication and media uploads once configured. Social OAuth and publishing still require Meta/LinkedIn developer credentials and deployed server endpoints. Local post metadata remains demo data until the database adapter is connected. Next steps: move posts/workspaces to Firestore or PostgreSQL, implement provider adapters and callbacks, deploy the worker, then add approvals, Drive import, bulk scheduling, live analytics and email notifications.
