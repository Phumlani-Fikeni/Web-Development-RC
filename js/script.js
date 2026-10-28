/*
 * Part 3: Enhancing Functionality and SEO
 * Kwa Shumilensizwa Restaurant Website
 * Author: Phumlani Fikeni
 * Student number: ST10526062
 */

"use strict";

/* ---------- Shared form helpers ---------- */

function part3ShowError(field, message) {
    if (!field) return;

    field.setAttribute("aria-invalid", "true");

    const error = document.createElement("small");
    error.className = "error-message";
    error.style.color = "#c0392b";
    error.style.display = "block";
    error.style.marginTop = "5px";
    error.textContent = message;

    field.insertAdjacentElement("afterend", error);
}

function part3ClearErrors(form) {
    if (!form) return;

    form.querySelectorAll(".error-message").forEach(function (item) {
        item.remove();
    });

    form.querySelectorAll('[aria-invalid="true"]').forEach(function (field) {
        field.removeAttribute("aria-invalid");
    });
}

function part3ValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function part3SetStatus(element, message, success) {
    if (!element) return;

    element.textContent = message;
    element.style.color = success ? "green" : "#c0392b";
    element.setAttribute("role", "status");
    element.setAttribute("aria-live", "polite");
}

/* ---------- 1. Menu accordion/toggle ---------- */

function initAccordion() {
    const button = document.getElementById("Display-menu");
    const categories = document.querySelectorAll(".menu-category");

    if (!button || !categories.length) return;

    button.setAttribute("aria-expanded", "true");

    button.addEventListener("click", function () {
        const expanded = button.getAttribute("aria-expanded") === "true";
        const shouldShow = !expanded;

        categories.forEach(function (category) {
            category.hidden = !shouldShow;
        });

        button.setAttribute("aria-expanded", String(shouldShow));
        button.textContent = shouldShow ? "HIDE MENU" : "DISPLAY MENU";
    });
}

/* ---------- 2. Tabs ---------- */
/*
 * Optional HTML format:
 * <button data-tab="menu">Menu</button>
 * <section data-tab-panel="menu">...</section>
 */

function initTabs() {
    const tabButtons = document.querySelectorAll("[data-tab]");
    const panels = document.querySelectorAll("[data-tab-panel]");

    if (!tabButtons.length || !panels.length) return;

    function activateTab(tabName) {
        tabButtons.forEach(function (button) {
            const active = button.dataset.tab === tabName;
            button.setAttribute("aria-selected", String(active));
            button.classList.toggle("active", active);
        });

        panels.forEach(function (panel) {
            panel.hidden = panel.dataset.tabPanel !== tabName;
        });
    }

    tabButtons.forEach(function (button) {
        button.setAttribute("role", "tab");

        button.addEventListener("click", function () {
            activateTab(button.dataset.tab);
        });
    });

    activateTab(tabButtons[0].dataset.tab);
}

/* ---------- 3. Modal windows ---------- */
/*
 * Add data-modal-open="example-modal" to an opening button.
 * Give the modal element id="example-modal".
 * Add data-modal-close to a close button inside it.
 */

function initModal() {
    document.querySelectorAll("[data-modal-open]").forEach(function (button) {
        button.addEventListener("click", function () {
            const modal = document.getElementById(
                button.dataset.modalOpen
            );

            if (!modal) return;

            if (typeof modal.showModal === "function") {
                modal.showModal();
            } else {
                modal.hidden = false;
            }
        });
    });

    document.querySelectorAll("[data-modal-close]").forEach(function (button) {
        button.addEventListener("click", function () {
            const modal = button.closest("dialog, [data-modal]");

            if (!modal) return;

            if (typeof modal.close === "function") {
                modal.close();
            } else {
                modal.hidden = true;
            }
        });
    });
}

/* ---------- 4. Image lightbox ---------- */

function initLightbox() {
    const images = document.querySelectorAll(
        "main .menu-item img, main .meal-card img, main .about-image img"
    );

    if (!images.length) return;

    const lightbox = document.createElement("dialog");
    lightbox.className = "image-lightbox";
    lightbox.setAttribute("aria-label", "Enlarged food image");

    const enlargedImage = document.createElement("img");
    enlargedImage.alt = "";

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.textContent = "Close image";
    closeButton.className = "button";

    lightbox.append(enlargedImage, closeButton);
    document.body.appendChild(lightbox);

    images.forEach(function (image) {
        image.style.cursor = "zoom-in";
        image.tabIndex = 0;
        image.setAttribute("aria-label", "Enlarge " + (image.alt || "image"));

        function openImage() {
            enlargedImage.src = image.currentSrc || image.src;
            enlargedImage.alt = image.alt || "Enlarged restaurant image";

            if (typeof lightbox.showModal === "function") {
                lightbox.showModal();
            }
        }

        image.addEventListener("click", openImage);

        image.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openImage();
            }
        });
    });

    closeButton.addEventListener("click", function () {
        lightbox.close();
    });

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) lightbox.close();
    });
}

/* ---------- 5. Map helper ---------- */
/* The contact page already contains a Google Maps iframe. */

function initMap() {
    const map = document.getElementById("map");

    if (!map) return;

    map.setAttribute("loading", "lazy");
    map.setAttribute("title", "Kwa Shumilensizwa restaurant location");
}

/* ---------- 6. Dynamic menu display ---------- */

function initDynamicContent() {
    const button = document.getElementById("Display-menu");
    const categories = document.querySelectorAll(".menu-category");

    if (!button || !categories.length) return;

    // Filtering and sorting are handled by initSearch().
    // The menu toggle is handled by initAccordion().
    categories.forEach(function (category) {
        if (category.hidden === undefined) {
            category.hidden = false;
        }
    });
}

/* ---------- 7. Search, filter and sort menu ---------- */

function initSearch() {
    const searchInput = document.getElementById("menuSearch");
    const sortSelect = document.getElementById("menuSort");
    const menuSection = document.querySelector(".menu-section");

    if (!menuSection) return;

    const categories = Array.from(
        menuSection.querySelectorAll(".menu-category")
    );

    if (!categories.length) return;

    // Save the original order so it can be restored.
    const originalOrder = new Map();

    categories.forEach(function (category, index) {
        originalOrder.set(category, index);
    });

    function getCategoryName(category) {
        const heading = category.querySelector("h2, h3");
        return heading ? heading.textContent.trim() : "";
    }

    function getCategoryPrice(category) {
        const priceElement = category.querySelector(".price");

        if (!priceElement) return null;

        const match = priceElement.textContent.match(
            /R\s*([0-9]+(?:\.[0-9]{1,2})?)/i
        );

        return match ? Number(match[1]) : null;
    }

    function updateMenu() {
        const query = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        const sortValue = sortSelect ? sortSelect.value : "default";

        const ordered = categories.slice();

        ordered.sort(function (a, b) {
            if (sortValue === "name") {
                return getCategoryName(a).localeCompare(getCategoryName(b));
            }

            if (sortValue === "price-asc" || sortValue === "price-desc") {
                const priceA = getCategoryPrice(a);
                const priceB = getCategoryPrice(b);

                // Items without a listed price remain at the bottom.
                if (priceA === null && priceB === null) return 0;
                if (priceA === null) return 1;
                if (priceB === null) return -1;

                return sortValue === "price-asc"
                    ? priceA - priceB
                    : priceB - priceA;
            }

            return originalOrder.get(a) - originalOrder.get(b);
        });

        ordered.forEach(function (category) {
            menuSection.appendChild(category);

            const matches = category.textContent
                .toLowerCase()
                .includes(query);

            category.hidden = !matches;
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", updateMenu);
    }

    if (sortSelect) {
        sortSelect.addEventListener("change", updateMenu);
    }

    updateMenu();
}

/* ---------- 8. Enquiry form validation and AJAX ---------- */

function initEnquiryForm() {
    const form = document.getElementById("enquiry-form");

    if (!form) return;

    let status = document.getElementById("enquiry-status");

    if (!status) {
        status = document.createElement("p");
        status.id = "enquiry-status";
        status.setAttribute("role", "status");
        status.setAttribute("aria-live", "polite");
        form.appendChild(status);
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        part3ClearErrors(form);
        part3SetStatus(status, "", true);

        const name = form.querySelector('[name="name"]');
        const email = form.querySelector('[name="email"]');
        const phone = form.querySelector('[name="phone"]');
        const message = form.querySelector(
            '[name="message"], [name="enquiry-message"]'
        );

        let valid = true;

        if (name && !name.value.trim()) {
            part3ShowError(name, "Please enter your full name.");
            valid = false;
        }

        if (email && !part3ValidEmail(email.value.trim())) {
            part3ShowError(email, "Please enter a valid email address.");
            valid = false;
        }

        if (phone && phone.value.trim()) {
            const digits = phone.value.replace(/[\s()-]/g, "");
            const validPhone = /^(\+27|0)[6-8]\d{8}$/.test(digits);

            if (!validPhone) {
                part3ShowError(
                    phone,
                    "Enter a valid South African mobile number."
                );
                valid = false;
            }
        }

        if (message && !message.value.trim()) {
            part3ShowError(message, "Please describe your enquiry.");
            valid = false;
        }

        if (!form.checkValidity()) {
            form.reportValidity();
            valid = false;
        }

        if (!valid) {
            part3SetStatus(
                status,
                "Please correct the highlighted fields.",
                false
            );
            return;
        }

        /*
         * Use the form's existing Google Apps Script URL.
         * Its deployment must accept POST requests and save the submitted
         * fields. With no-cors, the browser cannot read the server response.
         */
        if (!form.action || form.action === window.location.href ||
            form.action.endsWith("#")) {
            part3SetStatus(
                status,
                "The enquiry service is not configured. Please contact the restaurant directly.",
                false
            );
            return;
        }

        const submitButton = form.querySelector('[type="submit"]');
        const originalText = submitButton ? submitButton.textContent : "";

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";
        }

        try {
            await fetch(form.action, {
                method: "POST",
                mode: "no-cors",
                body: new URLSearchParams(new FormData(form))
            });

            part3SetStatus(
                status,
                "Your enquiry request was submitted. Because the service does not return a readable response, please contact us directly if you need to confirm receipt.",
                true
            );

            form.reset();
        } catch (error) {
            console.error("Enquiry submission error:", error);

            part3SetStatus(
                status,
                "We could not submit the request. Please try again or contact the restaurant directly.",
                false
            );
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        }
    });
}

/* ---------- 9. Contact form validation and AJAX ---------- */

function initContactForm() {
    const form = document.querySelector(
        ".form-section form:not(#enquiry-form)"
    );

    if (!form) return;

    let status = document.getElementById("contact-status");

    if (!status) {
        status = document.createElement("p");
        status.id = "contact-status";
        status.setAttribute("role", "status");
        status.setAttribute("aria-live", "polite");
        form.appendChild(status);
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        part3ClearErrors(form);

        const name = form.querySelector('[name="contact-name"]');
        const email = form.querySelector('[name="contact-email"]');
        const phone = form.querySelector('[name="contact-phone"]');
        const message = form.querySelector('[name="contact-message"]');

        let valid = true;

        if (!name || !name.value.trim()) {
            part3ShowError(name, "Please enter your full name.");
            valid = false;
        }

        if (!email || !part3ValidEmail(email.value.trim())) {
            part3ShowError(email, "Please enter a valid email address.");
            valid = false;
        }

        if (phone && phone.value.trim()) {
            const digits = phone.value.replace(/[\s()-]/g, "");

            if (!/^(\+27|0)[6-8]\d{8}$/.test(digits)) {
                part3ShowError(
                    phone,
                    "Enter a valid South African mobile number."
                );
                valid = false;
            }
        }

        if (!message || !message.value.trim()) {
            part3ShowError(message, "Please enter your message.");
            valid = false;
        }

        if (!form.checkValidity()) {
            form.reportValidity();
            valid = false;
        }

        if (!valid) {
            part3SetStatus(
                status,
                "Please correct the highlighted fields.",
                false
            );
            return;
        }

        /*
         * FormSubmit provides an external email service.
         * The recipient must activate the service before relying on it.
         */
        const emailEndpoint =
            "https://formsubmit.co/ajax/info@kwashumilensizwa.co.za";

        const submitButton = form.querySelector('[type="submit"]');
        const originalText = submitButton ? submitButton.textContent : "";

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }

        try {
            const formData = new FormData(form);
            const payload = {};

            formData.forEach(function (value, key) {
                payload[key] = value;
            });

            payload._subject = "Website contact enquiry - Kwa Shumilensizwa";

            const response = await fetch(emailEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("The email service returned an error.");
            }

            const result = await response.json();

            if (result.success === "false" || result.success === false) {
                throw new Error("The email service did not accept the message.");
            }

            part3SetStatus(
                status,
                "Your message was accepted by the email service.",
                true
            );

            form.reset();
        } catch (error) {
            console.error("Contact form error:", error);

            part3SetStatus(
                status,
                "We could not confirm delivery. Please try again or email info@kwashumilensizwa.co.za directly.",
                false
            );
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        }
    });
}

/* ---------- 10. SEO and performance helpers ---------- */

function initSEOHelpers() {
    document.querySelectorAll("main img").forEach(function (image) {
        if (!image.hasAttribute("loading")) {
            image.setAttribute("loading", "lazy");
        }

        if (!image.hasAttribute("decoding")) {
            image.setAttribute("decoding", "async");
        }

        // Preserve the HTML alt text: do not invent descriptions automatically.
        if (!image.hasAttribute("alt")) {
            image.setAttribute("alt", "");
        }
    });

    // Add a class that can be used for optional CSS scroll animations.
    const animatedElements = document.querySelectorAll(
        ".meal-card, .menu-item, .contact-card, .review"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(function (element) {
            element.classList.add("reveal-on-scroll");
            observer.observe(element);
        });
    } else {
        animatedElements.forEach(function (element) {
            element.classList.add("is-visible");
        });
    }
}