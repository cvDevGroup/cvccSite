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

### Example

```toml
[params]
  announcement = 'Registration is Now Open!'
  announcementLink = 'https://www.eventbrite.com/e/example-event'
  announcementButtonText = 'Register on Eventbrite'
```

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

To completely disable the announcement banner, either:

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
