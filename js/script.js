function initSearch() {
    const searchInput = document.getElementById("menuSearch");
    const sortSelect = document.getElementById("menuSort");
    const menuSection = document.querySelector(".menu-section");

    if (!menuSection) return;

    const categories = Array.from(
        menuSection.querySelectorAll(".menu-category")
    );

    function filterMenu() {
        const query = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        categories.forEach(function (category) {
            const matches = category.textContent.toLowerCase().includes(query);
            category.hidden = !matches;
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", filterMenu);
    }

    if (sortSelect) {
        sortSelect.addEventListener("change", function () {
            const sortType = sortSelect.value;

            const getName = function (category) {
                const heading = category.querySelector("h3") ||
                                category.querySelector("h2");
                return heading ? heading.textContent.trim() : "";
            };

            const getPrice = function (category) {
                const price = category.querySelector(".price");
                if (!price) return Infinity;

                const match = price.textContent.match(/\d+(?:\.\d+)?/);
                return match ? Number(match[0]) : Infinity;
            };

            categories.sort(function (a, b) {
                if (sortType === "price-asc") {
                    return getPrice(a) - getPrice(b);
                }

                if (sortType === "price-desc") {
                    return getPrice(b) - getPrice(a);
                }

                if (sortType === "name") {
                    return getName(a).localeCompare(getName(b));
                }

                return categories.indexOf(a) - categories.indexOf(b);
            });

            categories.forEach(function (category) {
                menuSection.appendChild(category);
            });

            filterMenu();
        });
    }
}

// 2. Display or hide menu categories
function initDynamicContent() {
    const displayButton = document.getElementById("Display-menu");
    const menuCategories = document.querySelectorAll(".menu-category");

    if (!displayButton || !menuCategories.length) return;

    let isVisible = true;

    displayButton.addEventListener("click", function () {
        isVisible = !isVisible;

        menuCategories.forEach(function (category) {
            category.hidden = !isVisible;
        });

        displayButton.textContent = isVisible
            ? "HIDE MENU"
            : "DISPLAY MENU";
    });
}

// 3. Validate the contact form
function initContactForm() {
    const form = document.querySelector(".form-section form");

    if (!form || form.id === "enquiry-form") return;

    form.addEventListener("submit", function (event) {
        clearErrors(form);

        const name = form.querySelector('[name="contact-name"]');
        const email = form.querySelector('[name="contact-email"]');
        const message = form.querySelector('[name="contact-message"]');

        let valid = true;

        if (name && !name.value.trim()) {
            showError('[name="contact-name"]', "Please enter your name.");
            valid = false;
        }

        if (email && !isValidEmail(email.value.trim())) {
            showError(
                '[name="contact-email"]',
                "Please enter a valid email address."
            );
            valid = false;
        }

        if (message && !message.value.trim()) {
            showError(
                '[name="contact-message"]',
                "Please enter your message."
            );
            valid = false;
        }

        if (!valid) {
            event.preventDefault();
        } else {
            event.preventDefault();
            alert("Your details are valid. Connect this form to a backend or email service to send your message.");
        }
    });
}

// 4. Basic SEO and image-loading helper
function initSEOHelpers() {
    document.querySelectorAll("main img").forEach(function (img) {
        if (!img.hasAttribute("loading")) {
            img.setAttribute("loading", "lazy");
        }
    });
}