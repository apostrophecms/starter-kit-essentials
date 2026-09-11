# AGENTS.md — starter-kit-essentials

Machine-readable project brief for AI coding assistants. Facts and conventions only.

---

## Architecture

ApostropheCMS 4 project using ES modules (`"type": "module"`). Modules live in `modules/`,
shared field config in `lib/`, **JSX templates** in `views/` and `modules/*/views/`. Asset
pipeline uses `@apostrophecms/vite`; client-side source is in `modules/asset/ui/src/`.

This project is **fully converted from Nunjucks to JSX**. Write new templates as `.jsx`. Nunjucks
remains fully supported by Apostrophe core and the two interoperate — see
[JSX/Nunjucks Interop](#jsxnunjucks-interop) for the one hard rule.

JSX here is **server-side rendering only** — no React, no virtual DOM, no client runtime. It's an
alternate template syntax evaluated where Nunjucks would have run, implemented by Apostrophe core
itself (`apostrophe/modules/@apostrophecms/template/lib/jsx*.js`). No `react`/`react-dom` package.

## Dev Commands

```
npm run dev      # start with nodemon (watches modules/, lib/, views/, incl. .jsx)
npm start        # start without watch
npm run build    # production asset build
npm run serve    # production server
```

## Anatomy of a JSX Template

Default-export a function taking `(data, helpers)`:

```jsx
export default function ({ page }, { Area }) {
  return (
    <>
      <h1>{page.title}</h1>
      <Area doc={page} name="main" />
    </>
  );
}
```

- **`data`** — same object as `data.*` in Nunjucks. Destructure it; write `page.title`, not
  `data.page.title`.
- **`helpers`** — `{ apos, helpers, Area, Component, Extend, Template, Widget, __t }` (below).
- May be `async` if the template itself needs to fetch something first; Apostrophe awaits all
  output regardless, so async children don't require it.

## The Second Argument

| Name | Purpose |
|------|---------|
| `apos` | The real `self.apos`. Call any module method directly. **Prefer this.** |
| `helpers` | Nunjucks-oriented helper wrappers — use only when you need a Nunjucks helper's exact behavior. |
| `Area` | Renders an area. Replaces `{% area %}` |
| `Component` | Invokes an async component. Replaces `{% component %}` |
| `Template` | Renders another template, **include semantics** (props arrive as data). Replaces `{% include %}` |
| `Extend` | Renders another template, **extends semantics** — props become `{% block %}` overrides against a `.html` target. Replaces `{% extends %}` |
| `Widget` | Renders a single widget directly. Only for reimplementing `area.html` |
| `__t` | Localization helper — same `req.t` as Nunjucks's `__t` global. Not on `data` or `helpers`. |

Against a `.jsx` target, `Template` and `Extend` behave identically.

## Nunjucks → JSX Cheat Sheet

| Nunjucks | JSX |
|----------|-----|
| `{{ data.page.title }}` | `{page.title}` |
| `{% if data.user %}…{% endif %}` | `{user && …}` |
| `{% for x in xs %}…{% endfor %}` | `{xs.map((x) => …)}` |
| `{% area data.page, 'main' %}` | `<Area doc={page} name="main" />` |
| `{% include "footer.html" %}` | `<Template name="footer" />` |
| `{% extends "layout.html" %}` + `{% block main %}` | `<Extend templateName="layout" main={…} />` |
| `{{ content \| safe }}` | `dangerouslySetInnerHTML={{ __html: content }}` |

Notes:

- No `key`/`ref` — there's no client reconciler. Don't add them, even inside `.map()`.
- `style` accepts a **plain string**, unlike React (`` style={`background-image: url(${url})`} ``).
- Templates are real JS modules — `import` helpers, define extra components in the same file.
- Only the default export receives `helpers`. Inline/imported components are plain functions —
  pass `apos`, `Area`, `__t` etc. in as explicit props, under their own names (`__t={__t}`).

## Adding a Widget

1. Create `modules/<widget-name>/index.js` — extend `@apostrophecms/widget-type`
2. Create `modules/<widget-name>/views/widget.jsx`
3. Register in `app.js` under `modules`: `'<widget-name>': {}`
4. Add to an area's `widgets` config (inline or via `lib/area.js`)

```jsx
// modules/card-widget/views/widget.jsx
export default function ({ widget }, { Area }) {
  return (
    <div className="widget card-widget">
      <Area doc={widget} name="contentRT" />
    </div>
  );
}
```

## Adding a Page Type

1. Create `modules/<page-name>/index.js` — extend `@apostrophecms/page-type`
2. Create `modules/<page-name>/views/page.jsx`
3. Register in `app.js` under `modules`: `'<page-name>': {}`
4. Add to `modules/@apostrophecms/page/index.js` → `options.types` array

Page templates extend the site layout by passing named slots as props:

```jsx
// modules/default-page/views/page.jsx
export default function ({ page }, { Extend, Area }) {
  return (
    <Extend templateName="layout.jsx" main={<Area doc={page} name="main" />} />
  );
}
```

## Template Discovery

Apostrophe discovers templates by filename — no registry required.

| Template type | Path convention |
|---------------|-----------------|
| Widget | `modules/<widget-name>/views/widget.jsx` |
| Page | `modules/<page-type>/views/page.jsx` |
| Piece index | `modules/<piece-page>/views/index.jsx` |
| Piece show | `modules/<piece-page>/views/show.jsx` |

Lookup tries `.jsx`, `.njk`, then `.html` per directory, nearest module directory first — a
project-level `page.jsx` beats a core-level `page.html`. A `.jsx`/`.njk`/`.html` suffix in a
`templateName` is a starting point, not a constraint: all three extensions are still tried.

## JSX/Nunjucks Interop

> **A `.html` template cannot `{% extends %}`/`{% include %}`/`{% import %}` a `.jsx` template.**
> The reverse (JSX consuming Nunjucks, incl. `<Extend>` block overrides) is fully supported.

This includes `.html` templates inside `node_modules`: core's `@apostrophecms/page/views/notFound.html`
extends `layout.html`, so a JSX layout breaks every 404 page unless shadowed — which is why
`modules/@apostrophecms/page/views/notFound.jsx` exists. Don't delete it.

This project has no other `.html` overrides; core's `@apostrophecms/template/views/outerLayout.html`
is used as-is, and `views/layout.jsx` extends it directly via
`<Extend templateName={data.outerLayout} … />`.

## Template Inheritance

```
outerLayoutBase.html  ← ApostropheCMS core (never edit)
  outerLayout.html    ← core default; override in modules/@apostrophecms/template/views/ only for <head>/meta changes
    views/layout.jsx  ← edit for site chrome (header, nav, footer)
      modules/<page-type>/views/page.jsx ← edit for page content
```

No named blocks in JSX — markup the parent renders is passed as props, plus the implicit
`children` prop for anything between the opening/closing tags.

## Data Sources in Templates

Available on the first function argument. Destructure what you need.

| Variable | Contents | Notes |
|----------|----------|-------|
| `widget` | Widget document | Widget templates only |
| `page` | Current page document | All page templates |
| `piece` | Current piece document | Piece-type page templates only |
| `global` | Global settings document | Requires `@apostrophecms/global` |
| `user` | Authenticated user or `null` | All templates |
| `home` | Home page document | All templates |
| `query` | Query string as object | All templates |
| `outerLayout` | Resolves the correct outer layout | Handles full-page vs AJAX |
| `contextOptions` | Context options passed by the enclosing area | Widget templates |
| `children` | Markup passed between a caller's tags | Templates used as layouts |

## `_` Prefix Convention

Relationship fields are prefixed with `_` (e.g., `_linkPage`, `_author`).
- Value is always an **array**, even with `max: 1`
- Not stored in the document — joined at query time
- Access single results via `doc._field[0]`

## Shared Field Utilities (`lib/`)

| File | Exports | Use for |
|------|---------|---------|
| `lib/area.js` | Default widget config object | Area field `widgets` option |

```js
import areaConfig from '../../lib/area.js';
// then: options: { widgets: areaConfig }
```

## i18n Key Convention

All project translation strings use the `project:` namespace.

- Key format: `'project:camelCaseKey'` (e.g., `'project:linkText'`)
- Translation files: `modules/@apostrophecms/i18n/i18n/project/<locale>.json`
- Register namespace: `modules/@apostrophecms/i18n/index.js` → `i18n: { project: { browser: true } }`
