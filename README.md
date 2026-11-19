# PatientLab

Patient-friendly information about laboratory tests: what a test is for, how to prepare, what happens to the sample and how results are reported.

Plain HTML, CSS and JavaScript. No frameworks and no dependencies. A small Node script generates the test pages.

## Project structure

```
index.html            Home
tests.html            Explore tests (search + category filters)
preparation.html      Test preparation guide
results.html          Understanding results
learn.html            Common questions
tests/<id>.html       One page per test (GENERATED, do not edit)

css/style.css         Design system: tokens, components, page styles
js/data/tests.js      Test content (the only place test information lives)
js/data/categories.js Test categories
js/search.js          Search logic (shared by the browser and the tests)
js/explorer.js        Search/filter behaviour on tests.html
js/site.js            Mobile menu, "expand all", print support

scripts/build.js      Validates content and generates pages
scripts/templates.js  Shared HTML: header, footer, cards, test page layout
scripts/test-search.js  Checks that common searches find the right test
```

## Commands

Requires Node 18 or later.

| Command | What it does |
|---|---|
| `npm run build` | Checks the content, rebuilds `tests/*.html` and the generated parts of the main pages |
| `npm test` | Runs the search checks |
| `npm run serve` | Serves the site at http://localhost:8000 |

The site also works if you open `index.html` straight from disk.

## Editing content

**Test information:** edit `js/data/tests.js`, then run `npm run build`. The structure of each test is documented at the top of that file. The build stops with a clear message if a required field is missing.

**Header, footer and test page layout:** edit `scripts/templates.js`, then run `npm run build`.

**Main pages:** edit the HTML directly, but not between `<!-- build:name -->` and `<!-- /build:name -->` markers. The build replaces anything inside them.

Always commit the regenerated files together with the content change.

## Clinical review workflow

Every test has a `review` field:

```js
review: { status: "draft", reviewedBy: "", date: "" }
```

- `draft`: the page shows a "Draft content, awaiting clinical review" notice, and the build lists it.
- `reviewed`: requires `reviewedBy` and `date` (YYYY-MM-DD). The page shows "Content reviewed by … on …".

Content rules (also listed in `tests.js`):

- No numeric reference intervals presented as universal values.
- Preparation is specific to each test. Never assume fasting.
- Never advise stopping prescribed medicine without the healthcare provider's advice.
- Never imply a diagnosis from a single result.

## Before going live

- Set `SITE.url` in `scripts/templates.js` to the live domain, then rebuild. This adds canonical links.
- Review all draft test content and mark it as `reviewed`.
