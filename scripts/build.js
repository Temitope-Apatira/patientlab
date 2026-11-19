/* ------------------------------------------------------------
   PatientLab build script.  Run with:  npm run build

   1. Checks every test in js/data/tests.js has the full structure.
   2. Writes one static HTML page per test into tests/<id>.html.
   3. Fills the generated regions of the main pages, marked like:
          <!-- build:name -->  ...generated...  <!-- /build:name -->
      Everything outside those markers is edited by hand.

   No dependencies: uses only Node's built-in modules.
   ------------------------------------------------------------ */
const fs = require("node:fs");
const path = require("node:path");
const T = require("./templates.js");

const ROOT = path.join(__dirname, "..");
const TESTS_DIR = path.join(ROOT, "tests");

const categories = require("../js/data/categories.js");
const tests = require("../js/data/tests.js");

/* ---------- 1. validate content ---------- */

function validate() {
    const errors = [];
    const ids = new Set();
    const categoryIds = new Set(categories.map((c) => c.id));

    const needText = (t, value, field) => {
        if (typeof value !== "string" || !value.trim()) errors.push(`${t.id}: "${field}" must be non-empty text`);
    };
    const needList = (t, value, field, allowEmpty) => {
        if (!Array.isArray(value) || (!allowEmpty && value.length === 0)) {
            errors.push(`${t.id}: "${field}" must be a ${allowEmpty ? "" : "non-empty "}list`);
        }
    };

    tests.forEach((t, i) => {
        if (!t.id || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(t.id)) errors.push(`test #${i + 1}: id must be lowercase-with-hyphens`);
        if (ids.has(t.id)) errors.push(`${t.id}: duplicate id`);
        ids.add(t.id);

        if (!categoryIds.has(t.category)) errors.push(`${t.id}: unknown category "${t.category}"`);
        needText(t, t.name, "name");
        needText(t, t.summary, "summary");
        if (typeof t.abbreviation !== "string") errors.push(`${t.id}: "abbreviation" must be text (use "" for none)`);
        needList(t, t.aliases, "aliases", true);
        needList(t, t.keywords, "keywords", true);
        needList(t, t.why, "why");
        needList(t, t.measures, "measures");
        needList(t, t.collection, "collection");
        needList(t, t.process, "process");
        needList(t, t.abnormal, "abnormal");
        needList(t, t.keyPoints, "keyPoints");

        const p = t.preparation || {};
        needText(t, p.summary, "preparation.summary");
        if (!p.fasting || !T.FASTING_LABELS[p.fasting.status]) {
            errors.push(`${t.id}: preparation.fasting.status must be one of ${Object.keys(T.FASTING_LABELS).join(", ")}`);
        } else {
            needText(t, p.fasting.text, "preparation.fasting.text");
        }
        needText(t, p.water, "preparation.water");
        needText(t, p.timing, "preparation.timing");
        needText(t, p.medication, "preparation.medication");
        needList(t, p.other, "preparation.other", true);

        const s = t.sample || {};
        needText(t, s.type, "sample.type");
        needText(t, s.detail, "sample.detail");
        needText(t, s.container, "sample.container");

        const r = t.reporting || {};
        needList(t, r.text, "reporting.text");
        needList(t, r.units, "reporting.units", true);

        const rv = t.review || {};
        if (rv.status !== "draft" && rv.status !== "reviewed") errors.push(`${t.id}: review.status must be "draft" or "reviewed"`);
        if (rv.status === "reviewed" && (!rv.reviewedBy || !/^\d{4}-\d{2}-\d{2}$/.test(rv.date || ""))) {
            errors.push(`${t.id}: reviewed content needs review.reviewedBy and review.date (YYYY-MM-DD)`);
        }
    });

    if (errors.length) {
        console.error("Content problems found:\n  " + errors.join("\n  "));
        process.exit(1);
    }
}

/* ---------- 2. inject generated regions into hand-written pages ---------- */

function inject(html, name, content, file) {
    const pattern = new RegExp(`([ \\t]*)<!-- build:${name} -->[\\s\\S]*?<!-- /build:${name} -->`);
    const match = html.match(pattern);
    if (!match) throw new Error(`${file}: missing <!-- build:${name} --> ... <!-- /build:${name} --> markers`);
    const indent = match[1];
    const body = content.split("\n").map((line) => (line ? indent + line : line)).join("\n");
    return html.replace(pattern, () => `${indent}<!-- build:${name} -->\n${body}\n${indent}<!-- /build:${name} -->`);
}

function buildPage(file, navKey, regions) {
    const fullPath = path.join(ROOT, file);
    let html = fs.readFileSync(fullPath, "utf8");
    html = inject(html, "header", T.header(navKey, ""), file);
    html = inject(html, "footer", T.footer(""), file);
    Object.entries(regions || {}).forEach(([name, content]) => {
        html = inject(html, name, content, file);
    });
    fs.writeFileSync(fullPath, html);
}

/* ---------- 3. run ---------- */

validate();

const categoriesById = Object.fromEntries(categories.map((c) => [c.id, c]));
const usedCategories = categories
    .map((category) => ({ category, count: tests.filter((t) => t.category === category.id).length }))
    .filter((c) => c.count > 0);

// Individual test pages (remove pages for tests that no longer exist)
fs.mkdirSync(TESTS_DIR, { recursive: true });
fs.readdirSync(TESTS_DIR)
    .filter((f) => f.endsWith(".html"))
    .forEach((f) => fs.unlinkSync(path.join(TESTS_DIR, f)));
tests.forEach((t) => {
    fs.writeFileSync(path.join(TESTS_DIR, `${t.id}.html`), T.testPage(t, categoriesById[t.category]));
});

// Main pages
buildPage("index.html", "home", {
    "popular-tests": tests
        .filter((t) => t.popular)
        .map((t) => T.testCard(t, categoriesById[t.category], "", 3))
        .join("\n"),
    "categories": usedCategories.map(({ category, count }) => T.categoryCard(category, count, "")).join("\n")
});
buildPage("tests.html", "tests", {
    "category-filters": T.categoryChips(usedCategories, tests.length),
    "test-list": tests.map((t) => T.testCard(t, categoriesById[t.category], "", 2)).join("\n")
});
buildPage("preparation.html", "preparation", {
    "prep-table": T.prepTable(tests, categoriesById, "")
});
buildPage("results.html", "results");
buildPage("learn.html", "learn");

const drafts = tests.filter((t) => t.review.status === "draft");
console.log(`Built ${tests.length} test pages and 5 main pages.`);
if (drafts.length) {
    console.log(`\nNote: ${drafts.length} test(s) are still drafts awaiting clinical review:`);
    drafts.forEach((t) => console.log(`  - ${t.id}`));
}
