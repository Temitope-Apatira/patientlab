/* ------------------------------------------------------------
   PatientLab — Laboratory Test Explorer (tests.html)

   The build script writes every test card into the page, so the
   full list works without JavaScript. This file adds search and
   category filters by showing, hiding and re-ordering those cards.

   The current search and category are kept in the address
   (tests.html?q=sugar&category=clinical-chemistry), so results
   can be bookmarked or shared.

   Needs: js/data/categories.js, js/data/tests.js, js/search.js
   ------------------------------------------------------------ */
(function () {
    const controls = document.getElementById("explorer-controls");
    const input = document.getElementById("test-search");
    const chipGroup = document.querySelector("[data-category-filters]");
    const list = document.getElementById("test-list");
    const count = document.getElementById("results-count");
    const announcer = document.getElementById("results-announcer");
    const empty = document.getElementById("empty-state");
    const emptyMessage = document.getElementById("empty-message");
    const searchAllButton = document.getElementById("search-all-categories");
    const clearButtons = document.querySelectorAll("[data-clear-filters]");

    if (!controls || !input || !list) return;

    const index = PatientLabSearch.buildIndex(PATIENTLAB_TESTS, PATIENTLAB_CATEGORIES);
    const categoryNames = {};
    PATIENTLAB_CATEGORIES.forEach(function (c) { categoryNames[c.id] = c.name; });

    const cards = {};
    list.querySelectorAll("[data-test-id]").forEach(function (card) {
        cards[card.getAttribute("data-test-id")] = card;
    });
    const chips = Array.from(chipGroup.querySelectorAll(".chip"));
    const validCategories = chips.map(function (c) { return c.getAttribute("data-category"); });

    const state = { query: "", category: "" };
    let announceTimer;

    /* ---------- reading and writing the address bar ---------- */
    function readUrl() {
        const params = new URLSearchParams(location.search);
        state.query = params.get("q") || "";
        const category = params.get("category") || "";
        state.category = validCategories.indexOf(category) > -1 ? category : "";
        input.value = state.query;
    }

    function writeUrl() {
        const params = new URLSearchParams();
        if (state.query.trim()) params.set("q", state.query.trim());
        if (state.category) params.set("category", state.category);
        const qs = params.toString();
        history.replaceState(null, "", qs ? "?" + qs : location.pathname);
    }

    /* ---------- showing results ---------- */
    function plural(n) {
        return n === 1 ? "1 test" : n + " tests";
    }

    function render() {
        const query = state.query.trim();
        const matches = PatientLabSearch.search(index, query);
        const shown = state.category
            ? matches.filter(function (t) { return t.category === state.category; })
            : matches;

        // Show matching cards in ranked order, hide the rest
        const shownIds = {};
        shown.forEach(function (test) {
            shownIds[test.id] = true;
            list.appendChild(cards[test.id]);
        });
        Object.keys(cards).forEach(function (id) {
            cards[id].hidden = !shownIds[id];
        });

        // Category chips: pressed state and number of matches in each
        chips.forEach(function (chip) {
            const id = chip.getAttribute("data-category");
            chip.setAttribute("aria-pressed", String(id === state.category));
            const n = id ? matches.filter(function (t) { return t.category === id; }).length : matches.length;
            chip.querySelector(".chip__count").textContent = n;
        });

        // Result summary
        let summary;
        const where = state.category ? " in " + categoryNames[state.category] : "";
        if (query) {
            summary = plural(shown.length) + " found for “" + query + "”" + where;
        } else if (state.category) {
            summary = "Showing " + plural(shown.length) + where;
        } else {
            summary = "Showing all " + plural(shown.length);
        }
        count.textContent = summary;

        // Empty state
        const isEmpty = shown.length === 0;
        empty.hidden = !isEmpty;
        if (isEmpty) {
            emptyMessage.textContent = query
                ? "We couldn't find a test matching “" + query + "”" + where + "."
                : "There are no tests" + where + " yet.";
            const elsewhere = state.category && matches.length > 0;
            searchAllButton.hidden = !elsewhere;
            if (elsewhere) {
                searchAllButton.textContent = "Show " + plural(matches.length) + " in all categories";
            }
        }

        // Tell screen reader users the result, after they pause typing
        clearTimeout(announceTimer);
        announceTimer = setTimeout(function () {
            announcer.textContent = isEmpty ? "No tests found." : summary;
        }, 600);
    }

    function update() {
        writeUrl();
        render();
    }

    /* ---------- events ---------- */
    input.addEventListener("input", function () {
        state.query = input.value;
        update();
    });

    // Pressing Enter in the search box shouldn't reload the page
    input.form.addEventListener("submit", function (event) {
        event.preventDefault();
        state.query = input.value;
        update();
    });

    chips.forEach(function (chip) {
        chip.addEventListener("click", function () {
            state.category = chip.getAttribute("data-category");
            update();
        });
    });

    searchAllButton.addEventListener("click", function () {
        state.category = "";
        update();
        input.focus();
    });

    clearButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            state.query = "";
            state.category = "";
            input.value = "";
            update();
            input.focus();
        });
    });

    /* ---------- start ---------- */
    controls.hidden = false;
    readUrl();
    render();
})();
