import { renderRichLabel } from '../../lib/rich-label.js';

// A single checkbox form field whose visible label is rich text, so editors
// can include links (for example, "I accept the privacy policy").
//
// It extends the built-in checkbox field, so it inherits:
// - the `fieldLabel`, `fieldName`, `required` and `checked` fields
// - server-side sanitizing and the required check on submit
// - the browser-side value collector and conditional logic for
//   server-rendered forms, because `widget.jsx` keeps the
//   `data-apos-form-boolean` attribute
//
// Existing checkbox fields are not changed. Editors add this field type
// where they need a link in the label.
//
// Requires Apostrophe 4.34.0 or newer, for the `richText` field type.
export default {
  extend: '@apostrophecms/form-boolean-field-widget',
  options: {
    label: 'project:richTextCheckbox',
    icon: 'toggle-switch-outline-icon'
  },
  fields: {
    add: {
      richLabel: {
        label: 'project:richTextCheckboxRichLabel',
        help: 'project:richTextCheckboxRichLabelHelp',
        type: 'richText',
        options: {
          toolbar: [ 'bold', 'italic', 'link' ]
        }
      },
      // Keep the plain-text label. It builds the field name and identifies
      // the field in submissions, so it stays required. Only its label and
      // help text change, to explain its role.
      fieldLabel: {
        label: 'project:richTextCheckboxFieldLabel',
        help: 'project:richTextCheckboxFieldLabelHelp',
        type: 'string',
        required: true
      }
    },
    group: {
      basics: {
        label: 'project:basics',
        fields: [ 'richLabel', 'fieldLabel', 'fieldName', 'required', 'checked' ]
      }
    }
  },
  extendMethods(self) {
    return {
      // Adds `_richLabelHtml`: the label as inline HTML with page links
      // resolved, for templates and for headless front ends. Properties
      // starting with `_` are never saved.
      async load(_super, req, widgets) {
        await _super(req, widgets);
        for (const widget of widgets) {
          widget._richLabelHtml = await renderRichLabel(self.apos, req, widget.richLabel);
        }
      }
    };
  }
};
