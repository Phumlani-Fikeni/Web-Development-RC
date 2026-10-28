/**
 * main.js
 * Central initialiser for all Part 3 functionality.
 * Author: Phumlani Fikeni - ST10526062
 */

document.addEventListener('DOMContentLoaded', function () {

  // Interactive components
  if (typeof initAccordion === 'function') initAccordion();
  if (typeof initTabs === 'function') initTabs();
  if (typeof initModal === 'function') initModal();

  // Gallery lightbox
  if (typeof initLightbox === 'function') initLightbox();

  // Map (only on contact page)
  if (typeof initMap === 'function' && document.getElementById('map')) initMap();

  // Dynamic products + search
  if (typeof initDynamicContent === 'function') initDynamicContent();
  if (typeof initSearch === 'function') initSearch();

  // Forms
  if (typeof initEnquiryForm === 'function') initEnquiryForm();
  if (typeof initContactForm === 'function') initContactForm();

  // SEO helpers
  if (typeof initSEOHelpers === 'function') initSEOHelpers();

  console.log('Part 3 scripts loaded.');
});

/* ---------------- Shared utilities ---------------- */

function showError(selector, message) {
  var field = document.querySelector(selector);
  if (!field) return;
  var span = document.createElement('span');
  span.className = 'error-message';
  span.style.color = '#c0392b';
  span.style.fontSize = '0.85em';
  span.style.display = 'block';
  span.style.marginTop = '4px';
  span.textContent = message;
  field.parentElement.appendChild(span);
  field.classList.add('error');
  field.style.borderColor = '#c0392b';
}

function clearErrors(form) {
  if (!form) return;
  form.querySelectorAll('.error-message').forEach(function (el) { el.remove(); });
  form.querySelectorAll('.error').forEach(function (el) {
    el.classList.remove('error');
    el.style.borderColor = '';
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidSAPhone(phone) {
  return /^(\+27|0)[6-8][0-9]{8}$/.test(phone);
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}