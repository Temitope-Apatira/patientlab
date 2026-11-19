/* Checks that common ways of searching find the right test.
   Run with:  npm test   (or: node scripts/test-search.js) */
const assert = require("node:assert/strict");
const tests = require("../js/data/tests.js");
const categories = require("../js/data/categories.js");
const Search = require("../js/search.js");

const index = Search.buildIndex(tests, categories);
const top = (q) => (Search.search(index, q)[0] || {}).id;

// [query, id expected as the first result]
const cases = [
    ["fbc", "full-blood-count"],
    ["CBC", "full-blood-count"],
    ["full blood", "full-blood-count"],
    ["haemoglobin", "full-blood-count"],
    ["hemoglobin", "full-blood-count"],
    ["sugar", "fasting-plasma-glucose"],
    ["blood sugar", "fasting-plasma-glucose"],
    ["fbs", "fasting-plasma-glucose"],
    ["glucose", "fasting-plasma-glucose"],
    ["kidney", "urea-electrolytes-creatinine"],
    ["E/U/Cr", "urea-electrolytes-creatinine"],
    ["eucr", "urea-electrolytes-creatinine"],
    ["u&e", "urea-electrolytes-creatinine"],
    ["u and e", "urea-electrolytes-creatinine"],
    ["potassium", "urea-electrolytes-creatinine"],
    ["liv", "liver-function-tests"],
    ["lft", "liver-function-tests"],
    ["jaundice", "liver-function-tests"],
    ["cholesterol", "lipid-profile"],
    ["cholesterol test", "lipid-profile"],
    ["thyroid", "thyroid-function-tests"],
    ["thyroid test", "thyroid-function-tests"],
    ["tsh", "thyroid-function-tests"],
    ["hep b", "hepatitis-b-surface-antigen"],
    ["hbsag", "hepatitis-b-surface-antigen"],
    ["uti", "urine-microscopy-culture-sensitivity"],
    ["urine", "urine-microscopy-culture-sensitivity"],
    ["warfarin", "prothrombin-time-inr"],
    ["inr", "prothrombin-time-inr"],
    ["clotting", "prothrombin-time-inr"],
    ["prostate", "prostate-specific-antigen"],
    ["psa", "prostate-specific-antigen"]
];

let failures = 0;
cases.forEach(([query, expected]) => {
    const got = top(query);
    if (got !== expected) {
        failures++;
        console.error(`FAIL  "${query}" -> ${got} (expected ${expected})`);
    }
});

// No results for nonsense; all tests for an empty query.
assert.equal(Search.search(index, "xyzqwv").length, 0, "nonsense query should return nothing");
assert.equal(Search.search(index, "   ").length, tests.length, "empty query should return all tests");

if (failures) {
    console.error(`\n${failures} of ${cases.length} search checks failed.`);
    process.exit(1);
}
console.log(`All ${cases.length} search checks passed.`);
