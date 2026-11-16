# Announcements

This document explains how to configure the site-wide announcement banner.

## Overview

The announcement banner appears at the top of every page, below the navigation. It can be configured globally in `hugo.toml` and hidden on specific pages using front matter.

## Configuration

### Enabling the Announcement

Add the following to `hugo.toml` under the `[params]` section:

```toml
[params]
  announcement = 'Your announcement text here'
  announcementLink = 'https://example.com'
  announcementButtonText = 'Button Text'
```

### Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `announcement` | Yes | The main announcement text displayed in the banner |
| `announcementLink` | No | URL for the call-to-action button. If omitted, no button is shown |
| `announcementButtonText` | No | Text for the button. Defaults to "Learn More" if not specified |
| `announcementConfetti` | No | Set to `true` to enable a celebratory confetti animation on page load |
| `showAnnouncement` | No | Set to `false` to hide the banner site-wide without deleting the announcement text. Defaults to `true` when omitted |
| `announcementStartDate` | No | First day to show the banner (`YYYY-MM-DD`). Hidden before this date |
| `announcementEndDate` | No | Last day to show the banner (`YYYY-MM-DD`, inclusive). Hidden after this date |

### Example

```toml
[params]
  announcement = 'Registration is Now Open!'
  announcementLink = 'https://www.eventbrite.com/e/example-event'
  announcementButtonText = 'Register on Eventbrite'
  announcementConfetti = true
```

## Confetti Animation

When `announcementConfetti = true`, a celebratory confetti animation will spray from both sides of the banner when the page loads.

- The animation plays once automatically on page load
- Clicking anywhere on the banner (except the button) will replay the animation
- The confetti is contained within the banner area
- The animation uses colors that complement the site's theme

## Scheduling the Announcement

Use `announcementStartDate` and `announcementEndDate` to show the banner only between two dates, for example from when registration opens until the event:

```toml
[params]
  announcement = 'Registration is Now Open!'
  announcementStartDate = '2027-01-15'  # first day shown
  announcementEndDate = '2027-03-13'    # last day shown (inclusive)
```

Either date can be used on its own. These follow the same rules as `startDate` / `endDate` on Promo Kit posts.

> **Dates are checked when the site is built, not when someone visits.** The banner appears or disappears on the first rebuild after the date passes. If the site isn't rebuilt regularly, rebuild and deploy it after the end date.

`showAnnouncement = false` always hides the banner, whatever the dates are.

## Hiding the Announcement on Specific Pages

To hide the announcement on a specific page, add `hideAnnouncement = true` to the page's front matter:

```toml
+++
title = 'My Page'
hideAnnouncement = true
+++
```

### Example: Hiding on the Registration Page

Since the registration page already has its own registration button, you might want to hide the banner:

```toml
+++
title = 'Register'
hideAnnouncement = true
+++
```

## Disabling the Announcement Site-Wide

The simplest way to turn the banner off — while keeping the text ready to re-enable later — is the `showAnnouncement` flag:

```toml
[params]
  showAnnouncement = false  # Banner is hidden; announcement text is preserved
  announcement = 'Registration is Now Open!'
```

Set it back to `true` (or remove the line) to show the banner again. This mirrors how individual social media posts are disabled in the Promo Kit without deleting their content.

Alternatively, you can remove the announcement entirely:

1. Remove or comment out the `announcement` line in `hugo.toml`:

```toml
[params]
  # announcement = 'Registration is Now Open!'
```

2. Or remove the entire `[params]` section if not used for anything else.

## Styling

The announcement banner styling is defined in `themes/codeCamp/assets/css/main.css` under the `.announcement-banner-fullwidth` class. The default styling includes:

- Light blue gradient background
- Blue top and bottom borders
- Full-width layout
- Centered content with the button beside the text
