/* ------------------------------------------------------------
   PatientLab — test categories (content only, no page code)

   The order here is the order categories appear on the site.
   A category only appears once at least one test uses its id.

   This file is loaded by the browser as a normal <script> and
   by the build script (scripts/build.js) through Node.
   ------------------------------------------------------------ */
const PATIENTLAB_CATEGORIES = [
    {
        id: "haematology",
        name: "Full Blood Count and Haematology",
        description: "Tests that look at your blood cells, such as red cells, white cells and platelets."
    },
    {
        id: "clinical-chemistry",
        name: "Clinical Chemistry",
        description: "Tests that measure chemical substances in your blood, such as glucose."
    },
    {
        id: "electrolytes-urea-creatinine",
        name: "Electrolytes, Urea and Creatinine",
        description: "Tests of kidney function and the balance of salts and water in your body."
    },
    {
        id: "liver",
        name: "Liver Function Tests",
        description: "Tests that show whether your liver may be inflamed or damaged."
    },
    {
        id: "lipids",
        name: "Lipid Profile",
        description: "Tests that measure cholesterol and other fats in your blood."
    },
    {
        id: "endocrinology",
        name: "Endocrinology and Hormones",
        description: "Tests that measure hormones, such as those made by your thyroid gland."
    },
    {
        id: "immunology-serology",
        name: "Immunology and Serology",
        description: "Tests that look for infections, antibodies and markers of the immune system."
    },
    {
        id: "microbiology",
        name: "Microbiology",
        description: "Tests that look for bacteria, viruses, fungi or parasites that may cause infection."
    },
    {
        id: "urinalysis",
        name: "Urinalysis",
        description: "Tests that check your urine for signs of disease."
    },
    {
        id: "coagulation",
        name: "Coagulation",
        description: "Tests that check how well and how quickly your blood clots."
    },
    {
        id: "tumour-markers",
        name: "Tumour Markers",
        description: "Tests for substances that can be raised in some cancers, and also in many non-cancerous conditions."
    }
];

if (typeof module !== "undefined" && module.exports) {
    module.exports = PATIENTLAB_CATEGORIES;
}
