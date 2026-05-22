# HR Management System

A modern HRM application built with Next.js, TypeScript, GraphQL, Apollo Client, Redux Toolkit, React Hook Form, Zod, Material UI, and Jest.

## Tech Stack

- Next.js
- TypeScript
- GraphQL
- Apollo Client
- Redux Toolkit
- React Hook Form
- Zod
- Material UI
- Jest
- React Testing Library

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm typecheck
pnpm format
pnpm format:check
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

## Project Status

Initial project setup is complete. Core features and pages are under development.

## Notes

Environment variables and additional setup instructions can be added here later.
