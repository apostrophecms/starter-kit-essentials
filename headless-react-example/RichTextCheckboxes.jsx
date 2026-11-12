// REFERENCE ONLY: a React component for a headless front end.
//
// This file is not used by this Apostrophe project. Apostrophe's own `.jsx`
// templates (in `modules/` and `views/`) are server-side templates, not React.
// Copy this component into your React app and adapt it to your form code.
//
// It renders one `rich-text-checkboxes-field` widget (a list of choices;
// visitors tick any number of them) from the REST API. See
// `RichTextCheckbox.jsx` for where form fields are in the API response.
//
// Example widget from the API:
//
//   {
//     "type": "rich-text-checkboxes-field",
//     "fieldName": "consents",
//     "fieldLabel": "Consents",
//     "required": true,
//     "choices": [
//       {
//         "label": "Privacy policy",
//         "value": "privacy",
//         "_richLabelHtml": "I accept the <a href=\"/privacy\">privacy policy</a>"
//       },
//       {
//         "label": "Newsletter",
//         "value": "newsletter",
//         "_richLabelHtml": ""
//       }
//     ]
//   }
//
// Submitting: send `{ [widget.fieldName]: [ ...ticked values ] }`, exactly as
// for the built-in checkboxes field, for example `{ "consents": [ "privacy" ] }`.
// When `required` is true, at least one choice must be ticked.

import { useId } from 'react';
import { RichLabel } from './RichTextCheckbox.jsx';

export default function RichTextCheckboxes({
  widget,
  // Controlled value: the array of ticked choice values
  value,
  onChange,
  // Optional error message from a rejected submission, for this field
  error
}) {
  const id = useId();
  const errorId = `${id}-error`;

  function toggle(choiceValue, ticked) {
    // Keep the order of the choices
    onChange(
      widget.choices
        .map(choice => choice.value)
        .filter(v => (v === choiceValue ? ticked : value.includes(v)))
    );
  }

  return (
    <fieldset
      className='rich-check'
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? errorId : undefined}
    >
      <legend className='rich-check__legend'>
        {widget.fieldLabel}
        {widget.required && <span className='rich-check__required'> (Required)</span>}
      </legend>
      <div className='rich-check__options'>
        {widget.choices.map((choice, i) => (
          <div className='rich-check__option' key={choice.value}>
            <input
              type='checkbox'
              id={`${id}-${i}`}
              className='rich-check__input'
              name={widget.fieldName}
              value={choice.value}
              checked={value.includes(choice.value)}
              onChange={event => toggle(choice.value, event.target.checked)}
            />
            <label htmlFor={`${id}-${i}`} className='rich-check__label'>
              <RichLabel html={choice._richLabelHtml} fallback={choice.label} />
            </label>
          </div>
        ))}
      </div>
      {error && <p id={errorId} className='rich-check__message'>{error}</p>}
    </fieldset>
  );
}
