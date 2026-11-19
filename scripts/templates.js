/* ------------------------------------------------------------
   PatientLab — HTML templates used by the build script.

   Everything shared between pages (header, footer, cards) is
   defined once here, so the site stays consistent.
   All content is passed through esc() before being placed in HTML.
   ------------------------------------------------------------ */

const SITE = {
    name: "PatientLab",
    // Set this to the live address (e.g. "https://www.patientlab.org")
    // once a domain is chosen. Canonical links are added only when set.
    url: ""
};

const NAV = [
    { key: "home", href: "index.html", label: "Home" },
    { key: "tests", href: "tests.html", label: "Explore tests" },
    { key: "preparation", href: "preparation.html", label: "Test preparation" },
    { key: "results", href: "results.html", label: "Understand results" },
    { key: "learn", href: "learn.html", label: "Learn" }
];

const FASTING_LABELS = {
    "not-required": "No fasting needed",
    "required": "Fasting needed",
    "depends": "Fasting sometimes needed"
};

/* ---------- helpers ---------- */

function esc(value) {
    return String(value == null ? "" : value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function list(items, className) {
    const cls = className ? ` class="${className}"` : "";
    return `<ul${cls}>\n${items.map((i) => `    <li>${esc(i)}</li>`).join("\n")}\n</ul>`;
}

function paragraphs(items) {
    return items.map((p) => `<p>${esc(p)}</p>`).join("\n");
}

function fastingBadge(status) {
    return `<span class="badge badge--${esc(status)}">${esc(FASTING_LABELS[status])}</span>`;
}

function testDisplayName(test) {
    return test.abbreviation ? `${test.name} (${test.abbreviation})` : test.name;
}

/* ---------- icons (decorative, hidden from screen readers) ---------- */

const ICONS = {
    logo:
        '<svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><rect width="32" height="32" rx="9" fill="currentColor"/><path d="M13 8.5h6M14.2 8.5v8.6l-4.6 7a1.4 1.4 0 0 0 1.2 2.2h10.4a1.4 1.4 0 0 0 1.2-2.2l-4.6-7V8.5" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.6 21.5h8.8" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/></svg>',
    menu:
        '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    arrow:
        '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    info:
        '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 11v6M12 7.5v.01" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
};

/* ---------- shared header and footer ---------- */

function header(activeKey, base) {
    const links = NAV.map((item) => {
        const current = item.key === activeKey ? ' aria-current="page"' : "";
        return `                <li><a href="${base}${item.href}"${current}>${esc(item.label)}</a></li>`;
    }).join("\n");

    return `<a class="skip-link" href="#main">Skip to main content</a>
<header class="site-header">
    <div class="container site-header__inner">
        <a class="brand" href="${base}index.html">${ICONS.logo}<span>PatientLab</span></a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" hidden>
            ${ICONS.menu}<span>Menu</span>
        </button>
        <nav id="site-nav" class="site-nav" aria-label="Main">
            <ul>
${links}
            </ul>
        </nav>
    </div>
</header>`;
}

function footer(base) {
    const links = NAV.slice(1)
        .map((item) => `                    <li><a href="${base}${item.href}">${esc(item.label)}</a></li>`)
        .join("\n");

    return `<footer class="site-footer">
    <div class="container">
        <div class="site-footer__top">
            <div class="site-footer__about">
                <a class="brand brand--footer" href="${base}index.html">${ICONS.logo}<span>PatientLab</span></a>
                <p>Clear, trustworthy information about laboratory tests, written for patients.</p>
            </div>
            <nav aria-label="Footer">
                <ul class="site-footer__links">
${links}
                </ul>
            </nav>
        </div>
        <div class="site-footer__disclaimer">
            <h2>Medical disclaimer</h2>
            <p>PatientLab provides general educational information about laboratory tests. It is not medical advice, cannot diagnose any condition and is not a substitute for advice from a qualified healthcare professional. Always discuss your results and any preparation instructions with your healthcare provider or laboratory. If you feel very unwell, seek urgent medical help.</p>
            <p>PatientLab does not ask for, collect or store any personal health information.</p>
        </div>
        <p class="site-footer__copyright">&copy; ${new Date().getFullYear()} PatientLab</p>
    </div>
</footer>`;
}

/* ---------- reusable components ---------- */

function testCard(test, category, base, headingLevel) {
    const h = `h${headingLevel || 3}`;
    const abbr = test.abbreviation ? ` <span class="test-card__abbr">${esc(test.abbreviation)}</span>` : "";
    return `<article class="test-card" data-test-id="${esc(test.id)}">
    <p class="test-card__category">${esc(category.name)}</p>
    <${h} class="test-card__title"><a href="${base}tests/${esc(test.id)}.html">${esc(test.name)}</a>${abbr}</${h}>
    <p class="test-card__summary">${esc(test.summary)}</p>
    <ul class="test-card__meta" aria-label="Key facts">
        <li>${fastingBadge(test.preparation.fasting.status)}</li>
        <li><span class="badge badge--neutral">${esc(test.sample.type)} sample</span></li>
    </ul>
</article>`;
}

function categoryCard(category, count, base) {
    const label = count === 1 ? "1 test" : `${count} tests`;
    return `<li>
    <a class="category-card" href="${base}tests.html?category=${esc(category.id)}">
        <span class="category-card__name">${esc(category.name)}</span>
        <span class="category-card__desc">${esc(category.description)}</span>
        <span class="category-card__count">${label}</span>
    </a>
</li>`;
}

function categoryChips(categoriesWithCounts, total) {
    const chips = categoriesWithCounts.map(
        ({ category, count }) =>
            `    <button type="button" class="chip" data-category="${esc(category.id)}" aria-pressed="false">${esc(category.name)} <span class="chip__count">${count}</span></button>`
    );
    chips.unshift(
        `    <button type="button" class="chip" data-category="" aria-pressed="true">All tests <span class="chip__count">${total}</span></button>`
    );
    return chips.join("\n");
}

function prepTable(tests, categoriesById, base) {
    const rows = tests.map((t) => `        <tr>
            <th scope="row"><a href="${base}tests/${esc(t.id)}.html">${esc(testDisplayName(t))}</a></th>
            <td data-label="Fasting">${fastingBadge(t.preparation.fasting.status)}</td>
            <td data-label="Sample">${esc(t.sample.type)}</td>
            <td data-label="What to know">${esc(t.preparation.summary)}</td>
        </tr>`).join("\n");

    return `<div class="table-wrap">
<table class="data-table data-table--stack">
    <caption class="visually-hidden">Preparation summary for each test</caption>
    <thead>
        <tr>
            <th scope="col">Test</th>
            <th scope="col">Fasting</th>
            <th scope="col">Sample</th>
            <th scope="col">What to know</th>
        </tr>
    </thead>
    <tbody>
${rows}
    </tbody>
</table>
</div>`;
}

/* ---------- individual test page ---------- */

function section(id, title, body, open) {
    return `<details class="disclosure" id="${id}"${open ? " open" : ""}>
    <summary><h2 class="disclosure__title">${esc(title)}</h2></summary>
    <div class="disclosure__body">
${body}
    </div>
</details>`;
}

function testPage(test, category) {
    const base = "../";
    const p = test.preparation;
    const title = `${testDisplayName(test)}: preparation, sample and results`;
    const description = test.summary.length > 160 ? test.summary.slice(0, 157).replace(/\s+\S*$/, "") + "…" : test.summary;
    const canonical = SITE.url ? `\n    <link rel="canonical" href="${esc(SITE.url)}/tests/${esc(test.id)}.html">` : "";

    const jsonLd = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MedicalTest",
        name: test.name,
        alternateName: test.aliases,
        description: test.summary
    }).replace(/</g, "\\u003c");

    const alsoCalled = test.aliases.filter((a) => a !== test.abbreviation);
    const alsoCalledHtml = alsoCalled.length
        ? `<p class="test-header__aliases"><span>Also called:</span> ${alsoCalled.map(esc).join(", ")}</p>`
        : "";

    const reviewHtml =
        test.review.status === "reviewed"
            ? `<p class="review-note">Content reviewed by ${esc(test.review.reviewedBy)} on <time datetime="${esc(test.review.date)}">${esc(test.review.date)}</time>.</p>`
            : `<div class="callout callout--draft" role="note">${ICONS.info}<p><strong>Draft content.</strong> This page is awaiting clinical review and may change.</p></div>`;

    const measuresHtml = `<dl class="term-list">
${test.measures.map((m) => `    <div><dt>${esc(m.name)}</dt><dd>${esc(m.description)}</dd></div>`).join("\n")}
</dl>`;

    const prepHtml = `<dl class="prep-list">
    <div><dt>Fasting</dt><dd>${fastingBadge(p.fasting.status)}<p>${esc(p.fasting.text)}</p></dd></div>
    <div><dt>Water</dt><dd><p>${esc(p.water)}</p></dd></div>
    <div><dt>Timing</dt><dd><p>${esc(p.timing)}</p></dd></div>
    <div><dt>Medicines</dt><dd><p>${esc(p.medication)}</p></dd></div>
</dl>
${p.other.length ? `<h3>Also important</h3>\n${list(p.other)}` : ""}
<div class="callout callout--info" role="note">${ICONS.info}<p>Always follow the instructions given by your healthcare provider or laboratory. They know your situation and may give advice that differs from this general guidance.</p></div>`;

    const sampleHtml = `<dl class="term-list">
    <div><dt>Sample type</dt><dd>${esc(test.sample.detail)}</dd></div>
    <div><dt>Container</dt><dd>${esc(test.sample.container)}</dd></div>
</dl>`;

    const collectionHtml = test.collection.length > 2
        ? `<ol class="steps">\n${test.collection.map((s) => `    <li>${esc(s)}</li>`).join("\n")}\n</ol>`
        : paragraphs(test.collection);

    const unitsHtml = test.reporting.units.length
        ? `<h3>Units you may see</h3>
<div class="table-wrap">
<table class="data-table">
    <thead><tr><th scope="col">Result</th><th scope="col">Unit</th><th scope="col">What it means</th></tr></thead>
    <tbody>
${test.reporting.units.map((u) => `        <tr><td>${esc(u.parameter)}</td><td class="nowrap">${esc(u.unit)}</td><td>${esc(u.plain)}</td></tr>`).join("\n")}
    </tbody>
</table>
</div>`
        : "";

    const reportingHtml = `${paragraphs(test.reporting.text)}
${unitsHtml}
<p><a href="${base}results.html">Learn how to read a laboratory report</a></p>`;

    const abnormalHtml = `<div class="callout callout--caution" role="note">${ICONS.info}<p>A result outside the reference interval does not necessarily mean you have a disease. Results are interpreted alongside your symptoms, history and other tests by a qualified healthcare professional.</p></div>
<dl class="term-list">
${test.abnormal.map((a) => `    <div><dt>${esc(a.finding)}</dt><dd>${esc(a.meaning)}</dd></div>`).join("\n")}
</dl>`;

    const sections = [
        section("why", "Why is this test requested?", list(test.why), true),
        section("measures", "What does it measure?", measuresHtml, false),
        section("preparation", "How do I prepare?", prepHtml, true),
        section("sample", "What sample is needed?", sampleHtml, false),
        section("collection", "How is the sample collected?", collectionHtml, false),
        section("process", "What happens in the laboratory?", paragraphs(test.process), false),
        section("reporting", "How are results reported?", reportingHtml, false),
        section("abnormal", "What might abnormal results mean?", abnormalHtml, false),
        section("key-points", "Important things to know", list(test.keyPoints), false)
    ].join("\n");

    return `<!DOCTYPE html>
<!-- Generated by scripts/build.js from js/data/tests.js. Do not edit by hand. -->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${esc(title)} | PatientLab</title>
    <meta name="description" content="${esc(description)}">${canonical}
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="PatientLab">
    <meta property="og:title" content="${esc(testDisplayName(test))} | PatientLab">
    <meta property="og:description" content="${esc(description)}">
    <meta name="theme-color" content="#246b55">
    <link rel="icon" href="${base}favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="${base}css/style.css">
    <script>document.documentElement.classList.add("js");</script>
    <script type="application/ld+json">${jsonLd}</script>
</head>
<body>
${header("tests", base)}

<main id="main">
    <div class="container container--narrow">
        <nav class="breadcrumb" aria-label="Breadcrumb">
            <ol>
                <li><a href="${base}index.html">Home</a></li>
                <li><a href="${base}tests.html">Explore tests</a></li>
                <li><a href="${base}tests.html?category=${esc(category.id)}">${esc(category.name)}</a></li>
                <li><span aria-current="page">${esc(test.abbreviation || test.name)}</span></li>
            </ol>
        </nav>

        <article class="test-article">
            <header class="test-header">
                <p class="eyebrow">${esc(category.name)}</p>
                <h1>${esc(test.name)}${test.abbreviation ? ` <span class="test-header__abbr">(${esc(test.abbreviation)})</span>` : ""}</h1>
                ${alsoCalledHtml}
                <p class="lead">${esc(test.summary)}</p>
            </header>

            <dl class="glance" aria-label="At a glance">
                <div><dt>Fasting</dt><dd>${fastingBadge(p.fasting.status)}</dd></div>
                <div><dt>Sample</dt><dd>${esc(test.sample.type)}</dd></div>
                <div><dt>Preparation</dt><dd>${esc(p.summary)}</dd></div>
            </dl>

            ${reviewHtml}

            <div class="accordion-toolbar">
                <button type="button" class="btn btn--text" data-expand-all hidden>Expand all sections</button>
            </div>

            <div class="accordion" data-accordion>
${sections}
            </div>

            <aside class="callout callout--info talk-callout" aria-label="Discussing your results">
                ${ICONS.info}
                <p><strong>Talk to your healthcare provider.</strong> This page explains the test in general terms. Only a qualified healthcare professional who knows your history can tell you what your own results mean.</p>
            </aside>

            <p class="back-link"><a href="${base}tests.html">${ICONS.arrow}<span>Back to all tests</span></a></p>
        </article>
    </div>
</main>

${footer(base)}

<script src="${base}js/site.js"></script>
</body>
</html>
`;
}

module.exports = {
    SITE, NAV, FASTING_LABELS, esc,
    header, footer, testCard, categoryCard, categoryChips, prepTable, testPage
};
