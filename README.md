# HR Management System

A human resources management frontend built with **Next.js (App Router)**, **TypeScript**, **GraphQL**, **Apollo Client**, **Material UI**, **React Hook Form**, and **Zod**.

This repository contains the **web client only**. Data comes from an external **GraphQL API** (course / local backend). The UI covers authentication, employees, CVs, projects, and reference catalogs (departments, positions, skills, languages).

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

## Available scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `pnpm dev`          | Start development server (port 3000) |
| `pnpm build`        | Production build                     |
| `pnpm start`        | Run production server after `build`  |
| `pnpm lint`         | ESLint                               |
| `pnpm typecheck`    | Next typegen + `tsc --noEmit`        |
| `pnpm test`         | Run unit tests (Jest)                |
| `pnpm test:watch`   | Jest in watch mode                   |
| `pnpm format`       | Prettier write                       |
| `pnpm format:check` | Prettier check                       |

Git hooks (Husky) run `format:check`, `lint`, `typecheck`, and `build` on push.

## Testing

Unit tests use **Jest** and **React Testing Library**:

```bash
pnpm test
```

Coverage report (optional):

```bash
pnpm test -- --coverage
```

Tests live next to source files (`*.test.ts`, `*.test.tsx`) under `src/`. There are **no E2E tests** in this repo yet.

## Project structure

```
src/
  app/              # Next.js routes (thin pages)
  components/       # Shared UI (search, dialogs, loaders)
  features/         # Domain modules (auth, users, cvs, projects, …)
  lib/              # Apollo client, hooks, utilities
  shared/           # Cross-feature styles and catalog UI
  theme/            # MUI theme
```

Each feature typically includes `api/` or `graphql/`, hooks, components, pages, and schemas.

## Main routes

| Route                                                              | Description      |
| ------------------------------------------------------------------ | ---------------- |
| `/login`, `/registration`, `/forgot-password`, `/reset-password`   | Auth             |
| `/users`                                                           | Employees list   |
| `/users/[id]/profile`, `…/skills`, `…/languages`                   | User profile     |
| `/cvs`, `/cvs/[id]/details`, `…/skills`, `…/projects`, `…/preview` | CVs              |
| `/projects`                                                        | Projects catalog |
| `/departments`, `/positions`, `/skills`, `/languages`              | Admin catalogs   |

## Authentication

- JWT **access** and **refresh** tokens are stored in `localStorage`.
- Apollo sends `Authorization: Bearer <access_token>` on requests.
- On auth errors, the client attempts `updateToken` refresh; if that fails, tokens are cleared and the user must sign in again.

## Troubleshooting

| Problem                      | What to check                                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| GraphQL 400 / network errors | Backend running; `NEXT_PUBLIC_GRAPHQL_URL` correct; schema matches queries in `src/features/**/graphql` |
| Blank data after login       | Token and role from login response; browser Network tab                                                 |
| Build OK but runtime errors  | `.env.local` present (env vars are not committed)                                                       |

## License

Private / course project — see repository owner for terms.
