// REFERENCE ONLY: a React component for a headless front end.
//
// This file is not used by this Apostrophe project. Apostrophe's own `.jsx`
// templates (in `modules/` and `views/`) are server-side templates, not React.
// Copy this component into your React app and adapt it to your form code.
//
// It renders one `rich-text-boolean-field` widget (a single checkbox) from
// the REST API. In the API response, form fields are the widgets in
// `form.contents.items`. When a page places a form with the form widget, the
// form is in that widget's `_form[0]`.
//
// Example widget from the API:
//
//   {
//     "type": "rich-text-boolean-field",
//     "fieldName": "privacy-consent",
//     "fieldLabel": "Privacy consent",
//     "required": true,
//     "checked": false,
//     "_richLabelHtml": "I accept the <a href=\"/privacy\">privacy policy</a>"
//   }
//
// Submitting: send `{ [widget.fieldName]: true | false }`, exactly as for the
// built-in checkbox field, in the same request your app already makes to
// `/api/v1/@apostrophecms/form/submit`.

import { useId } from 'react';

export default function RichTextCheckbox({
  widget,
  // Controlled value. Your form state should start from `widget.checked`.
  checked,
  onChange,
  // Optional error message from a rejected submission, for this field
  error
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className='rich-check'>
      <div className='rich-check__option'>
        <input
          type='checkbox'
          id={id}
          className='rich-check__input'
          name={widget.fieldName}
          checked={checked}
          onChange={event => onChange(event.target.checked)}
          required={Boolean(widget.required)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
        />
        <label htmlFor={id} className='rich-check__label'>
          <RichLabel html={widget._richLabelHtml} fallback={widget.fieldLabel} />
          {widget.required && <span className='rich-check__required'> (Required)</span>}
        </label>
      </div>
      {error && <p id={errorId} className='rich-check__message'>{error}</p>}
    </div>
  );
}

// Renders `_richLabelHtml`, or the plain-text label when it is empty.
//
// `_richLabelHtml` is safe to insert: Apostrophe sanitizes rich text when it
// is saved, the label toolbar only allows bold, italic and links, and the
// HTML is inline (no paragraphs), so it is valid inside <label>. Clicking
// the text ticks the box; clicking a link opens the link instead.
//
// Links to pages on the site are already resolved to Apostrophe's page URLs.
// Map them to your app's routes if they differ.
export function RichLabel({ html, fallback }) {
  if (!html) {
    return fallback;
  }
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
