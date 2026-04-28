# Rick and Morty Memory code challenge

## Getting Started

### Installation

1. Install the dependencies:

```bash
pnpm install
```

2. Create .env file and set variables from .env.example

### Development

Start the development server:

```bash
pnpm run dev
```

Your application will be available at `http://localhost:5173`.

It's also recommended to run parallelly

```bash
pnpm run tsm
```

This is used to generate scss.d.ts modules to create types and improve
the developer experience

## Deployment

#### AWS Infrastructure

- **Amazon S3**:
  - Stores the static build artifacts
  - Configured as a private bucket

- **Amazon CloudFront**:
  - Content Delivery Network (CDN)
  - Handles HTTPS, caching, and global distribution
  - Configured with Origin Access Control (OAC) to securely access S3

#### CI/CD

- **GitHub Actions**:
  - Automates build and deployment
  - Uses OIDC to securely authenticate with AWS (no static credentials required)

#### 🔄 Deployment Flow

1. A push is made to the `main` branch
2. GitHub Actions triggers the pipeline:
   - Installs dependencies
   - Builds the Angular application
3. The workflow assumes an AWS role using OIDC
4. Build artifacts are uploaded to the S3 bucket
5. CloudFront cache is invalidated
6. The new version is distributed globally via CloudFront

---

## Deployment

## 📁 Folder structure

```
  app/ # Application-level configuration
    assets/ # Storaged assets (e.g. images and fonts)

    features/ # Domain-based modules (business logic)
      auth/
        components/ # Auth-specifig UI (e.g. LoginForm, RegisterForm)
        hooks/ # Custom hooks (e.g., useAuth)
        schemas/ # Zod schemas used for forms
        services/ # Authentication logic (Firebase integration)
        utils/ # Helper functions (e.g. Firebase auth error detections)

      game/
        components/     # Game-specific UI (e.g., MemoryCard, GameBoard)
        hooks/          # Game logic (e.g., useMemoryGame)
        mock-data/      # Simulated data used for testing
        services/       # functions to setup graphql and rick and morty API
        store/          # zustand setup
        types/          # Game-related types
        utils/          # Helper functions (e.g. shuffle functions, format time)

    guards/ # Global guards (e.g., requireSession)

    helpers/ # Shared helper functions
    helpers/ # Shared helper functions

    components/ # Reusable UI components (shared across features)

    styles/ # Global styling (Sass)
      \_variables.scss # Design tokens (colors, spacing, etc.)
      \_mixins.scss # Reusable style logic
      \_globals.scss # Base styles (reset, typography, body)

    types/ # Global TypeScript types (if needed)
    utils/ # Shared utilities
```

## 🎨 Styling

This app uses Sass and CSS modules to handle styles.
