/* ------------------------------------------------------------
   PatientLab — test search (pure logic, no page code)

   Matches full names, abbreviations, aliases and keywords, and
   tolerates punctuation and spacing differences, so that
   "eucr", "E/U/Cr" and "e u cr" all find the same test.

   Used by the browser (js/explorer.js) and by the Node test
   script (scripts/test-search.js).
   ------------------------------------------------------------ */
const PatientLabSearch = (function () {
    // Words that add nothing to a search such as "thyroid test".
    // Only ignored when other words are present.
    const STOP_WORDS = new Set([
        "a", "an", "and", "the", "of", "for", "in", "to", "is", "my", "what",
        "test", "tests", "testing", "check", "level", "levels"
    ]);

    // Lowercase, remove accents, turn "&" into "and" and all other
    // punctuation into spaces. "U&E" -> "u and e", "Hb" -> "hb".
    function normalise(text) {
        return String(text || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "")
            .replace(/&/g, " and ")
            .replace(/[^a-z0-9]+/g, " ")
            .trim();
    }

    // The same text with spaces (and "and") removed: "u and e" -> "ue".
    function compact(text) {
        return text.replace(/\band\b/g, "").replace(/ /g, "");
    }

    // How well one search phrase matches one term (0 = no match).
    function phraseScore(query, queryCompact, term) {
        const t = normalise(term);
        if (!t) return 0;
        const tc = compact(t);
        if (t === query || (queryCompact.length > 1 && tc === queryCompact)) return 1;
        if (t.startsWith(query) || (queryCompact.length > 1 && tc.startsWith(queryCompact))) return 0.8;
        if ((" " + t).includes(" " + query)) return 0.6;  // a word starts with the query
        if (query.length >= 3 && (t.includes(query) || tc.includes(queryCompact))) return 0.4;
        return 0;
    }

    function bestPhraseScore(query, queryCompact, terms) {
        let best = 0;
        terms.forEach(function (term) {
            best = Math.max(best, phraseScore(query, queryCompact, term));
        });
        return best;
    }

    // Prepare the searchable fields of each test once, then reuse them.
    function buildIndex(tests, categories) {
        const categoryNames = {};
        (categories || []).forEach(function (c) {
            categoryNames[c.id] = c.name;
        });

        return tests.map(function (test, position) {
            const primary = [test.name, test.abbreviation].concat(test.aliases || []);
            const keywords = test.keywords || [];
            const category = categoryNames[test.category] || "";
            const measures = (test.measures || []).map(function (m) { return m.name; });
            const allText = normalise(
                primary.concat(keywords, [category, test.summary], measures).join(" ")
            );
            return {
                test: test,
                position: position,
                primary: primary,
                keywords: keywords,
                category: category,
                measures: measures,
                words: allText.split(" ")
            };
        });
    }

    function scoreEntry(entry, query) {
        const queryCompact = compact(query);

        // 1. Whole-phrase matches, strongest fields first.
        const phrase = Math.max(
            bestPhraseScore(query, queryCompact, entry.primary) * 100,
            bestPhraseScore(query, queryCompact, entry.keywords) * 70,
            bestPhraseScore(query, queryCompact, entry.measures) * 45,
            bestPhraseScore(query, queryCompact, [entry.category]) * 35
        );
        if (phrase > 0) return phrase;

        // 2. Word-by-word: every meaningful word must start a word
        //    somewhere in the test's text ("thyroid test", "blood sugar fasting").
        let tokens = query.split(" ");
        const meaningful = tokens.filter(function (t) { return !STOP_WORDS.has(t); });
        if (meaningful.length > 0) tokens = meaningful;

        const allMatch = tokens.every(function (token) {
            return entry.words.some(function (word) { return word.startsWith(token); });
        });
        return allMatch ? 20 : 0;
    }

    /**
     * Search tests.
     * @param {Array} index   result of buildIndex()
     * @param {string} rawQuery  what the person typed
     * @returns {Array} matching tests, best first. Empty query returns all, in original order.
     */
    function search(index, rawQuery) {
        const query = normalise(rawQuery);
        if (!query) {
            return index.map(function (entry) { return entry.test; });
        }

        return index
            .map(function (entry) {
                return { entry: entry, score: scoreEntry(entry, query) };
            })
            .filter(function (r) { return r.score > 0; })
            .sort(function (a, b) {
                return b.score - a.score || a.entry.position - b.entry.position;
            })
            .map(function (r) { return r.entry.test; });
    }

    return { normalise: normalise, buildIndex: buildIndex, search: search };
})();

if (typeof module !== "undefined" && module.exports) {
    module.exports = PatientLabSearch;
}
