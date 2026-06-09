# CLAUDE.md — starter-kit-essentials

Machine-readable project brief for AI coding assistants. Facts and conventions only.

---

## Architecture

ApostropheCMS 4 project using ES modules (`"type": "module"`). Modules live in `modules/`,
shared field config in `lib/`, Nunjucks templates in `views/` and `modules/*/views/`.
Asset pipeline uses `@apostrophecms/vite`; client-side source is in `modules/asset/ui/src/`.

## Dev Commands

```
npm run dev      # start with nodemon (watches modules/, lib/, views/)
npm start        # start without watch
npm run build    # production asset build
npm run serve    # production server
```

## Adding a Widget

1. Create `modules/<widget-name>/index.js` — extend `@apostrophecms/widget-type`
2. Create `modules/<widget-name>/views/widget.html` — Nunjucks template
3. Register in `app.js` under `modules`: `'<widget-name>': {}`
4. Add to an area's `widgets` config (inline or via `lib/area.js`)

Example module path: `modules/card-widget/index.js`
Example template path: `modules/card-widget/views/widget.html`

## Adding a Page Type

1. Create `modules/<page-name>/index.js` — extend `@apostrophecms/page-type`
2. Create `modules/<page-name>/views/page.html` — Nunjucks template
3. Register in `app.js` under `modules`: `'<page-name>': {}`
4. Add to `modules/@apostrophecms/page/index.js` → `options.types` array

Example module path: `modules/default-page/index.js`
Example template path: `modules/default-page/views/page.html`

## `_` Prefix Convention

Relationship fields are prefixed with `_` (e.g., `_linkPage`, `_author`).
- Value is always an **array**, even with `max: 1`
- Not stored in the document — joined at query time
- Access single results via `doc._field[0]`

## Shared Field Utilities (`lib/`)

| File | Exports | Use for |
|------|---------|---------|
| `lib/area.js` | Default widget config object | Area field `widgets` option |

Import instead of duplicating widget config inline:
```js
import areaConfig from '../../lib/area.js';
// then: options: { widgets: areaConfig }
```

## i18n Key Convention

All project translation strings use the `project:` namespace.

- Key format: `'project:camelCaseKey'` (e.g., `'project:linkText'`)
- Translation files: `modules/@apostrophecms/i18n/i18n/project/<locale>.json`
- Register namespace: `modules/@apostrophecms/i18n/index.js` → `i18n: { project: { browser: true } }`

## Template Discovery

Apostrophe discovers templates by filename — **no registry required**.

| Template type | Path convention |
|--------------|----------------|
| Widget | `modules/<widget-name>/views/widget.html` |
| Page | `modules/<page-type>/views/page.html` |
| Piece index | `modules/<piece-page>/views/index.html` |
| Piece show | `modules/<piece-page>/views/show.html` |

## Data Sources in Templates

| Variable | Contents | Notes |
|----------|----------|-------|
| `data.widget` | Widget document | Widget templates only |
| `data.page` | Current page document | All page templates |
| `data.piece` | Current piece document | Piece-type page templates only |
| `data.global` | Global settings document | Requires `@apostrophecms/global` |
| `data.user` | Authenticated user or `null` | All templates |
| `data.home` | Home page document | All templates |
| `data.query` | Query string as object | All templates |

## Template Inheritance

```
outerLayoutBase.html  ← ApostropheCMS core (never edit)
  outerLayout.html    ← override in modules/@apostrophecms/template/views/ for <head>/meta
    views/layout.html ← edit for site chrome (header, nav, footer)
      modules/<page-type>/views/page.html ← edit for page content
```

`views/layout.html` opens with `{% extends data.outerLayout %}`.
