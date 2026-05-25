# HR Management System

A human resources management frontend built with **Next.js (App Router)**, **TypeScript**, **GraphQL**, **Apollo Client**, **Material UI**, **React Hook Form**, and **Zod**.

This repository contains the **web client only**. Data comes from an external **GraphQL API** (course / local backend). The UI covers authentication, employees, CVs, projects, and reference catalogs (departments, positions, skills, languages).

## Deploy: [link](https://final-project-9yxj.vercel.app/)
- admin credentials: email - testadmin@gmail.com password - 11111111
- employee credentials: email - test@gmail.com password - 11111111

## Tech stack

| Layer              | Choice                                                    |
| ------------------ | --------------------------------------------------------- |
| Framework          | Next.js 16 (App Router)                                   |
| Language           | TypeScript                                                |
| API                | GraphQL via Apollo Client 4                               |
| UI                 | Material UI 9, Emotion                                    |
| Forms & validation | React Hook Form, Zod                                      |
| Client state       | React hooks + Apollo cache + `localStorage` (auth tokens) |
| Tests              | Jest, React Testing Library                               |

> **Note:** Global UI state is **not** managed with Redux. Server data lives in Apollo; page logic is in feature hooks (`useUsersPage`, `useCvsPage`, etc.).

## Prerequisites

- **Node.js** 20+ (CI uses 22)
- **pnpm** 10+
- A running **GraphQL backend** compatible with this app (see your course materials or team docs for how to start it)

## Environment variables

Copy the example file and set the API URL:

```bash
cp .env.example .env.local
```

| Variable                  | Required | Description                                                                     |
| ------------------------- | -------- | ------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_GRAPHQL_URL` | **Yes**  | Full HTTP(S) URL of the GraphQL endpoint (e.g. `http://localhost:3001/graphql`) |

The app reads this variable in:

- `src/lib/apollo/client.ts` — Apollo HTTP link
- `src/features/auth/lib/try-refresh-session.ts` — refresh token mutation

Without it, queries and login will fail at runtime.

## Getting started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local` so `NEXT_PUBLIC_GRAPHQL_URL` matches your GraphQL server (host, port, and path).

### 3. Start the GraphQL backend

Start the **HRM GraphQL server** from your course repository or internal docs. The frontend does not start the API.

Verify the endpoint (browser, curl, or GraphQL Playground), for example:

```bash
curl -X POST "%NEXT_PUBLIC_GRAPHQL_URL%" ^
  -H "Content-Type: application/json" ^
  -d "{\"query\":\"{ __typename }\"}"
```

On macOS/Linux, replace `%NEXT_PUBLIC_GRAPHQL_URL%` with the value from `.env.local`.

### 4. Run the Next.js app

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Unauthenticated users are redirected to `/login`.

### 5. Production build (optional)

```bash
pnpm build
pnpm start
```

## End-to-End Tests

Playwright covers the primary user journey: login → users list → CV skills → add skill → logout.

1. Copy `.env.example` to `.env.local` and set `E2E_USER_EMAIL`, `E2E_USER_PASSWORD`, and `NEXT_PUBLIC_GRAPHQL_URL`.
2. Install browsers once:

```bash
pnpm exec playwright install chromium
```

3. Run E2E tests (starts `pnpm dev` automatically unless a server is already running):

```bash
pnpm test:e2e
```

Optional:

```bash
pnpm test:e2e:ui
pnpm test:e2e:headed
```

| Problem                      | What to check                                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| GraphQL 400 / network errors | Backend running; `NEXT_PUBLIC_GRAPHQL_URL` correct; schema matches queries in `src/features/**/graphql` |
| Blank data after login       | Token and role from login response; browser Network tab                                                 |
| Build OK but runtime errors  | `.env.local` present (env vars are not committed)                                                       |

## License

Private / course project — see repository owner for terms.
