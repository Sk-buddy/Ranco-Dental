# Ranco Dental Clinic

Single-page marketing site for Ranco Dental Clinic (Noida Sector 141), built with Next.js.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router) + React 19 + TypeScript
- [Tailwind CSS](https://tailwindcss.com) 4
- Self-hosted fonts via `next/font` (Figtree + Noto Sans)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

- `npm run dev` — start the local dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint

## Project structure

- `src/app` — routes, layout, global styles
- `src/components` — page sections (Header, Hero, Services, Testimonials, Footer, etc.)
- `src/lib/data.ts` — all site content (clinic info, services, doctors, testimonials, FAQ)
- `public/images` — site imagery

## Content

Clinic details, services, doctor profiles, testimonials, and FAQ copy all live in a single
typed file: `src/lib/data.ts`. Update content there rather than hunting through components.
