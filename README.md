# Akash H S: Portfolio

React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion (Motion for React) + Lucide.
Fonts (Instrument Serif, Geist, Geist Mono) are bundled through npm, so the site makes no third-party requests.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
```

## Production build
```bash
npm run build      # type-checks, then outputs ./dist
npm run preview    # serves the production build locally
```

## Deploy
The output in `dist/` is a static site, so any static host works.
- **Vercel / Netlify / Cloudflare Pages:** import the repo, build command `npm run build`, output directory `dist`.
- **GitHub Pages:** set `base: '/<repo-name>/'` in `vite.config.ts`, build, and publish `dist/`.

## Where to edit content
All copy lives in `src/data/content.ts` (experience, projects, skills, education, links).
Replace `public/Akash_H_S_Resume.pdf` to update the downloadable resume, and `public/akash.jpg` / `public/akash.webp` for the portrait.

## Adding project links
Repository or demo URLs are intentionally not set, because none were in the resume. To add one, extend the `projects`
entries in `content.ts` and render an anchor in `src/components/Projects.tsx`.

## Accessibility and performance notes
- `prefers-reduced-motion` disables parallax, tilt, magnetic effects, the custom cursor and looping animations.
- The custom cursor is an overlay ring only on fine-pointer devices; the native cursor is never hidden.
- Skip link, semantic landmarks, visible focus rings, `aria-current` on navigation, keyboard-closable mobile menu (Escape).
- No runtime image or script dependencies beyond the bundled JS (~108 kB gzip total).
