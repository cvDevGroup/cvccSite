+++
title = 'Promo Kit'
date = 2026-02-01T08:00:00-06:00
draft = false
+++

<div class="promo-hero">
  <div class="promo-hero-text">

Help us spread the word about Chippewa Valley Code Camp 2026!

Here you'll find logos and ready-to-use social media content to help promote our wonderful event.

**Chippewa Valley Code Camp 2026**<br>
**Date:** Saturday, March 14th, 2026<br>
**Location:** CVTC Business Campus, 620 W. Clairemont Avenue, Eau Claire, WI 54701<br>
**Website:** [chippewavalleycodecamp.com](https://chippewavalleycodecamp.com)<br>
**Registration:** [Eventbrite](https://www.eventbrite.com/e/chippewa-valley-code-camp-2026-tickets-1980783904981)

  </div>
  <div class="promo-hero-logos">
    <h3>Logos</h3>
    <div class="promo-logos-compact">
      <div class="promo-logo-item">
        <img src="/img/2023/CVCC_horiz_02.png" alt="CVCC Horizontal Logo">
        <a href="/img/2023/CVCC_horiz_02.png" download class="btn btn-primary btn-sm">Download</a>
      </div>
      <div class="promo-logo-item">
        <img src="/img/2023/CVCC_round_01.png" alt="CVCC Round Logo">
        <a href="/img/2023/CVCC_round_01.png" download class="btn btn-primary btn-sm">Download</a>
      </div>
    </div>
  </div>
</div>

---

<h2 style="text-align: center;">Social Media Content</h2>
<p style="text-align: center;">Copy and paste these ready-to-use posts. Feel free to customize!</p>

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
    button.textContent = '\u2713 Copied!';
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
