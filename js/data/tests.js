/* ------------------------------------------------------------
   PatientLab — laboratory test content (content only, no page code)

   Each test is one object. Every test uses the same structure,
   so the build script and the search can rely on it:

   id            URL-safe slug, used for the page: tests/<id>.html
   name          Full test name
   abbreviation  Short name shown next to the full name ("" if none)
   aliases       Other names people use. Shown as "Also called" and searched.
   keywords      Extra search words (symptoms, organs, plain terms). Not shown.
   category      Must match an id in categories.js
   popular       true = shown in "Popular tests" on the homepage
   summary       What the test is (1–2 sentences, plain English)
   why           Why the test is requested (list)
   measures      What the test measures: [{ name, description }]
   preparation   {
                   summary   one line, used in the preparation overview table
                   fasting   { status: "required" | "not-required" | "depends", text }
                   water, timing, medication   plain text
                   other     extra test-specific instructions (list, may be empty)
                 }
   sample        { type, detail, container }
   collection    How the sample is collected (list of steps/paragraphs)
   process       What happens in the laboratory (list)
   reporting     { text: [paragraphs], units: [{ parameter, unit, plain }] }
   abnormal      What abnormal results may indicate: [{ finding, meaning }]
   keyPoints     Important things to know (list)
   review        { status: "draft" | "reviewed", reviewedBy, date (YYYY-MM-DD) }

   IMPORTANT CONTENT RULES
   - Never present numeric reference intervals as universal values.
   - Preparation must be specific to the test. Do not assume fasting.
   - Never advise stopping prescribed medicine without the healthcare
     provider's advice.
   - Do not state or imply a diagnosis from a single result.
   ------------------------------------------------------------ */
const PATIENTLAB_TESTS = [
    /* ---------------- HAEMATOLOGY ---------------- */
    {
        id: "full-blood-count",
        name: "Full Blood Count",
        abbreviation: "FBC",
        aliases: ["FBC", "CBC", "Complete blood count", "Blood count", "Haemogram"],
        keywords: ["hemogram", "anaemia", "anemia", "haemoglobin", "hemoglobin", "hb", "white cells", "red cells", "platelets", "infection", "tired"],
        category: "haematology",
        popular: true,
        summary:
            "A Full Blood Count looks at the three main types of cell in your blood: red blood cells, white blood cells and platelets. It is one of the most commonly requested blood tests and gives a broad picture of your general health.",
        why: [
            "As part of a general health check, or before an operation.",
            "To look for a cause of symptoms such as tiredness, weakness, breathlessness, bruising or bleeding easily, or frequent infections.",
            "To check for anaemia (a low level of haemoglobin).",
            "To monitor a known blood condition, or the effects of some medicines and treatments, such as chemotherapy."
        ],
        measures: [
            { name: "Haemoglobin (Hb)", description: "The protein inside red blood cells that carries oxygen around your body." },
            { name: "Red blood cell count (RBC)", description: "The number of red blood cells in a set volume of blood." },
            { name: "Haematocrit (Hct)", description: "The proportion of your blood made up of red blood cells. Also called packed cell volume (PCV)." },
            { name: "Red cell indices (MCV, MCH, MCHC)", description: "The average size of your red blood cells and how much haemoglobin they contain. These can help point towards the cause of anaemia." },
            { name: "White blood cell count (WBC) and differential", description: "The total number of white blood cells, and the numbers of each type: neutrophils, lymphocytes, monocytes, eosinophils and basophils. White cells are part of your immune system." },
            { name: "Platelet count", description: "The number of platelets, the small cell fragments that help your blood to clot." }
        ],
        preparation: {
            summary: "No special preparation needed.",
            fasting: {
                status: "not-required",
                text: "You do not need to fast. You can eat and drink normally, unless you are having another test at the same time that needs fasting."
            },
            water: "You can drink water as normal.",
            timing: "The test can usually be done at any time of day.",
            medication:
                "Keep taking your medicines as usual. Tell your healthcare provider about any medicines you take, as some can affect blood cell counts. Do not stop any prescribed medicine unless your healthcare provider tells you to.",
            other: [
                "If you have had a blood transfusion recently, tell your healthcare provider, as it can affect the results."
            ]
        },
        sample: {
            type: "Blood",
            detail: "A small sample of blood from a vein, usually in your arm.",
            container:
                "A tube containing an anticoagulant called EDTA, which stops the blood from clotting. In many laboratories this tube has a purple or lavender cap, but cap colours vary between manufacturers."
        },
        collection: [
            "A trained healthcare worker will confirm your identity, then place a band (tourniquet) around your upper arm to make the vein easier to find.",
            "They clean the skin and insert a small needle into a vein, usually on the inside of your elbow. Blood flows into the tube.",
            "The tube is gently turned upside down several times so the blood mixes with the anticoagulant. This stops small clots forming, which could affect the results.",
            "In babies and young children, blood may be taken from a heel or finger prick instead."
        ],
        process: [
            "The sample is analysed on an automated haematology analyser, which counts and measures thousands of cells in a few minutes.",
            "If the analyser flags anything unusual, a laboratory scientist may spread a drop of blood thinly on a glass slide, stain it and examine it under a microscope. This is called a blood film.",
            "Samples are best analysed on the day they are collected, as long delays can change some cell measurements."
        ],
        reporting: {
            text: [
                "Each part of the count is reported as a number with its unit, next to the laboratory's reference interval.",
                "Values outside the reference interval are usually flagged, for example with H (high) or L (low)."
            ],
            units: [
                { parameter: "Haemoglobin", unit: "g/L or g/dL", plain: "Grams of haemoglobin in a litre (or a decilitre, one tenth of a litre) of blood." },
                { parameter: "White cells and platelets", unit: "×10⁹/L", plain: "Thousands of millions (billions) of cells in one litre of blood." },
                { parameter: "Red blood cells", unit: "×10¹²/L", plain: "Millions of millions (trillions) of cells in one litre of blood." },
                { parameter: "MCV", unit: "fL", plain: "Femtolitres. A tiny unit of volume used to describe the average size of one red blood cell." }
            ]
        },
        abnormal: [
            {
                finding: "Low haemoglobin",
                meaning:
                    "May indicate anaemia. Anaemia has many possible causes, including iron deficiency, blood loss, low vitamin B12 or folate, long-term illness, and inherited conditions such as sickle cell disease or thalassaemia. Further tests are usually needed to find the cause."
            },
            {
                finding: "High white cell count",
                meaning:
                    "Often seen with infection or inflammation. It can also follow physical stress, smoking or some medicines such as steroids and, less commonly, blood disorders."
            },
            {
                finding: "Low white cell count",
                meaning:
                    "Can occur with some viral infections, certain medicines and some bone marrow conditions. Some healthy people naturally have lower neutrophil counts (see Important things to know)."
            },
            {
                finding: "High or low platelet count",
                meaning:
                    "A raised count can follow infection, inflammation, bleeding or iron deficiency. A low count may be linked to viral infections, some medicines, liver disease or immune conditions. Occasionally platelets clump together in the tube and give a falsely low count, so a repeat sample may be requested."
            }
        ],
        keyPoints: [
            "Reference intervals for a full blood count vary with age, sex and pregnancy, and between laboratories.",
            "Many healthy people, particularly people of African or Middle Eastern ancestry, naturally have neutrophil counts below commonly used reference intervals. This is usually harmless and is linked to a common genetic variant called Duffy-null.",
            "Heavy exercise, dehydration, smoking and living at high altitude can affect some results.",
            "A single, slightly abnormal value is common and is often not significant. Your healthcare provider looks at all the values together, alongside your symptoms and history."
        ],
        review: { status: "draft", reviewedBy: "", date: "" }
    },

    /* ---------------- CLINICAL CHEMISTRY ---------------- */
    {
        id: "fasting-plasma-glucose",
        name: "Fasting Plasma Glucose",
        abbreviation: "FPG",
        aliases: ["FPG", "FBS", "Fasting blood sugar", "Fasting blood glucose", "Fasting glucose"],
        keywords: ["sugar", "blood sugar", "glucose", "diabetes", "diabetic", "prediabetes"],
        category: "clinical-chemistry",
        popular: true,
        summary:
            "Measures the amount of glucose (sugar) in your blood after you have not eaten for several hours. Glucose is the body's main source of energy, and its level is controlled mainly by the hormone insulin.",
        why: [
            "To check for diabetes or prediabetes, either because of symptoms (such as being very thirsty, passing urine often or unexplained weight loss) or as part of screening.",
            "As part of a health check if you have risk factors, such as a family history of diabetes, being overweight or having had diabetes during pregnancy.",
            "To help monitor people who have already been diagnosed with diabetes."
        ],
        measures: [
            { name: "Glucose", description: "The concentration of glucose in the liquid part of your blood (plasma) after a period without food." }
        ],
        preparation: {
            summary: "Fast for at least 8 hours. Plain water is allowed.",
            fasting: {
                status: "required",
                text:
                    "You usually need to fast for at least 8 hours before the test. This means no food and no drinks other than plain water. Many people find it easiest to fast overnight and have the test early the next morning. Your healthcare provider or laboratory will tell you exactly how long to fast."
            },
            water:
                "Plain water is allowed and encouraged. Avoid tea, coffee (even without sugar or milk), juice, soft drinks, chewing gum and sweets, as these can affect the result.",
            timing: "Usually in the morning after an overnight fast. Avoid fasting for much longer than you have been asked to.",
            medication:
                "Do not stop any prescribed medicine unless your healthcare provider tells you to. If you take insulin or other medicines for diabetes, ask your healthcare provider in advance how to manage them while fasting, as fasting may cause your blood sugar to drop too low. Some medicines, such as steroids, can raise glucose levels, so tell your healthcare provider about everything you take.",
            other: [
                "Avoid strenuous exercise and smoking on the morning of the test, as both can affect glucose levels.",
                "If you feel faint, shaky or unwell while fasting, eat or drink something sugary and tell your healthcare provider. The test can be rearranged.",
                "Bring a snack to eat after your sample has been taken."
            ]
        },
        sample: {
            type: "Blood",
            detail: "A sample of blood from a vein.",
            container:
                "Usually a tube containing sodium fluoride, which stops blood cells from using up the glucose in the sample. In many laboratories this tube has a grey cap, but cap colours vary between manufacturers."
        },
        collection: [
            "Blood is taken from a vein in your arm in the usual way.",
            "You may be asked to confirm that you have fasted. This is recorded, because it affects how the result is interpreted.",
            "Finger-prick glucose meters give a quick reading, but they are not usually used to diagnose diabetes. A laboratory sample is preferred."
        ],
        process: [
            "Blood cells keep using glucose after the sample is taken. Without a preservative, the glucose level in the tube falls over time, which could make the result look lower than it really is. This is why fluoride tubes are used and why samples should reach the laboratory promptly.",
            "In the laboratory, the sample is spun in a centrifuge to separate the plasma from the cells.",
            "The glucose concentration is measured using an enzyme-based chemical reaction on an automated analyser."
        ],
        reporting: {
            text: [
                "The result is reported as a single number with its unit.",
                "Laboratories may add a comment based on national or international guidelines, for example noting that a result falls in a range that needs further assessment."
            ],
            units: [
                { parameter: "Glucose", unit: "mmol/L", plain: "Millimoles per litre: the amount of glucose in one litre of plasma. Used in the UK and many other countries." },
                { parameter: "Glucose", unit: "mg/dL", plain: "Milligrams per decilitre. Used in some countries, such as the United States. The same result can be converted between the two units." }
            ]
        },
        abnormal: [
            {
                finding: "Higher than expected",
                meaning:
                    "May suggest prediabetes or diabetes, but in most cases a single raised result is not enough to diagnose diabetes. A repeat test or a different test, such as HbA1c or an oral glucose tolerance test, is usually needed. Glucose can also rise temporarily with illness, stress, recent surgery, some medicines, or if you did not fully fast."
            },
            {
                finding: "Lower than expected",
                meaning:
                    "Uncommon after a normal fast. It can be caused by diabetes medicines, prolonged fasting or heavy alcohol intake, or rarely by hormone or liver problems. A falsely low result can occur if the sample was delayed before reaching the laboratory."
            }
        ],
        keyPoints: [
            "A fasting glucose result can only be interpreted correctly if you truly fasted. Let the person taking your sample know if you ate or drank anything other than water.",
            "Diabetes is diagnosed by a healthcare professional following specific guidelines, often using more than one test.",
            "A fasting glucose shows your level at one moment. HbA1c, a different test, reflects your average glucose over the previous two to three months.",
            "During pregnancy, glucose is often tested differently, using a glucose tolerance test."
        ],
        review: { status: "draft", reviewedBy: "", date: "" }
    },

    /* ---------------- ELECTROLYTES, UREA AND CREATININE ---------------- */
    {
        id: "urea-electrolytes-creatinine",
        name: "Urea, Electrolytes and Creatinine",
        abbreviation: "U&E",
        aliases: ["U&E", "E/U/Cr", "EUCr", "UEC", "Renal function test", "Kidney function test"],
        keywords: ["kidney", "kidneys", "renal", "rft", "electrolytes", "sodium", "potassium", "chloride", "bicarbonate", "urea", "creatinine", "egfr", "dehydration", "salt"],
        category: "electrolytes-urea-creatinine",
        popular: true,
        summary:
            "A group of blood tests that measures important salts (electrolytes) and waste products in your blood. Together, they show how well your kidneys are working and the balance of fluid and salts in your body.",
        why: [
            "To check how well your kidneys are working.",
            "To look for dehydration or a salt imbalance, for example if you have been vomiting, have had diarrhoea or are unwell.",
            "To monitor people with kidney disease, high blood pressure, diabetes or heart failure.",
            "To check for side effects of medicines that can affect the kidneys or potassium levels, such as some blood pressure medicines and water tablets (diuretics).",
            "Before and after surgery, or when starting certain treatments."
        ],
        measures: [
            { name: "Sodium (Na)", description: "A salt that helps control the balance of water in your body and is important for nerves and muscles." },
            { name: "Potassium (K)", description: "Essential for a normal heart rhythm and muscle function. Small changes can matter, so it is measured carefully." },
            { name: "Chloride and bicarbonate", description: "Included by some laboratories. They help assess the acid–base balance of your blood." },
            { name: "Urea", description: "A waste product made when the body breaks down protein. It is removed by the kidneys." },
            { name: "Creatinine", description: "A waste product from normal muscle activity, removed by the kidneys. It is one of the main markers of kidney function." },
            { name: "eGFR (estimated glomerular filtration rate)", description: "A calculation, usually based on your creatinine, age and sex, that estimates how well your kidneys filter blood." }
        ],
        preparation: {
            summary: "Fasting not usually needed. You may be asked to avoid meat for 12 hours.",
            fasting: {
                status: "not-required",
                text: "Fasting is not usually needed."
            },
            water: "Drink water as normal. Being very dehydrated can affect the results.",
            timing: "The test can usually be done at any time of day.",
            medication:
                "Keep taking your medicines as usual. Tell your healthcare provider about everything you take, including blood pressure medicines, water tablets and anti-inflammatory painkillers such as ibuprofen, as these can affect kidney function and electrolyte levels. Do not stop any prescribed medicine unless your healthcare provider tells you to.",
            other: [
                "Some guidelines advise not eating meat in the 12 hours before the test, because cooked meat can temporarily raise creatinine. Follow the advice you are given.",
                "Avoid very strenuous exercise shortly before the test, as it can temporarily raise creatinine.",
                "Creatine supplements, used by some people for bodybuilding, can raise creatinine. Tell your healthcare provider if you take them."
            ]
        },
        sample: {
            type: "Blood",
            detail: "A sample of blood from a vein.",
            container:
                "A tube that allows the liquid part of the blood (serum or plasma) to be separated. The cap colour depends on the laboratory and manufacturer; gold, yellow, red and green are common."
        },
        collection: [
            "Blood is taken from a vein in your arm.",
            "You may be asked not to clench and unclench your fist repeatedly while blood is being taken, as this can release potassium from muscles and give a falsely high result.",
            "The sample should reach the laboratory promptly. Delays, or keeping the sample in a fridge or a very warm place before it is separated, can affect the potassium result."
        ],
        process: [
            "The sample is spun in a centrifuge to separate the serum or plasma from the cells.",
            "Sodium, potassium and chloride are usually measured with ion-selective electrodes, which detect specific charged particles.",
            "Urea and creatinine are measured using chemical or enzyme-based reactions on an automated analyser.",
            "The eGFR is then calculated from the creatinine result."
        ],
        reporting: {
            text: [
                "Each result is listed with its unit and the laboratory's reference interval.",
                "Some laboratories report eGFR as 'above' a set value, rather than an exact number, when kidney function is within the expected range."
            ],
            units: [
                { parameter: "Sodium, potassium, chloride, bicarbonate", unit: "mmol/L", plain: "Millimoles per litre: the amount of the substance in one litre of serum or plasma." },
                { parameter: "Urea", unit: "mmol/L or mg/dL", plain: "Some countries report urea as blood urea nitrogen (BUN) in mg/dL." },
                { parameter: "Creatinine", unit: "µmol/L or mg/dL", plain: "Micromoles per litre, or milligrams per decilitre, depending on the country." },
                { parameter: "eGFR", unit: "mL/min/1.73 m²", plain: "Millilitres of blood filtered by the kidneys each minute, adjusted to a standard body size." }
            ]
        },
        abnormal: [
            {
                finding: "Raised creatinine or urea, or a low eGFR",
                meaning:
                    "May indicate that the kidneys are not filtering as well as expected. This can be short-term, for example due to dehydration or illness, or longer-term. Urea can also rise after a high-protein meal or bleeding in the stomach or gut. A repeat test is often needed to see whether a change persists."
            },
            {
                finding: "High or low sodium",
                meaning:
                    "Usually reflects the balance of water in the body rather than how much salt you eat. Causes include dehydration, drinking very large amounts of fluid, some medicines, and some hormone, heart, liver or kidney conditions."
            },
            {
                finding: "High or low potassium",
                meaning:
                    "Can be caused by kidney problems, some medicines, vomiting or diarrhoea. A high potassium result is sometimes caused by the sample itself, for example if blood cells were damaged during collection (haemolysis) or the sample was delayed, so the laboratory may ask for a repeat sample."
            }
        ],
        keyPoints: [
            "Creatinine depends partly on muscle mass, so people with very high or very low muscle mass may have results that don't fully reflect their kidney function.",
            "eGFR is an estimate. It is less reliable in some situations, such as pregnancy, very high or low body weight, amputation and sudden illness.",
            "Kidney function is usually assessed using results over time, rather than a single test.",
            "Because potassium is very sensitive to how the sample is handled, a surprising potassium result is often checked with a fresh sample before any decisions are made."
        ],
        review: { status: "draft", reviewedBy: "", date: "" }
    },

    /* ---------------- LIVER FUNCTION ---------------- */
    {
        id: "liver-function-tests",
        name: "Liver Function Tests",
        abbreviation: "LFT",
        aliases: ["LFT", "LFTs", "Liver panel", "Liver profile", "Hepatic function panel"],
        keywords: ["liver", "jaundice", "yellow", "bilirubin", "alt", "ast", "alp", "ggt", "albumin", "alcohol", "fatty liver"],
        category: "liver",
        popular: true,
        summary:
            "A group of blood tests that gives information about the health of your liver. Despite the name, most of these tests show whether the liver is inflamed or damaged, rather than directly measuring how well it works.",
        why: [
            "To look for a cause of symptoms such as yellowing of the skin or eyes (jaundice), dark urine, pale stools, tummy pain, nausea or itching.",
            "To check for liver damage from infections (such as hepatitis), alcohol, fatty liver disease or medicines.",
            "To monitor known liver conditions.",
            "To check for side effects of medicines that can affect the liver, such as some cholesterol-lowering, anti-tuberculosis and anti-epileptic medicines."
        ],
        measures: [
            { name: "ALT (alanine aminotransferase)", description: "An enzyme found mainly in liver cells. It is released into the blood when liver cells are damaged." },
            { name: "AST (aspartate aminotransferase)", description: "An enzyme found in the liver and also in muscle and other tissues. Not every laboratory includes it." },
            { name: "ALP (alkaline phosphatase)", description: "An enzyme found in the liver, the bile ducts and bone. It can be raised in liver or bile duct problems, and is naturally higher in children, teenagers and during pregnancy." },
            { name: "GGT (gamma-glutamyl transferase)", description: "An enzyme found mainly in the liver and bile ducts. It can rise with bile duct problems, alcohol use and some medicines." },
            { name: "Bilirubin", description: "A yellow substance made when old red blood cells are broken down. The liver processes it so it can be removed from the body." },
            { name: "Albumin", description: "The main protein made by the liver. It helps keep fluid in your blood vessels and carries substances around the body." },
            { name: "Total protein", description: "The total amount of protein in your blood, including albumin and antibodies (globulins)." }
        ],
        preparation: {
            summary: "Fasting not usually needed.",
            fasting: {
                status: "not-required",
                text: "Fasting is not usually needed. If tests that need fasting are being taken at the same time, follow the instructions for those."
            },
            water: "You can drink water as normal.",
            timing: "The test can usually be done at any time of day.",
            medication:
                "Keep taking your medicines as usual. Tell your healthcare provider about all medicines, herbal remedies and supplements you take, as many can affect liver test results. Do not stop any prescribed medicine unless your healthcare provider tells you to.",
            other: [
                "Be open with your healthcare provider about how much alcohol you usually drink, as this helps them interpret your results.",
                "Very strenuous exercise in the days before the test can raise some enzymes, such as AST, because they are also found in muscle."
            ]
        },
        sample: {
            type: "Blood",
            detail: "A sample of blood from a vein.",
            container:
                "A tube that allows the serum or plasma to be separated. The cap colour depends on the laboratory and manufacturer."
        },
        collection: [
            "Blood is taken from a vein in your arm.",
            "Bilirubin breaks down in strong light, so samples should not be left in direct sunlight before they reach the laboratory."
        ],
        process: [
            "The sample is spun in a centrifuge to separate the serum or plasma from the cells.",
            "Enzymes such as ALT and ALP are measured by how quickly they drive a chemical reaction. Bilirubin, albumin and total protein are measured using colour-changing chemical reactions on an automated analyser.",
            "If red blood cells are damaged during collection (haemolysis), some results, such as AST, can be falsely raised. The laboratory may add a comment if this happens."
        ],
        reporting: {
            text: [
                "Each test is reported with its unit and the laboratory's reference interval. Results outside the interval are flagged.",
                "Healthcare providers usually look at the pattern across all the results rather than at a single value, as different patterns can point towards different types of liver problem."
            ],
            units: [
                { parameter: "ALT, AST, ALP, GGT", unit: "U/L or IU/L", plain: "Units per litre: a measure of enzyme activity, not weight." },
                { parameter: "Bilirubin", unit: "µmol/L or mg/dL", plain: "Micromoles per litre, or milligrams per decilitre, depending on the country." },
                { parameter: "Albumin and total protein", unit: "g/L or g/dL", plain: "Grams of protein in a litre (or a decilitre) of serum." }
            ]
        },
        abnormal: [
            {
                finding: "Raised ALT or AST",
                meaning:
                    "Suggests liver cells may be inflamed or damaged. Common causes include fatty liver disease, alcohol, viral hepatitis and some medicines. Mild rises are common and may return to normal on repeat testing."
            },
            {
                finding: "Raised ALP or GGT",
                meaning:
                    "May point to a problem with the flow of bile, such as gallstones blocking a bile duct. ALP also comes from bone, so it is naturally higher in growing children and teenagers and during pregnancy. GGT can be raised by alcohol and some medicines."
            },
            {
                finding: "Raised bilirubin",
                meaning:
                    "Can be caused by liver disease, blocked bile ducts, or increased breakdown of red blood cells. A mild, harmless rise is seen in Gilbert's syndrome, a common inherited condition."
            },
            {
                finding: "Low albumin",
                meaning:
                    "May reflect long-standing liver disease, but also general illness, inflammation, poor nutrition, or protein loss through the kidneys or gut."
            }
        ],
        keyPoints: [
            "Mildly abnormal liver test results are common and often don't mean serious liver disease.",
            "Gilbert's syndrome affects a few people in every hundred. It causes slightly raised bilirubin, especially during fasting or illness, and is harmless.",
            "Liver tests alone cannot show the cause of a problem. Further tests, such as blood tests for hepatitis or an ultrasound scan, may be needed.",
            "Results should always be interpreted together with your symptoms, medicines and medical history."
        ],
        review: { status: "draft", reviewedBy: "", date: "" }
    },

    /* ---------------- LIPIDS ---------------- */
    {
        id: "lipid-profile",
        name: "Lipid Profile",
        abbreviation: "",
        aliases: ["Lipid panel", "Cholesterol test", "Lipogram", "Fasting lipids"],
        keywords: ["cholesterol", "ldl", "hdl", "triglycerides", "triglyceride", "fat", "fats", "heart", "statin", "stroke"],
        category: "lipids",
        popular: true,
        summary:
            "Measures the fats (lipids) in your blood, including cholesterol and triglycerides. These fats are essential for the body, but high levels of some of them over many years increase the risk of heart disease and stroke.",
        why: [
            "As part of assessing your risk of heart disease and stroke, together with other factors such as age, blood pressure, smoking and diabetes.",
            "To monitor treatment with cholesterol-lowering medicines, such as statins.",
            "If you have a family history of high cholesterol or early heart disease.",
            "To monitor conditions that can affect blood fats, such as diabetes, kidney disease and an underactive thyroid."
        ],
        measures: [
            { name: "Total cholesterol", description: "All the cholesterol carried in your blood." },
            { name: "HDL cholesterol", description: "Often called 'good' cholesterol, because it helps carry cholesterol away from blood vessels to the liver." },
            { name: "LDL cholesterol", description: "Often called 'bad' cholesterol, because high levels over time contribute to fatty deposits in blood vessels. Many laboratories calculate it rather than measuring it directly." },
            { name: "Triglycerides", description: "A type of fat the body uses for energy. Levels rise after eating." },
            { name: "Non-HDL cholesterol", description: "Total cholesterol minus HDL cholesterol. Some laboratories report it because it includes all the potentially harmful types of cholesterol." },
            { name: "Cholesterol ratio", description: "Total cholesterol divided by HDL cholesterol. Some laboratories include this to help with risk assessment." }
        ],
        preparation: {
            summary: "Often no fasting needed, but some labs ask for a 10–12 hour fast. Check your instructions.",
            fasting: {
                status: "depends",
                text:
                    "Many laboratories no longer require fasting for a routine lipid profile, because eating has only a small effect on most results. However, you may be asked to fast, usually for 10 to 12 hours, if your triglycerides were high before, or for other reasons. Always follow the instructions from your healthcare provider or laboratory."
            },
            water: "Plain water is allowed, including if you have been asked to fast.",
            timing: "If you have been asked to fast, the test is usually done in the morning.",
            medication:
                "Keep taking your medicines, including statins, as usual unless you are told otherwise. Do not stop any prescribed medicine unless your healthcare provider tells you to.",
            other: [
                "Avoid alcohol in the 24 hours before the test if you can, as it can raise triglycerides.",
                "A recent serious illness, surgery or heart attack can temporarily change cholesterol levels. Tell your healthcare provider, as they may decide to repeat or delay the test."
            ]
        },
        sample: {
            type: "Blood",
            detail: "A sample of blood from a vein.",
            container:
                "A tube that allows the serum or plasma to be separated. The cap colour depends on the laboratory and manufacturer."
        },
        collection: [
            "Blood is taken from a vein in your arm.",
            "Some clinics offer a finger-prick cholesterol test that gives a quick result. These are useful for screening, but a laboratory sample is usually used to confirm results or guide treatment."
        ],
        process: [
            "The sample is spun in a centrifuge to separate the serum or plasma from the cells.",
            "Total cholesterol, HDL cholesterol and triglycerides are measured using enzyme-based reactions on an automated analyser.",
            "LDL cholesterol is often calculated from the other results using a formula. When triglycerides are very high, this calculation becomes unreliable, so the laboratory may measure LDL directly or not report it."
        ],
        reporting: {
            text: [
                "Each lipid result is reported with its unit.",
                "Rather than a single 'normal' range, lipid results are often interpreted against targets that depend on your overall risk of heart disease. Your healthcare provider considers your results together with your other risk factors, sometimes using a risk calculator."
            ],
            units: [
                { parameter: "Cholesterol and triglycerides", unit: "mmol/L or mg/dL", plain: "Millimoles per litre, or milligrams per decilitre, depending on the country." },
                { parameter: "Cholesterol ratio", unit: "No unit", plain: "A ratio of one result divided by another." }
            ]
        },
        abnormal: [
            {
                finding: "High LDL or total cholesterol",
                meaning:
                    "Increases the long-term risk of heart disease and stroke, particularly alongside other risk factors. Causes include diet, physical inactivity, genetics (such as familial hypercholesterolaemia), and some medical conditions and medicines."
            },
            {
                finding: "Low HDL cholesterol",
                meaning:
                    "Associated with a higher risk of heart disease. It can be linked to smoking, physical inactivity, being overweight and diabetes."
            },
            {
                finding: "High triglycerides",
                meaning:
                    "Can be caused by a recent meal, alcohol, being overweight, poorly controlled diabetes, some medicines and inherited conditions. Very high levels increase the risk of inflammation of the pancreas (pancreatitis)."
            }
        ],
        keyPoints: [
            "Your lipid results are one part of your overall heart risk. Two people with the same cholesterol level may be given different advice.",
            "Cholesterol can change with pregnancy, illness, weight change and medicines, so results are often repeated over time.",
            "Very high cholesterol in a young person, or a strong family history of early heart disease, may suggest an inherited condition.",
            "Lifestyle changes and medicines can both lower cholesterol. Treatment decisions should be made with your healthcare provider."
        ],
        review: { status: "draft", reviewedBy: "", date: "" }
    },

    /* ---------------- ENDOCRINOLOGY ---------------- */
    {
        id: "thyroid-function-tests",
        name: "Thyroid Function Tests",
        abbreviation: "TFT",
        aliases: ["TFT", "TFTs", "Thyroid panel", "Thyroid profile", "TSH", "Free T4", "FT4", "Free T3", "FT3"],
        keywords: ["thyroid", "goitre", "goiter", "underactive", "overactive", "hypothyroidism", "hyperthyroidism", "levothyroxine", "thyroxine", "hormone"],
        category: "endocrinology",
        popular: true,
        summary:
            "Blood tests that check how well your thyroid gland is working. The thyroid is a small gland in your neck that makes hormones controlling how your body uses energy (your metabolism).",
        why: [
            "To investigate symptoms that could be caused by an underactive or overactive thyroid, such as tiredness, weight change, feeling unusually cold or hot, a fast heartbeat, mood changes, or a swelling in the neck.",
            "To monitor people taking thyroid medicines, such as levothyroxine, or medicines for an overactive thyroid.",
            "To check thyroid function in some people during pregnancy or when planning a pregnancy.",
            "To check for side effects of medicines that can affect the thyroid, such as amiodarone and lithium."
        ],
        measures: [
            { name: "TSH (thyroid-stimulating hormone)", description: "Made by the pituitary gland at the base of the brain. It tells the thyroid how much hormone to make, and is often the first test done." },
            { name: "Free T4 (free thyroxine)", description: "The main hormone made by the thyroid. 'Free' means the part not attached to proteins in the blood, which is the part available for the body to use." },
            { name: "Free T3 (free triiodothyronine)", description: "The most active thyroid hormone. It is measured in some situations, such as a suspected overactive thyroid." }
        ],
        preparation: {
            summary: "No fasting needed. Mention biotin supplements and ask about your levothyroxine timing.",
            fasting: {
                status: "not-required",
                text: "Fasting is not needed."
            },
            water: "You can drink water as normal.",
            timing:
                "The test can usually be done at any time of day. If you are being monitored on thyroid medicine, your healthcare provider may ask you to have it at a similar time on each occasion.",
            medication:
                "Do not stop any prescribed medicine unless your healthcare provider tells you to. If you take levothyroxine, ask your healthcare provider whether to take your dose before or after the test on the day, as this can affect some results. Tell your healthcare provider about all the medicines you take.",
            other: [
                "Tell your healthcare provider if you take biotin (vitamin B7) or supplements containing it, such as some hair, skin and nail products. High doses of biotin can interfere with thyroid tests and give misleading results. You may be advised to pause it for a few days before the test.",
                "A recent illness can temporarily change thyroid test results, so let your healthcare provider know if you have been unwell."
            ]
        },
        sample: {
            type: "Blood",
            detail: "A sample of blood from a vein.",
            container:
                "A tube that allows the serum or plasma to be separated. The cap colour depends on the laboratory and manufacturer."
        },
        collection: [
            "Blood is taken from a vein in your arm."
        ],
        process: [
            "The sample is spun in a centrifuge to separate the serum or plasma from the cells.",
            "Thyroid hormones are measured using immunoassays: tests that use antibodies designed to recognise and bind to a specific hormone. The amount bound is detected and converted into a concentration.",
            "Some laboratories measure TSH first, and only add free T4 or free T3 if the TSH is outside the reference interval."
        ],
        reporting: {
            text: [
                "Results are reported with units and the laboratory's reference intervals.",
                "TSH and free T4 are usually interpreted together. The pituitary and thyroid work as a feedback loop: when thyroid hormone is low, TSH usually rises, and when thyroid hormone is high, TSH usually falls."
            ],
            units: [
                { parameter: "TSH", unit: "mU/L", plain: "Milli-units per litre: a measure of hormone activity." },
                { parameter: "Free T4 and free T3", unit: "pmol/L", plain: "Picomoles per litre: very small amounts of hormone. Some countries use ng/dL or pg/mL instead." }
            ]
        },
        abnormal: [
            {
                finding: "High TSH with low free T4",
                meaning: "A pattern often seen with an underactive thyroid (hypothyroidism)."
            },
            {
                finding: "Low TSH with high free T4 or free T3",
                meaning: "A pattern often seen with an overactive thyroid (hyperthyroidism)."
            },
            {
                finding: "Slightly abnormal TSH with normal free T4",
                meaning:
                    "Sometimes called 'subclinical' thyroid disease. It may settle on its own and is often rechecked after some weeks before any treatment is considered."
            },
            {
                finding: "Other or unusual patterns",
                meaning:
                    "Can be caused by recent illness, some medicines, pregnancy, problems with the pituitary gland, or interference with the test (for example from biotin). Further tests may be needed."
            }
        ],
        keyPoints: [
            "Thyroid hormone levels change during pregnancy, so laboratories often use different reference intervals for pregnant people.",
            "After thyroid medicine is started or the dose is changed, it takes several weeks for TSH to settle, so tests are usually repeated after about 6 to 8 weeks.",
            "Thyroid results can be temporarily abnormal during or after a serious illness.",
            "Results should always be interpreted together with your symptoms and medical history."
        ],
        review: { status: "draft", reviewedBy: "", date: "" }
    },

    /* ---------------- IMMUNOLOGY AND SEROLOGY ---------------- */
    {
        id: "hepatitis-b-surface-antigen",
        name: "Hepatitis B Surface Antigen",
        abbreviation: "HBsAg",
        aliases: ["HBsAg", "Hep B test", "Hepatitis B test", "Australia antigen"],
        keywords: ["hepatitis", "hepatitis b", "hbv", "liver infection", "screening", "antenatal", "virus"],
        category: "immunology-serology",
        popular: false,
        summary:
            "A blood test that looks for a protein from the hepatitis B virus. Hepatitis B is a viral infection that affects the liver. Finding this protein (the surface antigen) in your blood shows that you currently have the infection.",
        why: [
            "As part of routine screening, for example during pregnancy, before donating blood, or before some medical treatments.",
            "If you have symptoms of hepatitis, such as jaundice, or abnormal liver test results.",
            "If you may have been exposed to the virus, for example through a needle-stick injury, sexual contact, or living with someone who has hepatitis B.",
            "Before starting some treatments that weaken the immune system, as these can reactivate a hidden hepatitis B infection."
        ],
        measures: [
            {
                name: "Hepatitis B surface antigen (HBsAg)",
                description: "A protein found on the surface of the hepatitis B virus. It appears in the blood during a current infection, whether recent or long-term."
            }
        ],
        preparation: {
            summary: "No special preparation needed.",
            fasting: {
                status: "not-required",
                text: "No fasting or special preparation is needed."
            },
            water: "You can drink water as normal.",
            timing: "The test can be done at any time of day.",
            medication:
                "Keep taking your medicines as usual. Do not stop any prescribed medicine unless your healthcare provider tells you to.",
            other: [
                "If you have had a hepatitis B vaccine in the last few weeks, tell your healthcare provider. Very occasionally, recent vaccination can cause a brief, temporary positive result.",
                "If you are being tested after a possible exposure, your healthcare provider will advise on timing, as a very recent infection may not yet be detectable."
            ]
        },
        sample: {
            type: "Blood",
            detail: "A sample of blood from a vein.",
            container:
                "A tube that allows the serum or plasma to be separated. The cap colour depends on the laboratory and manufacturer."
        },
        collection: [
            "Blood is taken from a vein in your arm.",
            "In some settings, rapid tests using a finger-prick sample are available. A reactive rapid test should be confirmed with a laboratory test."
        ],
        process: [
            "The laboratory uses an immunoassay: a test that uses antibodies designed to bind to the hepatitis B surface antigen if it is present.",
            "If the first test is reactive, the laboratory usually confirms it with a second, different test, because false-positive results can occasionally occur.",
            "Confirmed positive samples may be tested for other hepatitis B markers to help work out the stage of infection."
        ],
        reporting: {
            text: [
                "Results are usually reported as 'reactive' (detected) or 'non-reactive' (not detected). Some laboratories use 'positive' and 'negative' instead.",
                "Some reports also include a numerical value or index from the analyser. The laboratory report explains how this is interpreted."
            ],
            units: []
        },
        abnormal: [
            {
                finding: "Reactive (positive)",
                meaning:
                    "Once confirmed, indicates a current hepatitis B infection. On its own, it does not show whether the infection is recent (acute) or long-term (chronic). If HBsAg is still present after six months, the infection is considered chronic. Further tests and specialist assessment help decide whether treatment or monitoring is needed."
            },
            {
                finding: "Non-reactive (negative)",
                meaning:
                    "Hepatitis B surface antigen was not detected. This usually means you don't currently have a hepatitis B infection, but a very recent infection may not yet be detectable. It does not show whether you are immune; a different test is used for that."
            }
        ],
        keyPoints: [
            "Hepatitis B can pass from a mother to her baby around the time of birth. Screening in pregnancy means the baby can be protected with vaccination and, if needed, antibody treatment soon after birth.",
            "Many people with chronic hepatitis B feel well for years, which is why testing matters.",
            "A positive result should be discussed with a healthcare professional, who can arrange further tests, advise on protecting others, and arrange testing for close contacts.",
            "Hepatitis B can be prevented with a safe and effective vaccine.",
            "Your result is confidential medical information."
        ],
        review: { status: "draft", reviewedBy: "", date: "" }
    },

    /* ---------------- MICROBIOLOGY ---------------- */
    {
        id: "urine-microscopy-culture-sensitivity",
        name: "Urine Microscopy, Culture and Sensitivity",
        abbreviation: "Urine MCS",
        aliases: ["Urine MCS", "Urine M/C/S", "MSU", "Midstream urine", "Urine culture", "Urine C/S"],
        keywords: ["urine", "urine infection", "uti", "bladder", "cystitis", "kidney infection", "antibiotics", "bacteria", "burning"],
        category: "microbiology",
        popular: false,
        summary:
            "A urine test that looks for signs of infection in your urinary tract (your bladder, kidneys and the tubes that connect them). If bacteria are found, the laboratory identifies them and tests which antibiotics are likely to work.",
        why: [
            "To confirm a suspected urinary tract infection (UTI), especially if symptoms are severe, keep coming back, or haven't improved with treatment.",
            "To check for infection during pregnancy, even without symptoms, because untreated infections can cause complications.",
            "In children, older adults and people with urinary catheters, where symptoms may be less clear.",
            "To help choose the right antibiotic."
        ],
        measures: [
            { name: "Microscopy", description: "The urine is examined under a microscope for white blood cells (a sign of inflammation), red blood cells, bacteria, skin cells (which can suggest contamination), and other structures such as casts and crystals." },
            { name: "Culture", description: "The urine is placed on special growth plates to see whether bacteria or yeasts grow, and in what numbers." },
            { name: "Sensitivity", description: "If a likely cause of infection grows, it is tested against a range of antibiotics to see which are likely to work. This is also called susceptibility testing." }
        ],
        preparation: {
            summary: "No fasting. Collect a clean midstream sample in a sterile container, ideally before antibiotics.",
            fasting: {
                status: "not-required",
                text: "You do not need to fast."
            },
            water: "Drink normally. Avoid drinking very large amounts just before the test, as this can dilute your urine.",
            timing:
                "If possible, collect urine that has been in your bladder for a few hours, such as the first urine of the morning. Do not delay if your healthcare provider needs the sample urgently.",
            medication:
                "Ideally, the sample is collected before you start antibiotics, as antibiotics can stop bacteria growing in the laboratory. However, do not delay treatment you have been prescribed; follow your healthcare provider's advice, and tell them if you have already started antibiotics. Do not stop any prescribed medicine unless your healthcare provider tells you to.",
            other: [
                "Use only the sterile container provided by the laboratory, clinic or pharmacy. Other containers may contain bacteria or chemicals that affect the result.",
                "Wash your hands and clean around your genitals with water before collecting. Avoid antiseptics or wipes unless they are provided, as they may affect the culture."
            ]
        },
        sample: {
            type: "Urine",
            detail: "A midstream urine sample: urine collected from the middle part of the stream.",
            container:
                "A sterile, screw-top container. Some containers include a preservative, such as boric acid, which keeps the sample stable on the way to the laboratory. If yours has a fill line, fill it to that line."
        },
        collection: [
            "Wash your hands and clean around your genital area with water.",
            "Start passing urine into the toilet. Do not collect the first part of the stream.",
            "Without stopping the flow, collect the middle part of the stream in the sterile container.",
            "Finish passing urine into the toilet.",
            "Screw the lid on firmly, wash your hands, and label the container with the details requested.",
            "Return the sample as soon as possible, ideally within 2 hours. If there will be a delay, ask whether you should keep it in a fridge (not a freezer)."
        ],
        process: [
            "Microscopy: a small amount of urine is examined under a microscope, or by an automated analyser, to count cells and look for bacteria.",
            "Culture: urine is spread onto plates of nutrient gel (agar) and kept at body temperature, usually overnight.",
            "If bacteria grow in significant numbers, they are identified.",
            "Sensitivity: the bacteria are tested against antibiotics. This usually takes about another day.",
            "Because bacteria need time to grow, a full result typically takes 1 to 3 days."
        ],
        reporting: {
            text: [
                "Microscopy findings are usually reported first, sometimes on the same day.",
                "The culture result describes what grew and roughly how much. Common results include 'no growth', 'no significant growth', 'mixed growth' or the name of a specific organism.",
                "For each organism tested, antibiotics are listed as S (susceptible: likely to work), R (resistant: unlikely to work) or I. Depending on the standards the laboratory follows, I means 'intermediate' or 'susceptible, increased exposure' (likely to work at a higher dose)."
            ],
            units: [
                { parameter: "White blood cells", unit: "per µL, or per high-power field", plain: "The number of white cells in a set volume of urine, or in an area seen under the microscope." },
                { parameter: "Bacterial count", unit: "CFU/mL", plain: "Colony-forming units per millilitre: an estimate of the number of living bacteria in the urine." }
            ]
        },
        abnormal: [
            {
                finding: "Significant growth of one type of bacteria",
                meaning:
                    "Suggests a urinary tract infection, especially if you have symptoms. The sensitivity results help your healthcare provider choose or adjust an antibiotic."
            },
            {
                finding: "Mixed growth",
                meaning:
                    "Usually means the sample was contaminated by bacteria from the skin during collection, rather than an infection. A repeat sample, collected carefully, may be requested."
            },
            {
                finding: "White blood cells but no growth",
                meaning:
                    "May be caused by recent antibiotics, infections with organisms that don't grow on routine plates, or other causes of inflammation. Your healthcare provider may consider further tests."
            },
            {
                finding: "Bacteria but no symptoms",
                meaning:
                    "Common, especially in older adults and people with catheters, and often doesn't need treatment. Pregnancy is an important exception, where treatment is usually recommended."
            }
        ],
        keyPoints: [
            "How carefully the sample is collected strongly affects the result. Contamination is one of the most common reasons for a repeat request.",
            "Unlabelled, leaking or very delayed samples may be rejected by the laboratory.",
            "A urine dipstick gives a quick indication, but it cannot identify bacteria or show which antibiotics will work.",
            "Don't use leftover antibiotics or someone else's antibiotics. Taking the right antibiotic, as prescribed, helps prevent antibiotic resistance."
        ],
        review: { status: "draft", reviewedBy: "", date: "" }
    },

    /* ---------------- COAGULATION ---------------- */
    {
        id: "prothrombin-time-inr",
        name: "Prothrombin Time and INR",
        abbreviation: "PT/INR",
        aliases: ["PT", "INR", "PT/INR", "Prothrombin time", "Clotting test"],
        keywords: ["clotting", "coagulation", "bleeding", "warfarin", "anticoagulant", "blood thinner", "bruising", "coumadin"],
        category: "coagulation",
        popular: false,
        summary:
            "Measures how long it takes a sample of your blood to clot. The INR is a standardised version of the result that allows comparison between laboratories. It is the main test used to monitor treatment with warfarin.",
        why: [
            "To monitor people taking warfarin or similar medicines (vitamin K antagonists), to make sure the dose is right.",
            "To investigate unexplained bleeding or bruising.",
            "Before surgery or some procedures, in certain situations.",
            "To help assess the liver, because the liver makes most of the proteins needed for clotting."
        ],
        measures: [
            { name: "Prothrombin time (PT)", description: "The time, in seconds, that it takes your plasma to clot after specific reagents are added." },
            { name: "International Normalised Ratio (INR)", description: "Your PT compared with a normal PT, adjusted for the reagent used, so results from different laboratories can be compared." }
        ],
        preparation: {
            summary: "No fasting. If you take warfarin, take it as prescribed and note when you took your last dose.",
            fasting: {
                status: "not-required",
                text: "Fasting is not needed."
            },
            water: "You can drink water as normal.",
            timing:
                "If you take warfarin, try to have your INR checked at a similar time of day on each occasion, as advised by your anticoagulation clinic.",
            medication:
                "If you take warfarin, keep taking it exactly as prescribed. Tell the person taking your sample what dose you take and when you last took it. Do not stop or change any prescribed medicine unless your healthcare provider tells you to. Tell your healthcare provider about all other medicines, including antibiotics, herbal remedies and supplements, as many interact with warfarin.",
            other: [
                "If you take warfarin, try to keep your diet consistent. Big changes in how much vitamin K-rich food you eat, such as green leafy vegetables, can change your INR.",
                "Tell your healthcare provider about any recent illness, changes in how much alcohol you drink, or missed doses."
            ]
        },
        sample: {
            type: "Blood",
            detail: "A sample of blood from a vein, or a finger-prick sample for point-of-care testing.",
            container:
                "A tube containing sodium citrate, which stops the blood clotting by binding calcium. In many laboratories this tube has a light blue cap. It must be filled to the marked line."
        },
        collection: [
            "Blood is taken from a vein in your arm.",
            "The citrate tube must be filled to the correct level, because the ratio of blood to citrate affects the result. Under-filled tubes are usually rejected.",
            "The tube is gently turned upside down a few times to mix it. Clots in the sample make it unsuitable for testing.",
            "Many people on warfarin have their INR checked with a finger-prick device at a clinic, or at home. These devices give a result within minutes."
        ],
        process: [
            "The sample is spun in a centrifuge to separate the plasma.",
            "A reagent called thromboplastin, along with calcium, is added to the plasma at body temperature, and an analyser measures how many seconds it takes for a clot to form.",
            "The INR is calculated from the PT using a value specific to the reagent, called the International Sensitivity Index (ISI).",
            "Samples must be tested within the time limit set by the laboratory, because clotting proteins change if samples are kept too long."
        ],
        reporting: {
            text: [
                "PT is reported in seconds, next to the laboratory's reference interval.",
                "INR is reported as a ratio with no units. For people who are not taking warfarin, the INR is usually close to 1.",
                "For people taking warfarin, the INR is compared with a target range set by their healthcare provider for their condition, rather than the usual reference interval."
            ],
            units: [
                { parameter: "PT", unit: "seconds", plain: "The time taken for the plasma to clot." },
                { parameter: "INR", unit: "No unit", plain: "A ratio comparing your clotting time with a normal clotting time." }
            ]
        },
        abnormal: [
            {
                finding: "INR higher than expected, or above your target",
                meaning:
                    "Your blood is taking longer to clot. In people on warfarin, this may mean the dose is too high, or that diet, illness or another medicine has changed how it works, which increases the risk of bleeding. In people not on warfarin, causes include liver disease, vitamin K deficiency and some clotting factor deficiencies."
            },
            {
                finding: "INR below your target",
                meaning:
                    "In people on warfarin, the blood may be clotting too easily. This can happen if doses are missed, the dose is too low, or diet or other medicines have changed."
            }
        ],
        keyPoints: [
            "If you are told your INR is very high, or you notice unusual bleeding or bruising, contact your healthcare provider or anticoagulation clinic promptly.",
            "Newer blood thinners, such as apixaban, rivaroxaban, edoxaban and dabigatran, are not monitored with the INR.",
            "Your warfarin dose should only be changed on the advice of your healthcare provider or anticoagulation clinic.",
            "If you have an anticoagulant record book or alert card, carry it with you."
        ],
        review: { status: "draft", reviewedBy: "", date: "" }
    },

    /* ---------------- TUMOUR MARKERS ---------------- */
    {
        id: "prostate-specific-antigen",
        name: "Prostate-Specific Antigen",
        abbreviation: "PSA",
        aliases: ["PSA", "PSA test", "Prostate test", "Total PSA"],
        keywords: ["prostate", "prostate cancer", "tumour marker", "tumor marker", "urinary symptoms", "bph"],
        category: "tumour-markers",
        popular: false,
        summary:
            "Measures the level of prostate-specific antigen, a protein made by the prostate gland, in your blood. PSA can be raised by prostate cancer, but also by many common conditions that are not cancer.",
        why: [
            "To help investigate urinary symptoms, such as needing to pass urine often, a weak flow, or difficulty starting.",
            "To help assess the risk of prostate cancer, after discussing the benefits and limitations of the test with a healthcare provider.",
            "To monitor people who have been diagnosed with, or treated for, prostate cancer."
        ],
        measures: [
            { name: "Total PSA", description: "The total amount of PSA in the blood. Some laboratories may also measure 'free PSA' in particular situations." }
        ],
        preparation: {
            summary: "No fasting. Avoid ejaculation and vigorous exercise for 48 hours before the test.",
            fasting: {
                status: "not-required",
                text: "Fasting is not needed."
            },
            water: "You can drink water as normal.",
            timing: "The test can usually be done at any time of day.",
            medication:
                "Tell your healthcare provider if you take finasteride or dutasteride (used for an enlarged prostate or hair loss). These medicines lower PSA levels, which needs to be taken into account when interpreting the result. Do not stop any prescribed medicine unless your healthcare provider tells you to.",
            other: [
                "Avoid ejaculation for 48 hours before the test.",
                "Avoid vigorous exercise, especially cycling, for 48 hours before the test.",
                "Tell your healthcare provider if you have a urine infection. The test is usually postponed until some weeks after the infection has cleared.",
                "Tell your healthcare provider if you have had a prostate biopsy or other prostate procedure in the last six weeks, as this can raise PSA."
            ]
        },
        sample: {
            type: "Blood",
            detail: "A sample of blood from a vein.",
            container:
                "A tube that allows the serum to be separated. The cap colour depends on the laboratory and manufacturer."
        },
        collection: [
            "Blood is taken from a vein in your arm."
        ],
        process: [
            "The sample is spun in a centrifuge to separate the serum from the cells.",
            "PSA is measured using an immunoassay, which uses antibodies that recognise PSA.",
            "Different laboratories may use different PSA test methods, so where possible it is best to have repeat PSA tests at the same laboratory."
        ],
        reporting: {
            text: [
                "PSA is reported as a single number with its unit.",
                "Many laboratories use reference intervals or thresholds that vary with age, because PSA naturally rises as the prostate grows with age.",
                "When PSA is being monitored, the change over time is often as important as a single value."
            ],
            units: [
                { parameter: "PSA", unit: "ng/mL or µg/L", plain: "Nanograms per millilitre. 1 ng/mL is the same as 1 µg/L, so the number is identical in both units." }
            ]
        },
        abnormal: [
            {
                finding: "Raised PSA",
                meaning:
                    "Can be caused by an enlarged prostate (benign prostatic hyperplasia), inflammation or infection of the prostate, recent ejaculation or vigorous exercise, recent procedures, or prostate cancer. Most people with a raised PSA do not have prostate cancer. Further assessment may include a repeat test, an examination, a scan or a biopsy."
            },
            {
                finding: "PSA within the reference interval",
                meaning: "This is reassuring, but it does not completely rule out prostate cancer, because some cancers do not raise PSA."
            }
        ],
        keyPoints: [
            "The PSA test alone cannot diagnose prostate cancer.",
            "PSA testing has benefits and drawbacks, including the chance of finding slow-growing cancers that would never have caused harm. Discuss these with your healthcare provider before testing.",
            "Your risk of prostate cancer is higher if you are older, have a family history of prostate or breast cancer, or are of Black African or Black Caribbean ancestry.",
            "The test is relevant to anyone who has a prostate, including trans women and non-binary people assigned male at birth."
        ],
        review: { status: "draft", reviewedBy: "", date: "" }
    }
];

if (typeof module !== "undefined" && module.exports) {
    module.exports = PATIENTLAB_TESTS;
}
