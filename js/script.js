/*
 * Part 3: Enhancing Functionality and SEO
 * Kwa Shumilensizwa Restaurant Website
 * Author: Phumlani Fikeni
 * Student number: ST10526062
 */

"use strict";

/* ---------- Settings (change these in ONE place) ---------- */

// The contact form compiles an email addressed to this recipient.
const CONTACT_EMAIL = "info@kwashumilensizwa.co.za";

// Trading hours: Monday to Saturday, closed on Sunday (getDay() === 0).
const OPEN_TIME = "08:45";
const CLOSE_TIME = "20:00";
const CLOSED_DAY = 0;


/* =========================================
   GOOGLE MAPS - KWA SHUMILENSIZWA
   ========================================= */

const RESTAURANT = {
    name: "Kwa Shumilensizwa",
    address: "130 Clark Road, Durban, KwaZulu-Natal",
    lat: -29.8562,
    lng: 30.9938
};

let restaurantMap;
let restaurantMarker;
let visitorMarker;
let nearbyMarkers = [];
let mapInfoWindow;

/* Initialise Google Maps */
async function initMap() {

    const { Map, InfoWindow } =
        await google.maps.importLibrary("maps");

    const { AdvancedMarkerElement } =
        await google.maps.importLibrary("marker");

    restaurantMap = new Map(
        document.getElementById("map"),
        {
            center: {
                lat: RESTAURANT.lat,
                lng: RESTAURANT.lng
            },

            zoom: 16,

            mapId: "DEMO_MAP_ID",

            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            zoomControl: true
        }
    );

    mapInfoWindow = new InfoWindow();

    /* Restaurant marker */
    restaurantMarker = new AdvancedMarkerElement({
        map: restaurantMap,
        position: {
            lat: RESTAURANT.lat,
            lng: RESTAURANT.lng
        },
        title: RESTAURANT.name
    });

    /* Restaurant information popup */
    restaurantMarker.addListener("click", function () {

        mapInfoWindow.setContent(`
            <div style="padding:10px">
                <h3>${RESTAURANT.name}</h3>
                <p>${RESTAURANT.address}</p>
                <a href="https://www.google.com/maps/dir/?api=1&destination=${RESTAURANT.lat},${RESTAURANT.lng}"
                   target="_blank"
                   rel="noopener noreferrer">
                   Get Directions
                </a>
            </div>
        `);

        mapInfoWindow.open({
            map: restaurantMap,
            anchor: restaurantMarker
        });

    });

    /* Location button */
    document.getElementById("locate-me")
        .addEventListener("click", locateVisitor);

    /* Nearby places button */
    document.getElementById("nearby-places")
        .addEventListener("click", findNearbyPlaces);

    document.getElementById("map-status").textContent =
        "Map loaded successfully. Select a feature to explore.";

}

/* =========================================
   FIND VISITOR LOCATION
   ========================================= */

function locateVisitor() {

    const status = document.getElementById("map-status");

    if (!navigator.geolocation) {
        status.textContent =
            "Your browser does not support location services.";
        return;
    }

    status.textContent = "Finding your location...";

    navigator.geolocation.getCurrentPosition(

        function (position) {

            const visitorPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            restaurantMap.setCenter(visitorPosition);
            restaurantMap.setZoom(16);

            if (visitorMarker) {
                visitorMarker.position = visitorPosition;
            } else {
                visitorMarker = new google.maps.marker.AdvancedMarkerElement({
                    map: restaurantMap,
                    position: visitorPosition,
                    title: "Your current location"
                });
            }

            /* Update directions using visitor coordinates */
            document.getElementById("directions-link").href =
                "https://www.google.com/maps/dir/?api=1" +
                "&origin=" + visitorPosition.lat + "," +
                visitorPosition.lng +
                "&destination=" + RESTAURANT.lat + "," +
                RESTAURANT.lng;

            status.textContent =
                "Your location has been found successfully.";

        },

        function (error) {

            const messages = {
                1: "Location permission was denied.",
                2: "Your location is currently unavailable.",
                3: "Location request timed out."
            };

            status.textContent =
                messages[error.code] ||
                "Unable to determine your location.";

        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );

}

/* =========================================
   FIND NEARBY PLACES
   ========================================= */

async function findNearbyPlaces() {

    const status = document.getElementById("map-status");

    status.textContent = "Searching for nearby places...";

    try {

        const { Place } =
            await google.maps.importLibrary("places");

        const { AdvancedMarkerElement } =
            await google.maps.importLibrary("marker");

        /* Remove previous nearby markers */
        nearbyMarkers.forEach(function (marker) {
            marker.map = null;
        });

        nearbyMarkers = [];

        const request = {

            fields: [
                "displayName",
                "location",
                "formattedAddress",
                "googleMapsURI"
            ],

            locationRestriction: {
                center: restaurantMap.getCenter(),
                radius: 1500
            },

            includedPrimaryTypes: [
                "restaurant",
                "cafe",
                "tourist_attraction"
            ],

            maxResultCount: 10

        };

        const { places } = await Place.searchNearby(request);

        if (!places || places.length === 0) {

            status.textContent =
                "No nearby places were found.";

            return;
        }

        const bounds = new google.maps.LatLngBounds();

        /* Include restaurant location */
        bounds.extend({
            lat: RESTAURANT.lat,
            lng: RESTAURANT.lng
        });

        places.forEach(function (place) {

            if (!place.location) return;

            const marker = new AdvancedMarkerElement({

                map: restaurantMap,

                position: place.location,

                title: place.displayName

            });

            marker.addListener("click", function () {

                const content = document.createElement("div");

                const heading = document.createElement("h3");
                heading.textContent = place.displayName;

                const address = document.createElement("p");
                address.textContent =
                    place.formattedAddress || "Address unavailable";

                content.append(heading, address);

                if (place.googleMapsURI) {

                    const link = document.createElement("a");
                    link.href = place.googleMapsURI;
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                    link.textContent = "View on Google Maps";

                    content.appendChild(link);

                }

                mapInfoWindow.setContent(content);

                mapInfoWindow.open({
                    map: restaurantMap,
                    anchor: marker
                });

            });

            nearbyMarkers.push(marker);

            bounds.extend(place.location);

        });

        restaurantMap.fitBounds(bounds);

        status.textContent =
            places.length + " nearby places found. Click a marker to explore.";

    } catch (error) {

        console.error("Nearby search error:", error);

        status.textContent =
            "Nearby search failed. Check your API key and Places API settings.";

    }

}


/* ---------- Shared helpers ---------- */

function createEl(tag, text, className) {
    const element = document.createElement(tag);
    if (text !== undefined && text !== null) element.textContent = text;
    if (className) element.className = className;
    return element;
}

function showFieldError(field, message) {
    if (!field) return;

    const error = createEl("small", message, "error-message");
    error.id = (field.id || field.name || "field") + "-error";

    field.setAttribute("aria-invalid", "true");
    field.setAttribute("aria-describedby", error.id);
    field.insertAdjacentElement("afterend", error);
}

function clearFieldErrors(form) {
    form.querySelectorAll(".error-message").forEach(function (item) {
        item.remove();
    });

    form.querySelectorAll('[aria-invalid="true"]').forEach(function (field) {
        field.removeAttribute("aria-invalid");
        field.removeAttribute("aria-describedby");
    });
}

function setStatus(element, message, isSuccess) {
    if (!element) return;

    element.textContent = message;
    element.classList.remove("status-success", "status-error");

    if (message) {
        element.classList.add(isSuccess ? "status-success" : "status-error");
    }
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

// Accepts South African mobile and landline numbers, e.g.
// 078 309 5443, 0783095443, +27783095443, 031 123 4567.
function isValidSAPhone(value) {
    const digits = value.replace(/[\s()-]/g, "");
    return /^(\+27|0)[1-9]\d{8}$/.test(digits);
}

function isValidName(value) {
    return /^[A-Za-z\u00C0-\u024F][A-Za-z\u00C0-\u024F' .-]{1,59}$/.test(value);
}

function todayISO() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return now.getFullYear() + "-" + month + "-" + day;
}

function dateFromISO(value) {
    // Noon avoids time-zone rounding moving the date to another day.
    return new Date(value + "T12:00:00");
}

function minutesFromTime(value) {
    const parts = value.split(":");
    return Number(parts[0]) * 60 + Number(parts[1]);
}

function focusFirstInvalid(form) {
    const first = form.querySelector('[aria-invalid="true"]');
    if (first) first.focus();
}

/* ---------- 1. Accordion (Display / Hide toggle) ---------- */
/*
 * Markup used on Home.html:
 * <button class="accordion-toggle" aria-expanded="false"
 *         aria-controls="gallery-panel"
 *         data-label-closed="DISPLAY GALLERY"
 *         data-label-open="HIDE GALLERY">...</button>
 * <div id="gallery-panel" class="accordion-panel" hidden>...</div>
 *
 * The panel starts hidden in the HTML itself, so there is no flash of
 * content before JavaScript runs.
 */

function initAccordion() {
    document.querySelectorAll(".accordion-toggle").forEach(function (button) {
        const panel = document.getElementById(
            button.getAttribute("aria-controls")
        );

        if (!panel) return;

        const label = button.querySelector(".accordion-label");
        const icon = button.querySelector(".accordion-icon");

        function setOpen(open) {
            panel.hidden = !open;
            button.setAttribute("aria-expanded", String(open));

            if (label) {
                label.textContent = open
                    ? button.dataset.labelOpen
                    : button.dataset.labelClosed;
            }

            if (icon) icon.textContent = open ? "\u2212" : "+";

            if (open) {
                panel.dispatchEvent(new CustomEvent("accordion-open"));
            }
        }

        // Always start closed.
        setOpen(false);

        button.addEventListener("click", function () {
            setOpen(button.getAttribute("aria-expanded") !== "true");
        });
    });
}

/* ---------- 2. Dynamic gallery (built with JavaScript) ---------- */

function createMealCard(item) {
    const card = createEl("article", null, "meal-card");

    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.alt;
    image.loading = "lazy";
    image.decoding = "async";

    const price = createEl("p", item.price, "price");

    const link = createEl("a", item.cta, "button");
    link.href = "enquiry.html";

    card.append(
        image,
        createEl("h3", item.name),
        createEl("p", item.description),
        price,
        link
    );

    prepareLightboxImage(image);

    return card;
}

function initGallery() {
    const grid = document.getElementById("gallery-grid");
    const panel = document.getElementById("gallery-panel");

    if (!grid || !panel) return;

    if (typeof MEAL_GALLERY === "undefined" || !MEAL_GALLERY.length) {
        grid.appendChild(
            createEl(
                "p",
                "The gallery could not be loaded. Please view our full menu instead."
            )
        );
        return;
    }

    let built = false;

    // Cards (and their images) are only created the first time the
    // visitor opens the gallery. This keeps the first page load light.
    panel.addEventListener("accordion-open", function () {
        if (built) return;
        built = true;

        const fragment = document.createDocumentFragment();

        MEAL_GALLERY.forEach(function (item) {
            fragment.appendChild(createMealCard(item));
        });

        grid.appendChild(fragment);
    });
}

/* ---------- 3. Image lightbox ---------- */

const LIGHTBOX_SELECTOR =
    "main .menu-item img, main .meal-card img, main .about-image img";

function prepareLightboxImage(image) {
    image.classList.add("lightbox-image");
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", "Enlarge " + (image.alt || "image"));
}

function initLightbox() {
    document.querySelectorAll(LIGHTBOX_SELECTOR).forEach(prepareLightboxImage);

    const lightbox = document.createElement("dialog");
    lightbox.className = "image-lightbox";
    lightbox.setAttribute("aria-label", "Enlarged food image");

    const enlargedImage = document.createElement("img");
    const caption = createEl("p", "", "lightbox-caption");

    const closeButton = createEl("button", "Close image", "button");
    closeButton.type = "button";

    lightbox.append(enlargedImage, caption, closeButton);
    document.body.appendChild(lightbox);

    function openImage(image) {
        enlargedImage.src = image.currentSrc || image.src;
        enlargedImage.alt = image.alt || "Enlarged restaurant image";
        caption.textContent = image.alt || "";

        if (typeof lightbox.showModal === "function") {
            lightbox.showModal();
        } else {
            lightbox.setAttribute("open", "");
        }
    }

    function closeImage() {
        if (typeof lightbox.close === "function") {
            lightbox.close();
        } else {
            lightbox.removeAttribute("open");
        }
    }

    // Event delegation: also works for images added later by JavaScript.
    document.addEventListener("click", function (event) {
        if (!(event.target instanceof Element)) return;

        const image = event.target.closest(LIGHTBOX_SELECTOR);
        if (image) openImage(image);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key !== "Enter" && event.key !== " ") return;
        if (!(event.target instanceof Element)) return;

        if (event.target.matches(LIGHTBOX_SELECTOR)) {
            event.preventDefault();
            openImage(event.target);
        }
    });

    closeButton.addEventListener("click", closeImage);

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) closeImage();
    });
}



/* ---------- 5. Search, filter and sort menu ---------- */

function initSearch() {
    const searchInput = document.getElementById("menuSearch");
    const sortSelect = document.getElementById("menuSort");
    const menuSection = document.querySelector(".menu-section");
    const results = document.getElementById("menu-results");

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

        let visible = 0;

        ordered.forEach(function (category) {
            menuSection.appendChild(category);

            const matches = category.textContent.toLowerCase().includes(query);

            category.hidden = !matches;
            if (matches) visible += 1;
        });

        if (results) {
            if (visible === 0) {
                results.textContent =
                    'No meals match "' + searchInput.value.trim() + '". Try another word.';
            } else if (query) {
                results.textContent =
                    visible + (visible === 1 ? " category found." : " categories found.");
            } else {
                results.textContent = "";
            }
        }
    }

    if (searchInput) searchInput.addEventListener("input", updateMenu);
    if (sortSelect) sortSelect.addEventListener("change", updateMenu);

    updateMenu();
}

/* ---------- 6. Enquiry form: validation, AJAX and instant response ---------- */

function validateEnquiry(form) {
    const field = function (name) {
        return form.elements[name];
    };

    const name = field("name");
    const email = field("email");
    const phone = field("phone");
    const type = field("enquiry-type");
    const meal = field("meal");
    const quantity = field("quantity");
    const date = field("date");
    const time = field("time");
    const message = field("message");

    let valid = true;

    function fail(input, text) {
        showFieldError(input, text);
        valid = false;
    }

    if (!name.value.trim()) {
        fail(name, "Please enter your full name.");
    } else if (!isValidName(name.value.trim())) {
        fail(name, "Use letters only (2 to 60 characters).");
    }

    if (!email.value.trim()) {
        fail(email, "Please enter your email address.");
    } else if (!isValidEmail(email.value.trim())) {
        fail(email, "Enter a valid email address, e.g. name@example.com.");
    }

    if (!phone.value.trim()) {
        fail(phone, "Please enter your phone number.");
    } else if (!isValidSAPhone(phone.value)) {
        fail(phone, "Enter a valid South African number, e.g. 078 309 5443.");
    }

    if (!type.value) {
        fail(type, "Please choose the type of enquiry.");
    }

    if (type.value === "food-order" && !meal.value) {
        fail(meal, "Please choose a meal for your order.");
    }

    if (quantity.value.trim()) {
        const amount = Number(quantity.value);

        if (!Number.isInteger(amount) || amount < 1 || amount > 50) {
            fail(quantity, "Quantity must be a whole number from 1 to 50.");
        }
    } else if (type.value === "food-order" && meal.value) {
        fail(quantity, "Please enter how many meals you would like.");
    }

    if (date.value) {
        const chosen = dateFromISO(date.value);

        if (Number.isNaN(chosen.getTime())) {
            fail(date, "Enter a valid date.");
        } else if (date.value < todayISO()) {
            fail(date, "The preferred date cannot be in the past.");
        } else if (chosen.getDay() === CLOSED_DAY) {
            fail(date, "We are closed on Sundays. Please choose Monday to Saturday.");
        }
    }

    if (time.value) {
        const minutes = minutesFromTime(time.value);

        if (minutes < minutesFromTime(OPEN_TIME) ||
            minutes >= minutesFromTime(CLOSE_TIME)) {
            fail(time, "Please choose a time between " + OPEN_TIME + " and " + CLOSE_TIME + ".");
        } else if (date.value === todayISO()) {
            const now = new Date();

            if (minutes <= now.getHours() * 60 + now.getMinutes()) {
                fail(time, "That time has already passed today.");
            }
        }
    }

    const text = message.value.trim();

    if (!text) {
        fail(message, "Please tell us how we can help.");
    } else if (text.length < 10) {
        fail(message, "Please write at least 10 characters.");
    } else if (text.length > 1000) {
        fail(message, "Please keep your message under 1000 characters.");
    }

    return valid;
}

// Turns the validated form into a response about cost and availability.
function buildEnquiryResponse(form) {
    const name = form.elements.name.value.trim().split(/\s+/)[0];
    const email = form.elements.email.value.trim();
    const type = form.elements["enquiry-type"].value;
    const mealSelect = form.elements.meal;
    const quantityValue = form.elements.quantity.value.trim();
    const date = form.elements.date.value;
    const time = form.elements.time.value;

    const lines = [];
    const selected = mealSelect.options[mealSelect.selectedIndex];
    const price = selected ? Number(selected.dataset.price) : NaN;
    const quantity = quantityValue ? Number(quantityValue) : 1;

    // Cost
    if (selected && selected.value && !Number.isNaN(price)) {
        const mealName = selected.textContent.split(" - ")[0];
        const total = price * quantity;

        lines.push(
            "Estimated cost: " + quantity + " \u00D7 " + mealName +
            " at R" + price + " = R" + total + "."
        );
    } else if (selected && selected.value === "other") {
        lines.push(
            "Cost: for several or mixed items we will add up your total and confirm it when we reply."
        );
    } else if (type === "menu-enquiry") {
        lines.push(
            "Cost: all of our meal prices are listed on the Menu page."
        );
    }

    // Availability
    if (date) {
        const readable = dateFromISO(date).toLocaleDateString("en-ZA", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        lines.push(
            "Availability: your preferred day, " + readable +
            (time ? " at " + time : "") +
            ", falls within our trading hours. We will confirm your meal is available when we reply."
        );
    } else {
        lines.push(
            "Availability: we are open Monday to Saturday, " + OPEN_TIME +
            " to " + CLOSE_TIME + ", and closed on Sundays."
        );
    }

    if (type === "catering") {
        lines.push(
            "Catering: large orders are reviewed individually, so we will contact you with a quote."
        );
    }

    lines.push(
        "Prices come from our menu and may change. We will confirm your final total and availability by replying to " + email + "."
    );

    return {
        heading: "Thank you, " + name + ". Here is the response to your enquiry",
        lines: lines
    };
}

function showEnquiryResponse(container, response) {
    container.replaceChildren();

    container.appendChild(createEl("h3", response.heading));

    const list = document.createElement("ul");

    response.lines.forEach(function (line) {
        list.appendChild(createEl("li", line));
    });

    container.appendChild(list);
    container.hidden = false;
}

function initEnquiryForm() {
    const form = document.getElementById("enquiry-form");

    if (!form) return;

    const status = document.getElementById("form-status");
    const responseBox = document.getElementById("enquiry-response");
    const submitButton = form.querySelector('[type="submit"]');

    // The date picker cannot select past dates.
    if (form.elements.date) form.elements.date.min = todayISO();

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        clearFieldErrors(form);
        setStatus(status, "", true);

        if (responseBox) responseBox.hidden = true;

        // Spam trap: real visitors never see or fill this field.
        if (form.elements.website && form.elements.website.value) return;

        if (!validateEnquiry(form)) {
            setStatus(status, "Please correct the highlighted fields.", false);
            focusFirstInvalid(form);
            return;
        }

        const originalText = submitButton ? submitButton.textContent : "";

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";
        }

        const response = buildEnquiryResponse(form);

        try {
            // AJAX: send the data in the background without reloading the page.
            // no-cors is used because the Google Apps Script does not send
            // CORS headers, so the browser cannot read its reply.
            await fetch(form.action, {
                method: "POST",
                mode: "no-cors",
                body: new URLSearchParams(new FormData(form))
            });

            setStatus(status, "Your enquiry has been submitted.", true);

            if (responseBox) {
                showEnquiryResponse(responseBox, response);
                responseBox.focus();
            }

            form.reset();
        } catch (error) {
            console.error("Enquiry submission error:", error);

            setStatus(
                status,
                "We could not send your enquiry. Please try again or call 078 309 5443.",
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

/* ---------- 7. Contact form: validation and compiled email ---------- */

function validateContact(form) {
    const name = form.elements["contact-name"];
    const email = form.elements["contact-email"];
    const phone = form.elements["contact-phone"];
    const type = form.elements["contact-type"];
    const message = form.elements["contact-message"];

    let valid = true;

    function fail(input, text) {
        showFieldError(input, text);
        valid = false;
    }

    if (!name.value.trim()) {
        fail(name, "Please enter your full name.");
    } else if (!isValidName(name.value.trim())) {
        fail(name, "Use letters only (2 to 60 characters).");
    }

    if (!email.value.trim()) {
        fail(email, "Please enter your email address.");
    } else if (!isValidEmail(email.value.trim())) {
        fail(email, "Enter a valid email address, e.g. name@example.com.");
    }

    // Phone is optional, but must be valid when it is filled in.
    if (phone.value.trim() && !isValidSAPhone(phone.value)) {
        fail(phone, "Enter a valid South African number, e.g. 078 309 5443.");
    }

    if (!type.value) {
        fail(type, "Please choose the type of message.");
    }

    const text = message.value.trim();

    if (!text) {
        fail(message, "Please enter your message.");
    } else if (text.length < 10) {
        fail(message, "Please write at least 10 characters.");
    } else if (text.length > 1000) {
        fail(message, "Please keep your message under 1000 characters.");
    }

    return valid;
}

function compileEmail(form) {
    const name = form.elements["contact-name"].value.trim();
    const email = form.elements["contact-email"].value.trim();
    const phone = form.elements["contact-phone"].value.trim();
    const typeSelect = form.elements["contact-type"];
    const typeLabel = typeSelect.options[typeSelect.selectedIndex].textContent;
    const message = form.elements["contact-message"].value.trim();

    const subject = typeLabel + " - website message from " + name;

    const body = [
        "Hello Kwa Shumilensizwa,",
        "",
        message,
        "",
        "--",
        "Name: " + name,
        "Email: " + email,
        "Phone: " + (phone || "Not provided"),
        "Message type: " + typeLabel,
        "Sent from the Kwa Shumilensizwa website contact form."
    ].join("\r\n");

    return { to: CONTACT_EMAIL, subject: subject, body: body };
}

function initContactForm() {
    const form = document.getElementById("contact-form");

    if (!form) return;

    const status = document.getElementById("contact-status");
    const preview = document.getElementById("email-preview");
    const editButton = document.getElementById("email-edit");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        clearFieldErrors(form);
        setStatus(status, "", true);

        if (preview) preview.hidden = true;

        // Spam trap: real visitors never see or fill this field.
        if (form.elements.website && form.elements.website.value) return;

        if (!validateContact(form)) {
            setStatus(status, "Please correct the highlighted fields.", false);
            focusFirstInvalid(form);
            return;
        }

        const email = compileEmail(form);

        document.getElementById("email-to").textContent = email.to;
        document.getElementById("email-subject").textContent = email.subject;
        document.getElementById("email-body").textContent = email.body;

        document.getElementById("email-send").href =
            "mailto:" + email.to +
            "?subject=" + encodeURIComponent(email.subject) +
            "&body=" + encodeURIComponent(email.body);

        preview.hidden = false;
        preview.focus();

        setStatus(
            status,
            "Your email is ready. Check it below, then press Send Email.",
            true
        );
    });

    if (editButton) {
        editButton.addEventListener("click", function () {
            preview.hidden = true;
            setStatus(status, "", true);
            form.elements["contact-name"].focus();
        });
    }
}

/* ---------- 8. SEO, performance and security helpers ---------- */

function initSEOHelpers() {
    // Images below the fold load only when needed (page speed).
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

    // Links that open a new tab must not give that tab access to this page.
    document.querySelectorAll('a[target="_blank"]').forEach(function (link) {
        link.setAttribute("rel", "noopener noreferrer");
    });

    // Scroll animation for cards that already exist in the HTML.
    const animatedElements = document.querySelectorAll(
        ".menu-item, .contact-card, .review"
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
