# React with Hono Monorepo Example

A minimal application demonstrating a fullstack monorepo setup with React frontend and Hono backend. Built for testing purposes to showcase a simple typescript stack with database integration with drizzle, and clean architecture practices.

[![Hono](https://img.shields.io/badge/Hono-4.7_-E36002?logo=hono&logoColor=white)](https://hono.dev)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-0.41-C5F446?logo=drizzle&logoColor=white)](https://orm.drizzle.team)
[![libSQL](https://img.shields.io/badge/libSQL-0.17-00A4EF?logo=sqlite&logoColor=white)](https://libsql.org)
[![Vite](https://img.shields.io/badge/Vite-8+-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4+-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![React Query](https://img.shields.io/badge/React_Query-5.67-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![React Router](https://img.shields.io/badge/React_Router-7.3-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com)
[![Zod](https://img.shields.io/badge/Zod-3.24-3E67B1?logo=zod&logoColor=white)](https://zod.dev)
[![oxfmt](https://img.shields.io/badge/oxfmt-0.46-F97316?logo=oxc&logoColor=white)](https://oxc.rs)
[![oxlint](https://img.shields.io/badge/oxlint-1.61-F97316?logo=oxc&logoColor=white)](https://oxc.rs)

## @app/api

The backend is built with `hono.js`, a lightweight and fast web framework for Edge and `Node.js`. It uses `drizzle` for type-safe database queries with `libSQL` as the database engine, supporting both local embedded `sqlite` and remote turso instances. Request validation is handled by `zod` integrated via `@hono/zod-validator`. The `@app/shared` package provides shared zod schemas for consistent validation between frontend and backend.

## @app/web

The frontend is a `react` application powered by vite 8 for fast development and builds. It uses `react-router` for navigation, `tailwind`, and `tanstack-query` for efficient request cache management. Form handling is done with `react-hook-form` and `zod-resolvers` from `@app/shared`, ensuring type-safe forms that match the backend validation rules.

## Setup

1. Install dependencies for all workspace packages

```bash
pnpm install
```

2. Start the API server

```bash
pnpm dev:api
```

The API server runs at `http://localhost:3000`.

3. Start the Web Frontend

```bash
pnpm dev:web
```

The frontend runs at `http://localhost:5173` and proxies API requests to the backend.

### API Scripts

| Command            | Description                                          |
| ------------------ | ---------------------------------------------------- |
| `pnpm dev`         | Start API in watch mode with `tsx`                   |
| `pnpm db:generate` | Generate migration files from schema                 |
| `pnpm db:migrate`  | Apply pending migrations to the database             |
| `pnpm db:seed`     | Seed the database with initial test data             |
| `pnpm db:studio`   | Launch Drizzle Studio for visual database inspection |

### API Endpoints

All endpoints are prefixed with `/api`.

| Method | Path                | Description          | Query Params                      |
| ------ | ------------------- | -------------------- | --------------------------------- |
| GET    | `/api/persons`      | List persons         | `?nik=`, `?nama=` (partial match) |
| GET    | `/api/persons/:nik` | Get person by NIK    |                                   |
| POST   | `/api/persons`      | Create new person    |                                   |
| PUT    | `/api/persons/:nik` | Update person by NIK |                                   |
| DELETE | `/api/persons/:nik` | Delete person by NIK |                                   |

### Database Configuration

The backend uses libSQL via `@libsql/client`. Configure your database via environment variables:

```env
DATABASE_URL=file:./data.db
```

or for remote libSQL instance like Turso:

```env
DATABASE_URL=libsql://your-db.turso.io?authToken=your_token
```

Tip: Use `pnpm db:studio` to visually inspect and manage your database during development.

## Testing & Seeding

To populate the database with sample

```bash
pnpm --filter @app/api db:seed
```

## Monorepo Commands

| Command             | Description                           |
| ------------------- | ------------------------------------- |
| `pnpm dev`          | Start API and Web servers in parallel |
| `pnpm dev:api`      | Start backend API server              |
| `pnpm dev:web`      | Start frontend development server     |
| `pnpm lint`         | Lint all packages using oxlint        |
| `pnpm lint:fix`     | Fix lint errors using oxlint          |
| `pnpm format`       | Format all packages using oxfmt       |
| `pnpm format:check` | Check formatting using oxfmt          |

## Linting & Formatting

This project uses [oxc](https://oxc.rs) tooling for fast, unified linting and formatting:

- `oxlint` is a high-performance JavaScript/TypeScript linter written in Rust. Provides ESLint-compatible rules with significantly faster execution.
- `oxfmt` is an opinionated code formatter powered by oxc, designed for consistent styling across the monorepo.

### Configuration

- `oxlint.json` linting rules for TypeScript, React, and Node.js best practices
- `oxfmt.json` formatting preferences
