// REFERENCE ONLY: a React component for a headless front end.
//
// This file is not used by this Apostrophe project. Apostrophe's own `.jsx`
// templates (in `modules/` and `views/`) are server-side templates, not React.
// Copy this component into your React app and adapt it to your form code.
//
// It renders one `rich-text-boolean-field` widget from the REST API. In the
// API response, form fields are the widgets in `form.contents.items`. When a
// page places a form with the form widget, the form is in that widget's
// `_form[0]`.
//
// Example widget from the API:
//
//   {
//     "type": "rich-text-boolean-field",
//     "fieldName": "privacy-consent",
//     "fieldLabel": "Privacy consent",
//     "required": true,
//     "checked": false,
//     "_richLabelHtml": "<p>I accept the <a href=\"/privacy\">privacy policy</a></p>"
//   }
//
// Submitting: send the value exactly as for the built-in checkbox field,
// `{ [widget.fieldName]: true | false }`, in the same request your app
// already makes to `/api/v1/@apostrophecms/form/submit`.

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
  const labelId = `${id}-label`;
  const errorId = `${id}-error`;
  const hasRichLabel = Boolean(widget._richLabelHtml);

  return (
    <div className='rich-text-boolean-field'>
      <input
        type='checkbox'
        id={id}
        name={widget.fieldName}
        checked={checked}
        onChange={event => onChange(event.target.checked)}
        required={Boolean(widget.required)}
        aria-labelledby={hasRichLabel ? labelId : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
      />
      {hasRichLabel
        ? (
          // Rich text contains block elements (p), which are not valid
          // inside <label>, so the checkbox is named by aria-labelledby.
          //
          // `_richLabelHtml` is safe to insert: Apostrophe sanitizes rich
          // text when it is saved, and links to pages on the site are
          // already resolved to real URLs. Those URLs are Apostrophe's page
          // URLs; map them to your app's routes if they differ.
          <div id={labelId} className='rich-text-boolean-field__label'>
            <div dangerouslySetInnerHTML={{ __html: widget._richLabelHtml }} />
            {widget.required && <span> (Required)</span>}
          </div>
        )
        : (
          // No rich text yet: fall back to the plain-text label
          <label htmlFor={id}>
            {widget.fieldLabel}
            {widget.required && <span> (Required)</span>}
          </label>
        )}
      {error && (
        <p id={errorId} className='rich-text-boolean-field__error'>{error}</p>
      )}
    </div>
  );
}
