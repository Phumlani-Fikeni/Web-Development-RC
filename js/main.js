/**
 * main.js
 * Central initialiser for all Part 3 functionality.
 * Each init function lives in script.js and quietly does nothing
 * when the page does not contain the elements it needs.
 * Author: Phumlani Fikeni - ST10526062
 */
document.addEventListener("DOMContentLoaded", function () {
    initAccordion();      // Display / hide toggles (Gallery on the Home page)
    initGallery();        // Builds the gallery from js/gallery-data.js
    initLightbox();       // Click-to-enlarge images
    initSearch();         // Menu search, filter and sort
    initEnquiryForm();    // Enquiry form: validation, AJAX and instant response
    initContactForm();    // Contact form: validation and compiled email
    initSEOHelpers();     // Lazy-loading, safe external links, scroll animation
});
