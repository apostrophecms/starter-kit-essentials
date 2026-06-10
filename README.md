# ApostropheCMS Essentials Starter Kit

The official minimal starting point for ApostropheCMS 4 projects. Ships with a home page,
a default page type, a basic layout, and the Vite asset pipeline — enough structure to build
on without opinions you'll need to undo.

Use it as-is for simple sites, or fork and extend it as your own organizational starter.

---

## Prerequisites

| Requirement | Version | Link |
|-------------|---------|------|
| Node.js | 22+ LTS | https://nodejs.org |
| Database | — | MongoDB 8+, SQLite (no server), or PostgreSQL 14+ |

> **Quickest local setup:** use SQLite — no database server required.
> Set `APOS_DB_URI=sqlite://./data/my-project.db` in `.env`.

---

## Quick Start

```sh
git clone https://github.com/apostrophecms/starter-kit-essentials.git my-project
cd my-project
cp .env.example .env
# Edit .env — set APOS_DB_URI at minimum (see Environment Variables below)
npm install
node app @apostrophecms/user:add admin admin
npm run dev
```

Open **http://localhost:3000** and log in at `/login` with username `admin` and the password
you entered above.

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
Nunjucks render
  views/layout.html                          ← site chrome
    └─ modules/<page-type>/views/page.html  ← page content
         └─ {% area %} tags
              └─ modules/<widget-name>/views/widget.html
  ▼
HTML response
```

**Key directories**

| Path | Purpose |
|------|---------|
| `app.js` | Entry point; all module registration |
| `modules/` | One subdirectory per module |
| `lib/` | Shared field config (import, don't duplicate) |
| `views/` | Site-wide Nunjucks templates |
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

**2.** Create `modules/<widget-name>/views/widget.html`:

```html
<div>
  <h2>{{ data.widget.heading }}</h2>
</div>
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

**2.** Create `modules/<page-name>/views/page.html`:

```html
{% extends "layout.html" %}
{% block main %}
  <h1>{{ data.page.title }}</h1>
  {% area data.page, 'main' %}
{% endblock %}
```

**3.** Register in `app.js` under `modules`: `'<page-name>': {}`

**4.** Add to `modules/@apostrophecms/page/index.js` → `options.types`:

```js
{ name: '<page-name>', label: 'My Page' }
```

---

## Environment Variables

Copy `.env.example` to `.env`. Never commit `.env`.

| Variable | Required | Description |
|----------|----------|-------------|
| `APOS_DB_URI` | **Yes** | Database connection string (see formats below) |
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
