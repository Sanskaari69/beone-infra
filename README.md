# Be-One Infra website

Next.js (App Router) + TypeScript + Tailwind + shadcn/ui, exported as a static site.
Dark mode is the default. Light mode works.

## Changing content

All copy and figures live in **one file: `src/data/beone.ts`**. Components only read from it.

| Helper | Meaning | On the page |
| --- | --- | --- |
| `ver(value, source)` | Confirmed fact | Shown normally |
| `draft(value, note)` | Our wording, awaiting approval | Dotted underline |
| `ph(note)` | Not supplied yet | "Placeholder — to be supplied" |

To fill something in, replace its `ph()` with `ver(value, "where it came from")`. Never invent
names, figures, certifications or quotes: leave `ph()` until they are supplied.

Related files:

- `src/data/image-sources.json` maps a project id to its old-site image file. Run
  `node scripts/fetch-images.mjs` to download and resize images into `public/projects/`.
- `src/data/schema.ts` holds the types. `src/data/derive.ts` computes the capability matrix and the
  dossier filter from the project list.
- Design tokens (colours, radius, fonts) are CSS variables at the top of `src/app/globals.css`.

## Commands

```bash
npm install
npm run dev                       # local development
npm test                          # unit tests (formatting, matrix logic, content integrity)
npm run lint && npm run typecheck
node scripts/check-contrast.mjs   # WCAG AA check on every colour pair, both modes
npm run build                     # static export to ./out
```

## Deploying to GitHub Pages

The site is published from the `gh-pages` branch.

```bash
bash scripts/deploy-pages.sh    # builds with the repo's base path and pushes the gh-pages branch
```

One-time: in the repo, Settings > Pages > Source "Deploy from a branch", branch `gh-pages`, folder `/ (root)`.

`.github/workflows/deploy.yml` is an optional alternative that builds and publishes on every push
to `main`. Pushing a workflow file needs the `workflow` permission on your GitHub login; if you use
it, set Pages > Source to "GitHub Actions" instead.

The RFP form opens the visitor's mail client with a pre-filled message to the sales address.
Nothing is sent to a third party.
