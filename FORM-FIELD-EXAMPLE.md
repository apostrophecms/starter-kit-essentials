# Example: checkbox form fields with rich text labels

This branch shows how to add two new form field types to an Apostrophe project. Their labels are rich text, so editors can put links in them, for example "I accept the [privacy policy](#)".

| Field type | Editors see | Extends the built-in |
|---|---|---|
| `rich-text-checkboxes-field` | **Checkboxes with rich text labels**: a list of choices; visitors tick any number. Each choice has its own rich text label. | Checkboxes field |
| `rich-text-boolean-field` | **Checkbox with rich text label**: a single checkbox, such as one consent box. | Checkbox (boolean) field |

Use either or both. They share one helper and one stylesheet.

The example is written for a **headless** project, where Apostrophe provides the admin UI and the REST API, and a separate React app renders the site.

It is a **project-level** customization. You do not change or fork `@apostrophecms/form`.

- Existing forms and fields keep working. No migration is needed.
- Editors use the new field types where they need links. To change an existing field, they replace it with the new type.

**Requires Apostrophe 4.34.0 or newer**, for the `richText` field type.

## What to copy

### Apostrophe project

| File | Purpose |
|---|---|
| `modules/rich-text-checkboxes-field-widget/` | The checkboxes field type: `index.js` and `views/widget.jsx`. |
| `modules/rich-text-boolean-field-widget/` | The single checkbox field type: `index.js` and `views/widget.jsx`. |
| `lib/rich-label.js` | Shared helper that prepares the label HTML. Both field types import it. |
| `modules/asset/ui/src/scss/_rich-check.scss` | Styles for both field types. Import it from your site stylesheet. |
| `modules/@apostrophecms/form/index.js` | Adds the new field types to the list editors can choose from. |
| `modules/@apostrophecms/i18n/i18n/project/en.json` | Admin UI labels. Add a `he.json` next to it for Hebrew. |

The `widget.jsx` templates are not what visitors see on your React site, but the form editor uses them to preview each field. Keep them.

Then register the modules in `app.js`:

```javascript
modules: {
  // ...your existing form modules
  'rich-text-boolean-field-widget': {},
  'rich-text-checkboxes-field-widget': {}
}
```

If your project already sets `formWidgets` in `modules/@apostrophecms/form/index.js`, add only the two lines `'rich-text-boolean-field': {}` and `'rich-text-checkboxes-field': {}`. `formWidgets` replaces the default list, so the example file repeats the defaults.

If your project does not use the `project` translation namespace yet, also copy `modules/@apostrophecms/i18n/index.js`, or replace the `project:...` keys with plain text.

`_rich-check.scss` uses `$color-purple` from this kit's `_settings.scss`. Replace it with your own accent color.

If your project uses CommonJS, change `export default {` to `module.exports = {` and the `import` lines to `require`. If it uses Nunjucks templates instead of JSX, the templates need to be rewritten as `widget.html`. Ask us if you need that version.

### React app

`headless-react-example/` holds two reference components. They are not part of this Apostrophe project. Copy them into your React app and connect them to your form code:

- `RichTextCheckboxes.jsx` for `rich-text-checkboxes-field`
- `RichTextCheckbox.jsx` for `rich-text-boolean-field`. It also exports `RichLabel`, which both components use.

They use the same class names as `_rich-check.scss`, so you can reuse those styles in your app.

## The REST API data

In the API response, form fields are the widgets in `contents.items` of the form. When a page places a form with the form widget, the form is in that widget's `_form[0]`.

The checkboxes field:

```json
{
  "type": "rich-text-checkboxes-field",
  "fieldName": "consents",
  "fieldLabel": "Consents",
  "required": true,
  "choices": [
    {
      "label": "Privacy policy",
      "value": "privacy",
      "richLabel": "<p>I accept the <a href=\"#apostrophe-permalink-…\">privacy policy</a></p>",
      "_richLabelHtml": "I accept the <a href=\"/privacy-policy\">Privacy policy</a>"
    },
    {
      "label": "Newsletter",
      "value": "Newsletter",
      "richLabel": "",
      "_richLabelHtml": ""
    }
  ]
}
```

The single checkbox field has the same `richLabel` and `_richLabelHtml` properties on the widget itself, next to `fieldName`, `fieldLabel`, `required` and `checked`.

Render `_richLabelHtml`, not `richLabel`. When `_richLabelHtml` is empty, show the plain-text `label` (or `fieldLabel`) instead. The components do this.

### What `_richLabelHtml` does

`richLabel` is the stored value. `_richLabelHtml` is prepared from it when the form is loaded, in two steps:

1. **Links to pages on the site are resolved.** Apostrophe stores them as placeholders, such as `href="#apostrophe-permalink-…?updateTitle=1"`, and the REST API returns those placeholders. `_richLabelHtml` has the page's current URL, and the link text follows the page title. External links are unchanged.
2. **Paragraphs are removed.** The rich text editor wraps text in `<p>`, which is not allowed inside a `<label>` element. `_richLabelHtml` is inline HTML, so it can go inside a real `<label>`.

Properties that start with `_` are never saved; Apostrophe adds them to each response.

**Page URLs:** the resolved URLs are Apostrophe's page URLs, such as `/privacy-policy`. If your React routes are different, map them in your app.

## Submitting

Nothing changes. Values are stored exactly as for the built-in fields:

```json
{
  "consents": [ "privacy" ],
  "privacy-consent": true
}
```

- **Checkboxes:** an array of the ticked choice values. Values that are not in the field's choices are dropped. If the field is required, at least one choice must be ticked.
- **Single checkbox:** `true` or `false`. If the field is required, it must be `true`.

Send the values in the same request your app already makes to `/api/v1/@apostrophecms/form/submit`. A rejected submission returns a `400` with a field error, as for the built-in fields.

## How editors use them

**Checkboxes with rich text labels:**

1. Open a form and add a field. Choose **Checkboxes with rich text labels**.
2. Fill in the field label, for example "Consents". Visitors see it above the choices.
3. Add a choice. In **Label shown to visitors**, type the text. Select the words to link and use the link button. Links can point to a page on the site or to an external URL.
4. Fill in **Choice label (plain text)**. It names the choice in the editor. If **Value** is empty, it is also the value stored in submissions.

**Checkbox with rich text label:**

1. Add a field and choose **Checkbox with rich text label**.
2. Type the text in **Label shown to visitors**, with links as above.
3. Fill in **Field label (plain text)**. This builds the field name and identifies the field in submissions and emails. Visitors do not see it.

In both, if **Label shown to visitors** is empty, the plain-text label is shown instead.

**Replacing an existing field:** give the new field the same field label as the old one, and the same choice values for checkboxes. New submissions then use the same keys and values as old ones, so exports and emails stay consistent.

## Accessibility and behavior

- Each checkbox has a real `<label>`, so screen readers announce the label text, including the links.
- Clicking the label text ticks the box, as with any checkbox. Clicking a link in the label opens the link and does not tick the box.
- The checkboxes field is a `<fieldset>`, and its field label is the `<legend>`.

## Styling

`_rich-check.scss` styles both field types for server-rendered forms and for the form editor's preview. It inherits the site's font and text color, and uses one accent color for the checkboxes, links and focus ring.

The templates deliberately do not use the form module's `apos-form-label` and `apos-form-input` classes on the checkboxes and labels. Those classes make labels block-level, pushing them under the checkbox, and add a bottom margin to every checkbox. If you set the form module's `classPrefix` option, the templates still add your prefixed classes.

## Customizing

- **Toolbar:** labels allow bold, italic and links. Change `toolbar` in `richLabel` in each module's `index.js` to allow more or less.
- **"(Required)" text in React:** the components use English. Replace it with your app's translations.

## Try it in this starter kit

```bash
npm install
npm run dev
```

1. Create an admin user: `node app @apostrophecms/user:add admin admin`.
2. Log in at `/login`. Create a page to link to, such as "Privacy policy".
3. Create a form under **Forms**. Add a **Checkboxes with rich text labels** field, and link one choice to that page.
4. Add the form to a page with the **Form** widget, and publish the page and the form.
5. Read the form from the REST API to see `_richLabelHtml`, for example `/api/v1/@apostrophecms/form/<form _id>` while logged in.

If you tried the first version of this branch, delete and re-add your test fields. The rich text labels used to be stored differently and do not carry over.
