# Project Structure

This document describes the repository layout and purpose of key folders/files.

Root

- AGENTS.md — agent configuration notes
- CLAUDE.md
- eslint.config.mjs — ESLint config
- next-env.d.ts
- next.config.ts — Next.js config
- package.json — project metadata & scripts
- postcss.config.mjs
- README.md — project README (linked below)
- tsconfig.json
- project-structure.md — this file

app/
- globals.css
- layout.tsx
- page.tsx

prisma/
- schema.prisma — database schema for Prisma

public/
- (static assets)

src/
- actions/
  - projectActions.ts
- app/
  - global.css
  - layout.tsx
  - page.tsx
  - api/
    - chat/
      - route.ts
  - secret-admin-url/
    - page.tsx
- components/
  - AiAgent.tsx
  - ProfileHeader.tsx
  - ProjectCard.tsx
  - ProjectGrid.tsx
- lib/
  - prisma.ts

Notes

- This is a Next.js app using the App Router (`app/` directory).
- `src/app` contains the app's pages and API route.
- `prisma/` holds the database schema; run Prisma commands from the repo root.

If you'd like, I can also:
- Add a rendered Next.js route that displays this structure in-browser.
- Expand this file with per-file descriptions or links to important lines.
