# BCL Dashboard

A single-page fantasy cricket league dashboard for "BCL" — a friend group's multi-season fantasy cricket competition. It tracks six teams (Harshit Harmobiles, Anagh Savants, Aarnav Aces, Gauransh Blazers, Taran Tranquils, Vivaan Victors) across multiple seasons, with points tables, match results and scorecards, fixtures, squads, stats, head-to-head comparisons, playoffs, and awards.

The entire site is a single static `index.html` file with all data and logic inline — no build step, no backend. It is deployed as a static site via GitHub Pages.

## Key features

- **Table** — points table with wins/losses/no-results/NRR, filterable by season
- **Results** — match-by-match results with detailed scorecards (batting/bowling figures, fall of wickets)
- **Schedule** — full fixture list by round/leg
- **Squads** — team rosters with player roles (BAT, BOWL, ALL, WK, C, SUB, etc.)
- **Stats** — aggregate player/team statistics with category filters
- **Compare** — head-to-head team/player comparison
- **Stories** — narrative team season recaps
- **Playoffs** and **Awards** — playoff bracket and season award pages
- Password-protected admin mode for editing data in the browser (client-side only, `localStorage`-backed)

## Tech stack

- Plain HTML/CSS/JavaScript, no framework and no bundler
- All data (teams, squads, schedule, match results, scorecards) is embedded as JS literals inside the page's `<script>` block
- `localStorage` used for persisting admin edits in the browser
- Node.js one-off scripts (in `scratch/`, using `jsdom` and `puppeteer`) used offline to generate/inject match data into `index.html`
- Deployed via GitHub Pages

## Project structure

```
index.html          Entire site: markup, styles, and embedded data/JS (single file)
extracted.js         Standalone copy of the embedded data/JS, used as a working copy when editing data offline
logos/                Team logo images (aa.jpg, gb.jpg, hh.jpg, tt.jpg, uu.png, vv.jpg)
scratch/              One-off Node.js scripts for building/injecting match data and scorecards into index.html (not part of the deployed site)
.github/workflows/    GitHub Actions workflow for deploying to GitHub Pages (currently disabled — see below)
.nojekyll             Disables Jekyll processing on GitHub Pages
```

## Setup / installation

No build step is required to view the site itself — it's a static HTML file.

To work with the `scratch/` helper scripts (which regenerate/inject data into `index.html`):

```bash
cd scratch
npm install
```

## Usage / running locally

Open `index.html` directly in a browser, or serve it locally, e.g.:

```bash
npx serve .
# or
python3 -m http.server
```

Then visit the printed local URL.

### Deployment

The site is deployed to GitHub Pages. The repository includes a GitHub Actions workflow (`.github/workflows/static.yml`) for building and deploying to Pages, but it is currently disabled (`on: workflow_dispatch` only, per a comment in the file) in favor of GitHub's branch-based Pages deployment (Settings > Pages > Deploy from a branch), which serves `index.html`, `logos/`, and `.nojekyll` directly from the repo.

### Data updates

Match results and scorecards are added by editing the `SEED` data object embedded in `index.html` (or `extracted.js`) directly, or via the helper scripts in `scratch/` (e.g. `add_matchN.js`) which programmatically read, modify, and write back the embedded data.
