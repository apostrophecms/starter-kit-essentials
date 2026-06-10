# Architecture

A minimal ApostropheCMS starter. This file orients developers and LLM coding assistants
to the project's conventions. It is a reference, not a tutorial.

<!-- Part B (hosted Architecture Guide — patterns, advanced topics) will be linked here once published. -->

---

## `_` Prefix Convention

Relationship fields are always prefixed with `_` (e.g., `_linkPage`, `_author`).
The prefix signals that the value is **not stored in the document** — it is joined at query time.
The value is always an **array**, even when `max: 1` is set; ApostropheCMS uses a consistent API
regardless of cardinality. Access a single-result relationship via `doc._field[0]` in templates.

## `lib/` Utilities

Shared configuration objects live in `lib/` and are imported where needed to avoid duplication.

| File | Purpose | Use when… |
|------|---------|-----------|
| `lib/area.js` | Default widget set for `area` fields | Adding or changing which widgets appear in an area |

Follow-on additions to `lib/` as the project grows:
- `lib/link.js` — reusable link-field definitions (linkType + `_linkPage` + `_linkFile`)
- `lib/options.js` — shared select choices or constants

## i18n — `project:` Key Convention

All project-level translation strings use the `project:` namespace (e.g., `'project:linkText'`).

- **Translation files:** `modules/@apostrophecms/i18n/i18n/project/<locale>.json`
- **Namespace registration:** `modules/@apostrophecms/i18n/index.js` → `i18n: { project: { browser: true } }`
- Keys are camelCase, matching the JSON property names in the locale files.

## Styles Module Convention

CMS-editable design tokens (colors, fonts, spacing) belong in `modules/@apostrophecms/styles/`.
Define fields per-concern in `modules/@apostrophecms/styles/lib/*.js` (one file per token group)
and compose them in `index.js` under `styles.add` and `styles.group`. Templates consume these
values from `data.global`.

## Template Discovery

ApostropheCMS discovers templates by **filename convention** — no registration required:

- Widget template → `modules/<widget-name>/views/widget.html`
- Page template → `modules/<page-type>/views/page.html`
- Piece index/show → `modules/<piece-page>/views/index.html` and `show.html`

Naming the file correctly is sufficient; Apostrophe picks it up automatically.

## Template Inheritance Chain

Four levels, outermost first:

| Level | File | Edit? |
|-------|------|-------|
| `outerLayoutBase` | ApostropheCMS core | Never |
| `outerLayout` | `modules/@apostrophecms/template/views/outerLayout.html` | For `<head>`, meta tags, markup outside `<body>` |
| `layout` | `views/layout.html` | **Yes — site-wide chrome (header, nav, footer)** |
| page template | `modules/<page-type>/views/page.html` | **Yes — page-specific content** |

`views/layout.html` opens with `{% extends data.outerLayout %}`, which resolves to the correct
outer template automatically (handles both full-page and AJAX requests).

## `data.*` Sources in Templates

| Variable | Contents |
|----------|----------|
| `data.page` | Current page document |
| `data.piece` | Current piece (piece-type pages only) |
| `data.global` | Global settings document (`@apostrophecms/global` required) |
| `data.user` | Authenticated user, or `null` |
| `data.home` | Home page document |
| `data.query` | Query string as a plain object |
| `data.outerLayout` | Resolves the correct outer layout template |
