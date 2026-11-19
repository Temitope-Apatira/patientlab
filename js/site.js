/* ------------------------------------------------------------
   PatientLab — behaviour shared by every page
   1. Mobile navigation menu
   2. "Expand all" for test information sections
   3. Open a section when a link points to it (e.g. #preparation)
   4. Print the full content, including closed sections
   ------------------------------------------------------------ */
(function () {
    /* 1. MOBILE NAVIGATION
       Without JavaScript the links are always visible. With it, small
       screens get a Menu button that shows and hides them. */
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("site-nav");

    if (toggle && nav) {
        toggle.hidden = false;

        function setMenu(open) {
            nav.classList.toggle("is-open", open);
            toggle.setAttribute("aria-expanded", String(open));
        }

        toggle.addEventListener("click", function () {
            setMenu(toggle.getAttribute("aria-expanded") !== "true");
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && nav.classList.contains("is-open")) {
                setMenu(false);
                toggle.focus();
            }
        });
    }

    /* 2. EXPAND / COLLAPSE ALL SECTIONS */
    const accordion = document.querySelector("[data-accordion]");
    const expandAll = document.querySelector("[data-expand-all]");

    if (accordion && expandAll) {
        const sections = Array.from(accordion.querySelectorAll("details"));
        expandAll.hidden = false;

        function allOpen() {
            return sections.every(function (d) { return d.open; });
        }

        function updateLabel() {
            expandAll.textContent = allOpen() ? "Collapse all sections" : "Expand all sections";
        }

        expandAll.addEventListener("click", function () {
            const open = !allOpen();
            sections.forEach(function (d) { d.open = open; });
            updateLabel();
        });

        // Keep the button label right when people open sections one by one
        sections.forEach(function (d) {
            d.addEventListener("toggle", updateLabel);
        });
        updateLabel();
    }

    /* 3. OPEN THE SECTION A LINK POINTS TO */
    function openTarget() {
        if (!location.hash) return;
        let target;
        try {
            target = document.querySelector(decodeURIComponent(location.hash));
        } catch (e) {
            return; // not a valid selector, ignore
        }
        const details = target && target.closest("details");
        if (details && !details.open) {
            details.open = true;
            target.scrollIntoView();
        }
    }
    openTarget();
    window.addEventListener("hashchange", openTarget);

    /* 4. PRINT: open every section so nothing is missed on paper */
    window.addEventListener("beforeprint", function () {
        document.querySelectorAll("details").forEach(function (d) { d.open = true; });
    });
})();
