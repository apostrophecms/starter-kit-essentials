# Example: checkbox form field with a rich text label

This branch shows how to add a new form field type to an Apostrophe project: a checkbox whose label is rich text. Editors can put links in the label, for example "I accept the [privacy policy](#)".

It is written for a **headless** project, where Apostrophe provides the admin UI and the REST API, and a separate React app renders the site.

It is a **project-level** customization. You do not change or fork `@apostrophecms/form`.

- Existing forms and checkbox fields keep working. No migration is needed.
- Editors use the new field type where they need a link. To change an existing checkbox, they replace it with the new field type.

## What to copy

### Apostrophe project

| File | Purpose |
|---|---|
| `modules/rich-text-boolean-field-widget/index.js` | The new field type. It extends the built-in checkbox field, adds the rich text label, and adds `_richLabelHtml` to the REST API response. |
| `modules/rich-text-boolean-field-widget/views/widget.jsx` | Server-rendered markup. Visitors on your React site never see it, but the form editor uses it to preview the field. Keep it. |
| `modules/rich-text-boolean-field-widget/ui/src/index.scss` | Styles for the editor preview. |
| `modules/@apostrophecms/form/index.js` | Adds the new field type to the list editors can choose from. |
| `modules/@apostrophecms/i18n/i18n/project/en.json` | Admin UI labels for the new field. Add a `he.json` next to it for Hebrew. |

Then register the module in `app.js`:

```javascript
modules: {
  // ...your existing form modules
  'rich-text-boolean-field-widget': {}
}
```

If your project already sets `formWidgets` in `modules/@apostrophecms/form/index.js`, add only the `'rich-text-boolean-field': {}` line to it. `formWidgets` replaces the default list, so the example file repeats the defaults.

If your project does not use the `project` translation namespace yet, also copy `modules/@apostrophecms/i18n/index.js`, or replace the `project:...` keys with plain text.

If your project uses CommonJS, change `export default {` to `module.exports = {` in the `.js` files. If it uses Nunjucks templates instead of JSX, the template needs to be rewritten as `widget.html`. Ask us if you need that version.

### React app

`headless-react-example/RichTextCheckbox.jsx` is a reference component, not part of this Apostrophe project. Copy it into your React app and connect it to your form code, next to the component you already use for the built-in checkbox field (`@apostrophecms/form-boolean-field`).

## The REST API data

In the API response, form fields are the widgets in `contents.items` of the form. When a page places a form with the form widget, the form is in that widget's `_form[0]`. The new field looks like this:

```json
{
  "type": "rich-text-boolean-field",
  "fieldName": "privacy-consent",
  "fieldLabel": "Privacy consent",
  "required": true,
  "checked": false,
  "richLabel": { "...": "the stored rich text area; do not render this directly" },
  "_richLabelHtml": "<p>I accept the <a href=\"/privacy-policy\">Privacy policy</a></p>"
}
```

Render `_richLabelHtml`, not the content inside `richLabel`.

### Why `_richLabelHtml`

When an editor links to a page on the site, Apostrophe stores the link as a placeholder, such as `href="#apostrophe-permalink-…?updateTitle=1"`. It replaces placeholders with real URLs only when it renders the page itself. The REST API returns the stored placeholders, so a headless front end would get broken links.

The new module resolves them when the form is loaded and adds the result as `_richLabelHtml`. Links to pages on the site get their current URL, and their link text follows the page title. External links are unchanged. Properties that start with `_` are never saved; Apostrophe adds them to each response.

If your React app already resolves `#apostrophe-permalink-` placeholders for other rich text, you can use that code instead.

**Page URLs:** the resolved URLs are Apostrophe's page URLs, such as `/privacy-policy`. If your React routes are different, map them in your app.

## Submitting

Nothing changes. The value is stored exactly as for the built-in checkbox field:

```json
{ "privacy-consent": true }
```

Send it in the same request your app already makes to `/api/v1/@apostrophecms/form/submit`. If the box is required and the value is `false`, the API rejects the submission with a `400` and a field error for `privacy-consent`, as it does for the built-in checkbox.

## How editors use it

1. Open a form and add a field. Choose **Checkbox with rich text label**.
2. In **Label shown to visitors**, type the text. Select the words to link and use the link button. Links can point to a page on the site or to an external URL.
3. Fill in **Field label (plain text)**. This builds the field name and identifies the field in submissions and emails. Visitors do not see it.
4. Set **Required** if visitors must tick the box to submit.

If the rich text label is left empty, the field falls back to the plain-text label.

**Replacing an existing checkbox:** if the editor gives the new field the same plain-text label as the old one, it gets the same field name. New submissions then use the same key as old ones, so exports and emails stay consistent.

## Accessibility

Rich text contains block elements (`<p>`), and these are not valid inside a `<label>` element. Both the React component and the server template name the checkbox with `aria-labelledby` instead, so screen readers read the rich text as the checkbox's label.

One difference from a regular checkbox: clicking the label text does not tick the box. Visitors tick the box itself. This also means clicking the privacy policy link never ticks the box by accident.

## Customizing

- **Toolbar:** the label allows bold, italic and links. Change `toolbar` in `richLabel` in `index.js` to allow more or less.
- **"(Required)" text in React:** the component uses English. Replace it with your app's translations.

## Try it in this starter kit

```bash
npm install
npm run dev
```

1. Create an admin user: `node app @apostrophecms/user:add admin admin`.
2. Log in at `/login`. Create a page to link to, such as "Privacy policy".
3. Create a form under **Forms**. Add a **Checkbox with rich text label** field and link to that page.
4. Add the form to a page with the **Form** widget, and publish the page and the form.
5. Read the form from the REST API to see `_richLabelHtml`, for example `/api/v1/@apostrophecms/form/<form _id>` while logged in.
