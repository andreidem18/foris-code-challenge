# Rick and Morty Memory (Code Challenge)

A small memory game using the Rick and Morty API, with Firebase auth and a leaderboard.

**Tech stack**

- Runtime & tooling: Node.js, pnpm, Vite
- App framework: React 19 + React Router 7
- Language: TypeScript
- Data fetching: GraphQL (via `graphql-request`) + TanStack React Query
- Auth & persistence: Firebase Auth + Firestore
- State: Zustand
- Forms & validation: React Hook Form + Zod
- UI: Sass (CSS Modules), Radix Icons, Sonner (toasts), Motion
- Testing: Vitest + Testing Library

---

## **Technical decisions & reasoning**

- React Router 7: file-based routing and a clean separation between routes and feature modules.

- TanStack React Query: consistent server-state management (loading/error states, caching, refetching) for both GraphQL and Firestore reads.

- GraphQL (`graphql-request`) for Rick & Morty: avoids overfetching and reduces unnecessary payload size when requesting multiple entities.

- Firebase Auth + Firestore: fast to integrate for a code challenge while still representing a realistic auth + persistence stack.

- Zustand for game state: minimal boilerplate, easy to model game transitions (cards, turns, elapsed time) and share state across hooks/components.  
  Additionally, the `persist` middleware is used to keep the game session even if the user leaves the app.

- Radix UI: used for components like popover and avatar to ensure good accessibility out of the box without building primitives from scratch.

- Motion: used to handle cards shuffle animations and improving user experience.

- React Hook Form + Zod: schema-first validation with good UX and predictable error handling.

- Sass + CSS Modules: local scoping by default, keeping styles close to components without introducing a full UI framework.

- Vitest + Testing Library: fast feedback loop and tests focused on observable behavior.

---

## **Tradeoffs**

- Authentication is validated asynchronously.  
  This allows the app to load faster without blocking the UI, but introduces a brief moment where an unauthenticated user could see a protected route before being redirected.

---

## **Development approach**

- Feature-first structure under `app/features/*` to keep domain logic (hooks/services/schemas) discoverable.

- Keep state responsibilities explicit:
  - “Server state” via React Query.
  - “Client/game state” via Zustand.

- Prefer small, testable hooks and utilities (e.g. board setup, matching resolution, timers).

- Validate and handle errors at the edges (forms/services), map backend errors into user-friendly messages.

- Automate DX tasks (CSS module typings via `pnpm tsm`) and keep scripts standardized with `pnpm`.

---

## **Opportunities for improvement**

- Add caching for profile images to prevent occasional `429` responses.

- Implement lazy loading / infinite scroll in the leaderboard table (not included due to time constraints).

- Introduce a multiplayer mode using WebSockets for real-time gameplay.

- Add a confirmation dialog when the user attempts to exit an active game, to prevent accidental progress loss.


---

**Requirements**

- Node.js (LTS recommended)
- pnpm

**Getting started**

1. Install dependencies:

```bash
pnpm install
```

1. Create a `.env` file based on `.env.example`:

```bash
copy .env.example .env
```

1. Fill in the environment variables:

- `VITE_FIREBASE_API_KEY`: Firebase web API key
- `VITE_FIREBASE_AUTH_DOMAIN`: Firebase auth domain
- `VITE_FIREBASE_PROJECT_ID`: Firebase project id
- `VITE_FIREBASE_APP_ID`: Firebase app id
- `VITE_RICK_MORTY_GRAPHQL_URL`: Rick & Morty GraphQL endpoint

**Development**

Run the dev server:

```bash
pnpm run dev
```

App runs at `http://localhost:5173`.

Optional (recommended while developing): generate `.scss.d.ts` types for CSS modules:

```bash
pnpm tsm
```

**Tests**

```bash
pnpm test
```

Other useful commands:

```bash
pnpm test:run
pnpm test:coverage
pnpm typecheck
pnpm lint
pnpm format
```

**Build & run**

```bash
pnpm build
pnpm start
```

**Project structure**

```
app/
  assets/            # Images, fonts, etc.
  config/            # Runtime env parsing (Zod)
  features/          # Domain modules
    auth/
      components/
      hooks/
      schemas/
      services/
      utils/
    game/
      components/
      hooks/
      mock-data/
      services/
      store/
      types/
      utils/
    scores/
      mutations/
      queries/
      types/
  guards/            # Route guards
  helpers/           # Shared helpers
  lib/               # Shared integrations (e.g. Firebase client)
  ui/                # Reusable UI components
  styles/            # Global Sass
test/
  setup.ts           # Vitest setup
```

**Deployment (AWS)**

- Infrastructure: S3 (static artifacts) + CloudFront (CDN/HTTPS/cache), using Origin Access Control (OAC)
- CI/CD: GitHub Actions
- Auth to AWS: OIDC (no long-lived AWS keys)
- Typical flow: push to `main` -> install -> build -> upload to S3 -> invalidate CloudFront
