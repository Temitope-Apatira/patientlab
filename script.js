// ------------------------------------------------------------
// 1. DATA
// Each laboratory test is one object in this array.
// To add a new test later, copy one { ... } block and edit it.
// ------------------------------------------------------------
const labTests = [
    {
        name: "Full Blood Count (FBC)",
        explanation:
            "One of the most common blood tests. It gives a general snapshot of the different types of cells in your blood.",
        measures: [
            "Red blood cells, which carry oxygen around the body",
            "White blood cells, which are part of the immune system",
            "Platelets, which help blood to clot",
            "Haemoglobin, the protein in red blood cells that carries oxygen"
        ]
    },
    {
        name: "Blood Glucose",
        explanation:
            "Checks how much sugar (glucose) is in your blood at the time the sample is taken. Glucose is the body's main source of energy. Sometimes you may be asked not to eat beforehand (a 'fasting' test).",
        measures: [
            "The level of glucose (sugar) in your blood"
        ]
    },
    {
        name: "Lipid Profile",
        explanation:
            "Looks at the fats (lipids) carried in your blood. These fats are a normal part of the body and are used for energy and building cells.",
        measures: [
            "Total cholesterol",
            "LDL cholesterol, often called 'bad' cholesterol",
            "HDL cholesterol, often called 'good' cholesterol",
            "Triglycerides, a type of fat stored for energy"
        ]
    }
];

// ------------------------------------------------------------
// 2. FIND THE ELEMENTS WE NEED ON THE PAGE
// ------------------------------------------------------------
const button = document.getElementById("exploreBtn");
const testList = document.getElementById("testList");

// ------------------------------------------------------------
// 3. BUILD ONE CARD FOR A SINGLE TEST
// We use createElement + textContent (instead of innerHTML)
// because textContent always treats text as plain text, which is safer.
// ------------------------------------------------------------
function createTestCard(test) {
    const card = document.createElement("article");
    card.className = "test-card";

    const title = document.createElement("h2");
    title.textContent = test.name;

    const explanation = document.createElement("p");
    explanation.textContent = test.explanation;

    const measuresHeading = document.createElement("h3");
    measuresHeading.textContent = "What it measures";

    const measuresList = document.createElement("ul");
    test.measures.forEach(function (item) {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        measuresList.appendChild(listItem);
    });

    card.appendChild(title);
    card.appendChild(explanation);
    card.appendChild(measuresHeading);
    card.appendChild(measuresList);

    return card;
}

// ------------------------------------------------------------
// 4. ADD A CARD FOR EVERY TEST INTO THE PAGE
// This runs once when the page loads. The cards stay hidden
// until the button is clicked.
// ------------------------------------------------------------
function renderTests() {
    labTests.forEach(function (test) {
        testList.appendChild(createTestCard(test));
    });
}

renderTests();

// ------------------------------------------------------------
// 5. SHOW / HIDE THE LIST WHEN THE BUTTON IS CLICKED
// ------------------------------------------------------------
button.addEventListener("click", function () {
    // Flip hidden: if it was true it becomes false, and the other way round.
    testList.hidden = !testList.hidden;

    const isOpen = !testList.hidden;

    // Change the button text so visitors know what the next click will do.
    button.textContent = isOpen ? "Hide laboratory tests" : "Explore laboratory tests";

    // Tell screen readers whether the list is open or closed.
    button.setAttribute("aria-expanded", String(isOpen));
});
