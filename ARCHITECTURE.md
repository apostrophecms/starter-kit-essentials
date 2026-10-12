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

- Widget template → `modules/<widget-name>/views/widget.jsx`
- Page template → `modules/<page-type>/views/page.jsx`
- Piece index/show → `modules/<piece-page>/views/index.jsx` and `show.jsx`

Naming the file correctly is sufficient; Apostrophe picks it up automatically. Lookup tries
`.jsx`, `.njk`, then `.html` in each directory, nearest module first — so a project `page.jsx`
overrides a core `page.html`.

## JSX Templates

Templates are written in JSX and rendered server-side by Apostrophe core — no React, no virtual
DOM, no client runtime. Each template default-exports a function taking `(data, helpers)`:
destructure `data` for `page`, `widget`, etc., and `helpers` for `Area`, `Extend`, `Template`,
`Component`, `apos` and `__t`.

Nunjucks remains supported, with one hard rule: **a `.html` template cannot extend, include or
import a `.jsx` template** (the reverse works). Core's `notFound.html` extends `layout.html`, so
`modules/@apostrophecms/page/views/notFound.jsx` shadows it — don't delete it. See
[AGENTS.md](./AGENTS.md) for the full helper reference and Nunjucks → JSX gotchas.

## Template Inheritance Chain

Four levels, outermost first:

| Level | File | Edit? |
|-------|------|-------|
| `outerLayoutBase` | ApostropheCMS core | Never |
| `outerLayout` | Core `@apostrophecms/template/views/outerLayout.html` (Nunjucks); shadow in `modules/@apostrophecms/template/views/` if needed | For `<head>`, meta tags, markup outside `<body>` |
| `layout` | `views/layout.jsx` | **Yes — site-wide chrome (header, nav, footer)** |
| page template | `modules/<page-type>/views/page.jsx` | **Yes — page-specific content** |

`views/layout.jsx` renders `<Extend templateName={data.outerLayout} … />`, which resolves to the
correct outer template automatically (handles both full-page and AJAX requests). Each prop passed
to `<Extend>` becomes a `{% block %}` override on that Nunjucks template.

JSX has no named blocks. A page template passes its content to the layout as props instead —
`<Extend templateName="layout.jsx" main={…} />` — and the layout reads them from `data`
(`data.main`, `data.title`).

## `data.*` Sources in Templates

These arrive on a template's first argument. Destructure what you need — `{ page }`, not
`data.page`.

| Variable | Contents |
|----------|----------|
| `data.page` | Current page document |
| `data.piece` | Current piece (piece-type pages only) |
| `data.global` | Global settings document (`@apostrophecms/global` required) |
| `data.user` | Authenticated user, or `null` |
| `data.home` | Home page document |
| `data.query` | Query string as a plain object |
| `data.outerLayout` | Resolves the correct outer layout template |
