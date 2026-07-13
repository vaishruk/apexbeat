# CardioLumen

A visual cardiology education platform for Internal Medicine residents preparing for Cardiology fellowship. Built as a polished, responsive, multi-page teaching site and digital-scholarship project.

**Tagline:** From Internal Medicine Residency to Cardiology Fellowship

## Running locally

It is a static site — no build step. Serve the folder over HTTP:

```bash
cd ~/cardiolumen
python3 -m http.server 4178
# open http://localhost:4178
```

(A `.claude/launch.json` is included so the preview tooling can start it as "cardiolumen".)

## Structure

```
index.html                     Homepage: hero, pathway, curriculum, featured,
                               cases, labs (ECG/echo/hemodynamics), guidelines,
                               board review, fellowship prep, research, about
modules/acute-chest-pain.html  Full demonstration module (depth toggle, ECG figure,
                               coronary-territory diagram, interactive case, quizzes)
pages/policies.html            Editorial, referencing, review, corrections,
                               contributors, disclaimer, privacy
css/main.css                   Design system (deep navy / teal, dark + light themes)
js/config.js                   Site name + tagline — change the name here
js/data.js                     All curriculum / case / guideline content (labeled sample)
js/render.js                   Builds the card grids from data
js/labs.js                     Procedural ECG rhythms, hemodynamic tracings, echo schematics
js/hero.js                     Three.js cardiovascular scene + synchronized ECG canvas
js/app.js                      Theme, nav, mobile menu, GSAP reveals, filters, tabs, quizzes
```

## Changing the site name

Edit `name` and `tagline` in `js/config.js`. Every page reads them via
`[data-site-name]` / `[data-site-tagline]` hooks, so the name updates everywhere.

## Design & tech

- **Libraries (CDN):** Three.js (hero 3D heart), GSAP + ScrollTrigger (scroll reveals, case stacking).
- **Palette:** deep navy, midnight blue, white, cool gray, teal; controlled red reserved for anatomy, ECG findings, and urgent information.
- **Accessibility:** keyboard focus states, skip link, reduced-motion support (3D scene falls back to a static illustration), light/dark themes. Add `?still` to any URL to freeze the 3D scene.
- **Performance:** the hero WebGL scene is frame-capped and pauses when scrolled out of view or the tab is hidden.

## Content integrity

All clinical content is **educational sample material** and is labeled as such in the
interface. No guideline recommendation, trial result, DOI, or PMID is fabricated —
placeholders are shown until verified content is added and faculty-reviewed. See
`pages/policies.html` for the editorial, referencing, and medical-review standards.
