# ApostropheCMS Essentials Starter Kit

The official minimal starting point for ApostropheCMS 4 projects. Ships with a home page,
a default page type, a basic layout, and the Vite asset pipeline — enough structure to build
on without opinions you'll need to undo.

Templates are written in **JSX**, rendered server-side by Apostrophe core — no React, no
virtual DOM, no client runtime. Nunjucks still works too, and you can mix the two with one
limit: a Nunjucks (`.html`) template can't extend or include a JSX template. See
[AGENTS.md](./AGENTS.md#jsxnunjucks-interop) for details.

Use it as-is for simple sites, or fork and extend it as your own organizational starter.

---

## Prerequisites

| Requirement | Version | Link |
|-------------|---------|------|
| Node.js | 24+ LTS | https://nodejs.org |
| Database | — | MongoDB 8+, SQLite (no server), or PostgreSQL 14+ |

> **No configuration needed for local MongoDB:** by default Apostrophe connects to
> `mongodb://localhost:27017/<shortName>` (`shortName` is set in `app.js`).
>
> **No database server?** Use SQLite: set `APOS_DB_URI=sqlite://./data/my-project.db` in `.env`.

---

## Quick Start

```sh
git clone https://github.com/apostrophecms/starter-kit-essentials.git my-project
cd my-project
npm install
node app @apostrophecms/user:add admin admin
npm run dev
```

Open **http://localhost:3000** and log in at `/login` with username `admin` and the password
you entered above.

This uses local MongoDB. To use SQLite, PostgreSQL or a remote database, run
`cp .env.example .env` first and set the variables described in
[Environment Variables](#environment-variables).

### Using the CLI instead

```sh
npm create apostrophe@latest  # follow the prompts
```

---

## Architecture Overview

```
Browser
  │  HTTP request
  ▼
Express  (app.js)
  │  Route matched by @apostrophecms/page
  ▼
Page module  modules/<page-type>/index.js
  │  Relationship fields joined (_field arrays populated)
  │  data.global, data.home, data.user attached
  ▼
JSX render (server-side)
  views/layout.jsx                          ← site chrome
    └─ modules/<page-type>/views/page.jsx  ← page content
         └─ <Area> components
              └─ modules/<widget-name>/views/widget.jsx
  ▼
HTML response
```

**Key directories**

| Path | Purpose |
|------|---------|
| `app.js` | Entry point; all module registration |
| `modules/` | One subdirectory per module |
| `lib/` | Shared field config (import, don't duplicate) |
| `views/` | Site-wide JSX templates (`layout.jsx`) |
| `modules/asset/ui/src/` | Client-side JS and SCSS |

See [ARCHITECTURE.md](./ARCHITECTURE.md) for conventions, template inheritance details,
and the full `data.*` reference.

---

## Adding a Widget

**1.** Create `modules/<widget-name>/index.js`:

```js
export default {
  extend: '@apostrophecms/widget-type',
  options: { label: 'My Widget' },
  fields: {
    add: {
      heading: { type: 'string', label: 'Heading' }
    }
  }
};
```

**2.** Create `modules/<widget-name>/views/widget.jsx`:

```jsx
export default function ({ widget }) {
  return (
    <div>
      <h2>{widget.heading}</h2>
    </div>
  );
}
```

**3.** Register in `app.js` under `modules`: `'<widget-name>': {}`

**4.** Add `'<widget-name>': {}` to an area's `widgets` config, or to `lib/area.js`.

---

## Adding a Page Type

**1.** Create `modules/<page-name>/index.js`:

```js
import areaConfig from '../../lib/area.js';

export default {
  extend: '@apostrophecms/page-type',
  options: { label: 'My Page' },
  fields: {
    add: {
      main: { type: 'area', options: { widgets: areaConfig } }
    }
  }
};
```

**2.** Create `modules/<page-name>/views/page.jsx`. Instead of `{% block %}`, pass the
content to the layout as a prop:

```jsx
export default function ({ page }, { Extend, Area }) {
  return (
    <Extend
      templateName="layout.jsx"
      main={
        <>
          <h1>{page.title}</h1>
          <Area doc={page} name="main" />
        </>
      }
    />
  );
}
```

**3.** Register in `app.js` under `modules`: `'<page-name>': {}`

**4.** Add to `modules/@apostrophecms/page/index.js` → `options.types`:

```js
{ name: '<page-name>', label: 'My Page' }
```

---

## Environment Variables

All variables are optional. To set any, copy `.env.example` to `.env`. Never commit `.env`.

| Variable | Required | Description |
|----------|----------|-------------|
| `APOS_DB_URI` | No | Database connection string (see formats below). Defaults to `mongodb://localhost:27017/<shortName>` |
| `APOS_DEV` | No | Set to `1` to force admin UI rebuild on every restart |

**`APOS_DB_URI` formats:**

```
# MongoDB
mongodb://localhost:27017/my-project

# SQLite (no server needed — good for local dev)
sqlite://./data/my-project.db

# PostgreSQL (use underscores, not hyphens, in database name)
postgres://user:password@localhost:5432/my_project
```

---

## Before Going to Production

- [ ] Update `shortName` in `app.js` — used as the database name
- [ ] Set a unique session `secret` in `modules/@apostrophecms/express/index.js`
- [ ] Run `npm run build` to compile production assets
- [ ] Start with `npm run serve` (or `npm run release` to install, build, and migrate in one step)

---

## Resources

- [ApostropheCMS Documentation](https://docs.apostrophecms.org)
- [ApostropheCMS Discord](https://chat.apostrophecms.com)
- [GitHub Discussions](https://github.com/apostrophecms/apostrophe/discussions)
- [CLI Tool](https://github.com/apostrophecms/create-apostrophe) — `npm create apostrophe@latest`
- [ARCHITECTURE.md](./ARCHITECTURE.md) — conventions, template reference, data sources
