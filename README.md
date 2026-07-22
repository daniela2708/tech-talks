# AI at Work | Wizeline

## Project info

A knowledge-sharing initiative for the whole Wizeline organization, focused on the right adoption of AI through cross-area learning, real use cases, and success stories.

## How can I edit this code?

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

Before submitting changes, run the complete validation suite:

```sh
npm run check
```

This runs TypeScript strict checks, ESLint, unit tests, and the production build.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Cloudflare Pages

The site is configured for Cloudflare Pages as the `wizeline-ai-talks` project.

```sh
# Verify the Cloudflare account currently connected to Wrangler
npx wrangler whoami

# Build and preview locally using the Pages runtime
npm run cf:preview

# Build and deploy to Cloudflare Pages
npm run cf:deploy
```

The production build output is `dist`. Images and downloadable resources are
stored in the `wizeline-ai-talks-assets` R2 bucket rather than in `public`. The
app uses its public `r2.dev` URL by default; set `VITE_ASSET_BASE_URL` to switch
to a custom domain without changing source code. Session recordings currently
remain external Google Drive/Google Videos links.
