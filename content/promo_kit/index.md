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
**Time:** Saturday, March 14th, 2026 @ 9am<br>
**Location:** CVTC Business Campus, 620 W. Clairemont Avenue, Eau Claire, WI 54701<br>

---

<h2 style="text-align: center;">Share on Social Media:</h2>

- **Official Site:** [chippewavalleycodecamp.com](https://chippewavalleycodecamp.com)<br>
- [Register for CVCC on EventBrite](https://www.eventbrite.com/e/chippewa-valley-code-camp-2026-tickets-1980783904981)
- [LinkedIn Event](https://www.linkedin.com/posts/cvdevgroup_code-camp-is-back-were-gearing-up-to-once-activity-7420352050158391296-7Clq)
- [Facebook Post](https://www.facebook.com/cvdevgroup/posts/pfbid038FBhRhLy6o5VPSTAfk1X2j22z9EQVZGBAFupwF3cG2rzcMNjxNgxnQjJwZDu9ecZl)
- [VolumeOne Event](https://volumeone.org/events/2026/03/14/588133-chippewa-valley-code-camp-2026)
- [Call for Speakers Email Submission](mailto:cfp@cvdevgroup.org?subject=Submission&body=Talk%20Title%3A%0A%0AElevator%20Pitch%3A%20Two%20sentences%20to%20sell%20your%20talk.%0A%0AFormat%2C%20Choose%20One%3A%20Regular%20(~40%20min)%20%2F%20Lightning%20(~5%20min)%20%2F%20Workshop%20(%3Ehour).%0A%0AAudience%20Level%3A%20Beginner%20%2F%20Intermediate%20%2F%20Advanced%0A%0ADescription%20(Markdown%20Preferred)%3A%0A%0ANotes%20(informational%20only%2C%20not%20published)%3A%0A%0ASpeaker%20Name%3A%0A%0ASpeaker%20URL%3A%0A%0AShirt%20Size%3A%0A%0ASpeaker%20Bio%3A%0A%0APlease%20attach%20a%20headshot%2C%20photo%2C%20or%20any%20kind%20of%20web-ready%20image%20to%20use%20with%20your%20bio%20(optional)%0A%0AAttach%20an%20image%20to%20display%20next%20to%20your%20presentation%20(optional))
- [Sponsorship Program PDF](https://chippewavalleycodecamp.com/fil/cvcc-2026-Sponsorship-Program.pdf)

---


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
  <img src="/img/2025/panel2.jpg" alt="Panel discussion at CVCC 2025">
  <img src="/img/2025/goWorkshop.jpg" alt="Go workshop at CVCC 2025">
  <img src="/img/2025/cvccCheers1.jpg" alt="Attendees at CVCC 2025">
  <img src="/img/2025/toddKeynote1.jpg" alt="Keynote at CVCC 2025">
</div>

---

## Questions?

Have questions about using these materials or want additional assets? Send an email to codecamp@cvdevgroup.org.
