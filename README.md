# Rick and Morty Memory code challenge

## Getting Started

### Installation

Install the dependencies:

```bash
pnpm install
```

### Development

Start the development server with HMR:

```bash
pnpm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
pnpm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```



## 📁 Folder structure



src/
  app/                # Application-level configuration
    router/           # Routing configuration and route guards
    providers/        # Global providers (e.g., AuthProvider)

  features/           # Domain-based modules (business logic)
    auth/
      services/       # Authentication logic (Firebase integration)
      hooks/          # Custom hooks (e.g., useAuth)
      types.ts        # Auth-related types

    game/
      components/     # Game-specific UI (e.g., MemoryCard, GameBoard)
      hooks/          # Game logic (e.g., useMemoryGame)
      utils/          # Helper functions (e.g., shuffle logic)
      types.ts        # Game-related types

  pages/              # Route-level components (views)
    Login/
    Game/

  components/         # Reusable UI components (shared across features)
    Button/
    Input/
    Spinner/

  styles/             # Global styling (Sass)
    _variables.scss   # Design tokens (colors, spacing, etc.)
    _mixins.scss      # Reusable style logic
    _globals.scss     # Base styles (reset, typography, body)

  types/              # Global TypeScript types (if needed)
  utils/              # Shared utilities



## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)


The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## 🎨 Styling

This app uses Sass and CSS modules to handle styles. 

