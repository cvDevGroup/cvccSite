# Promo Kit Posts

The promo kit page displays social media posts dynamically from a YAML data file.

## Files

- `content/promo_kit/index.md` - The promo kit page content
- `content/promo_kit/posts.yaml` - Social media post templates (rendered dynamically)

## Adding/Editing Posts

Edit `content/promo_kit/posts.yaml` to add or modify social media posts. Each post has the following fields:

### Required Fields

| Field | Description |
|-------|-------------|
| `id` | Unique identifier for the post |
| `title` | Display title shown above the post (e.g., "Short Post (Twitter/X)") |
| `platform` | Post type: `short`, `medium`, or `email` |
| `content` | The post content (use `\|` for multiline text) |

### Optional Fields

| Field | Description |
|-------|-------------|
| `startDate` | Post won't appear before this date (format: `YYYY-MM-DD`) |
| `endDate` | Post won't appear after this date (format: `YYYY-MM-DD`) |

## Example Post

```yaml
posts:
  - id: my-post
    title: "My Post Title"
    platform: "short"
    content: |
      This is the post content.
      It can span multiple lines.

      #CVCC2026 #Hashtags
```

## Example with Date Filtering

```yaml
posts:
  # This post only appears between Jan 1 and Feb 15
  - id: early-bird
    title: "Early Bird Announcement"
    platform: "short"
    startDate: "2026-01-01"
    endDate: "2026-02-15"
    content: |
      Early bird registration is open for CVCC 2026!
      #CVCC2026

  # This post only appears starting March 7
  - id: last-chance
    title: "Last Chance to Register"
    platform: "short"
    startDate: "2026-03-07"
    content: |
      Only one week until CVCC 2026!
      #CVCC2026
```

## Date Filtering Logic

- If `startDate` is set, the post is hidden until that date
- If `endDate` is set, the post is hidden after that date
- If neither is set, the post is always visible
- Dates are inclusive (a post with `endDate: "2026-02-15"` will be visible all day on Feb 15)

## Tips

- Use the `|` character after `content:` to preserve line breaks
- Keep short posts under 280 characters for Twitter/X compatibility
- Test locally with `hugo serve` to verify posts appear correctly
