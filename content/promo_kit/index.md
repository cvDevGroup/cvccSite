+++
title = 'Promo Kit'
date = 2026-02-01T08:00:00-06:00
draft = false
+++

Help us spread the word about Chippewa Valley Code Camp 2026!

Below you'll find logos, brand colors, and ready-to-use social media content to help promote the event.

---

## Logos

Download our official logos for use in promotional materials.

<div class="promo-assets">
  <div class="promo-asset">
    <img src="/img/2023/CVCC_horiz_02.png" alt="CVCC Horizontal Logo" class="promo-logo">
    <a href="/img/2023/CVCC_horiz_02.png" download class="btn btn-primary">Download Horizontal Logo (PNG)</a>
  </div>
  <div class="promo-asset">
    <img src="/img/2023/CVCC_round_01.png" alt="CVCC Round Logo" class="promo-logo-round">
    <a href="/img/2023/CVCC_round_01.png" download class="btn btn-primary">Download Round Logo (PNG)</a>
  </div>
</div>

---

## Brand Colors

Use these colors to maintain brand consistency in your promotional materials.

<div class="color-swatches">
  <div class="color-swatch" style="background-color: #0077b6;">
    <span class="color-name">Primary Blue</span>
    <span class="color-hex">#0077b6</span>
  </div>
  <div class="color-swatch" style="background-color: #9c4500;">
    <span class="color-name">Accent Orange</span>
    <span class="color-hex">#9c4500</span>
  </div>
  <div class="color-swatch" style="background-color: #222;">
    <span class="color-name">Dark Gray</span>
    <span class="color-hex">#222222</span>
  </div>
  <div class="color-swatch" style="background-color: lightblue;">
    <span class="color-name">Light Blue</span>
    <span class="color-hex">#ADD8E6</span>
  </div>
</div>

---

## Event Details

**Chippewa Valley Code Camp 2026**
**Date:** Saturday, March 14th, 2026
**Location:** CVTC Business Campus, 620 W. Clairemont Avenue, Eau Claire, WI 54701
**Website:** [chippewavalleycodecamp.com](https://chippewavalleycodecamp.com)
**Registration:** [Eventbrite](https://www.eventbrite.com/e/chippewa-valley-code-camp-2026-tickets-1980783904981)

---

## Social Media Content

Copy and paste these ready-to-use posts. Feel free to customize!

{{< promo-posts >}}

<script>
function openCustomizeForm(postId) {
  const modal = document.getElementById('modal-' + postId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCustomizeForm(postId) {
  const modal = document.getElementById('modal-' + postId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function closeModalOnOverlay(event, postId) {
  if (event.target.classList.contains('modal-overlay')) {
    closeCustomizeForm(postId);
  }
}

function applyCustomizations(postId) {
  const modal = document.getElementById('modal-' + postId);
  const contentEl = document.getElementById('content-' + postId);
  const copyBtn = document.querySelector(`[data-post-id="${postId}"] .btn-copy`);

  if (!modal || !contentEl || !copyBtn) return;

  // Get original content
  let content = decodeHtmlEntities(copyBtn.getAttribute('data-original-content'));

  // Apply each variable substitution
  const inputs = modal.querySelectorAll('input[data-key]');
  inputs.forEach(input => {
    const key = input.getAttribute('data-key');
    const value = input.value.trim();
    if (value) {
      content = content.split(key).join(value);
    }
  });

  // Update displayed content
  contentEl.textContent = content.replace(/\n$/, '');

  // Close the modal
  closeCustomizeForm(postId);
}

function resetCustomizations(postId) {
  const modal = document.getElementById('modal-' + postId);
  const contentEl = document.getElementById('content-' + postId);
  const copyBtn = document.querySelector(`[data-post-id="${postId}"] .btn-copy`);

  if (!modal || !contentEl || !copyBtn) return;

  // Clear all inputs
  const inputs = modal.querySelectorAll('input[data-key]');
  inputs.forEach(input => {
    input.value = '';
  });

  // Restore original content
  const originalContent = decodeHtmlEntities(copyBtn.getAttribute('data-original-content'));
  contentEl.textContent = originalContent.replace(/\n$/, '');

  // Close the modal
  closeCustomizeForm(postId);
}

function decodeHtmlEntities(text) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

function copyToClipboard(button, postId) {
  const contentEl = document.getElementById('content-' + postId);
  const content = contentEl ? contentEl.textContent : '';

  navigator.clipboard.writeText(content).then(() => {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.classList.add('btn-copied');
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('btn-copied');
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}
</script>

---

## Photos from Past Events

Feel free to use these photos from previous camps in your promotional materials.

<div class="promo-gallery">
  <img src="/img/2025/panel.jpg" alt="Panel discussion at CVCC 2025">
  <img src="/img/2025/goWorkshop.jpg" alt="Go workshop at CVCC 2025">
  <img src="/img/2025/cvccCheers1.jpg" alt="Attendees at CVCC 2025">
  <img src="/img/2025/toddKeynote1.jpg" alt="Keynote at CVCC 2025">
</div>

---

## Questions?

Have questions about using these materials or want additional assets? Reach out to the organizing team through the website.
