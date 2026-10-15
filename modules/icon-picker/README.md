# Icon picker field (example)

> **Community example, not an officially supported module.** It was written to answer a question
> about building a visual icon picker. Copy it into your project and adapt it; it is not maintained
> alongside the starter kit.

A custom `iconPicker` schema field type: a searchable grid of [Lucide](https://lucide.dev/icons/)
icons with a live preview, plus standard controls for size, color, stroke width and shape. A sample
`icon-widget` shows it in use.

## What this branch changes

| File | Change |
|------|--------|
| `modules/icon-picker/` | The field type: server module, Vue input, render template, front-end CSS |
| `modules/icon-widget/` | Example widget with an `iconPicker` field and an accessible label |
| `package.json` | Adds `lucide`, which supplies the icon data on both the server and in the admin UI |
| `app.js` | Enables `icon-picker` and `icon-widget` |
| `modules/default-page/index.js` | Allows the `icon` widget in the page's main area |

To try it: `npm install`, then `npm run dev`, then add an **Icon** widget to a page.

## Approach

This follows the [reusing standard fields](https://apostrophecms.com/docs/tutorials/reusing-standard-fields.html)
tutorial (the color gradient example). One field stores everything about the icon:

```js
{ name: 'map-pin', size: 'm', color: '#1f6feb', strokeWidth: 2, shape: 'circle' }
```

- **Icon grid**: the only fully custom part. No standard field can pick from a visual grid.
- **Size, color, stroke width, shape**: ordinary `select`, `color` and `range` fields. The Vue
  input renders them with `<AposSchema>`, and the server launders them with `apos.schema.convert`,
  so they validate the same way as standard fields anywhere else.
- **Live preview**: the input has the whole value, so it can draw the icon with the current settings
  as you edit.
- **Rendering**: server-side only. `views/icon.jsx` outputs an inline SVG, with no client-side
  JavaScript. Lucide icons draw with `currentColor`, so an icon with no color set takes the color of
  the text around it.

Because everything is in one field, adding an icon to another schema is a single line:

```js
// e.g. in a button widget's fields
icon: {
  type: 'iconPicker',
  label: 'Icon'
}
```

```jsx
// and in its template
<Template templateName="icon-picker:icon" icon={widget.icon} />
```

Pass `label="..."` when the icon carries meaning; without it, the SVG is hidden from screen readers.

## Configuration

Options on `icon-picker` in `app.js`:

```js
'icon-picker': {
  options: {
    // Kebab-case Lucide names shown in the picker (default: a curated set of ~36)
    icons: [ 'arrow-right', 'map-pin', 'download', 'heart' ],
    // Size choices in px
    sizes: { s: 16, m: 24, l: 32, xl: 48 }
  }
}
```

Unknown icon names are logged and skipped at startup. On save, the server rejects any icon name that
isn't in the configured list.

### Site-wide defaults with `@apostrophecms/styles`

The color field accepts a CSS custom property name such as `--brand-primary`, which renders as
`var(--brand-primary)`. Combined with `@apostrophecms/styles`, this lets editors choose a site
color token instead of a fixed hex value.

## Known limitations

- **Icons inside rich text** (inline in a paragraph) aren't covered. That needs a custom rich text
  (Tiptap) extension.
- **Labels are plain English**, not `project:` i18n keys.
- **ESLint** reports `jsx-quotes` and `jsx-key` errors on the `.jsx` files, as it does on the starter
  kit's existing templates. The shared config doesn't yet account for server-side JSX.
