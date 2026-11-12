import { renderRichLabel } from '../../lib/rich-label.js';

// A checkboxes form field (a list of choices; visitors tick any number of
// them) where each choice's visible label is rich text, so editors can
// include links (for example, "I accept the privacy policy").
//
// It extends the built-in checkboxes field, so it inherits:
// - the `fieldLabel`, `fieldName` and `required` fields
// - server-side sanitizing (only listed values are accepted) and the
//   required check on submit
// - the browser-side value collector and conditional logic for
//   server-rendered forms, because `widget.jsx` keeps the
//   `data-apos-form-checkboxes` attribute
//
// Existing checkboxes fields are not changed. Editors add this field type
// where they need links in the choices.
//
// Requires Apostrophe 4.34.0 or newer, for the `richText` field type.
export default {
  extend: '@apostrophecms/form-checkboxes-field-widget',
  options: {
    label: 'project:richTextCheckboxes',
    icon: 'checkbox-marked-outline-icon'
  },
  fields: {
    add: {
      // Same as the built-in `choices` field, plus `richLabel` on each choice
      choices: {
        label: 'aposForm:checkboxChoices',
        type: 'array',
        titleField: 'label',
        required: true,
        min: 1,
        fields: {
          add: {
            richLabel: {
              label: 'project:richTextChoiceRichLabel',
              help: 'project:richTextChoiceRichLabelHelp',
              type: 'richText',
              options: {
                toolbar: [ 'bold', 'italic', 'link' ]
              }
            },
            // The plain-text label stays required. It names the choice in
            // the editor, and it is the stored value when `value` is empty.
            label: {
              label: 'project:richTextChoiceLabel',
              help: 'project:richTextChoiceLabelHelp',
              type: 'string',
              required: true
            },
            value: {
              label: 'aposForm:checkboxChoicesValue',
              help: 'aposForm:checkboxChoicesValueHelp',
              type: 'string'
            }
          }
        }
      }
    }
  },
  extendMethods(self) {
    return {
      // Adds `_richLabelHtml` to each choice: the label as inline HTML with
      // page links resolved, for templates and for headless front ends.
      // Properties starting with `_` are never saved.
      async load(_super, req, widgets) {
        await _super(req, widgets);
        for (const widget of widgets) {
          for (const choice of widget.choices || []) {
            choice._richLabelHtml = await renderRichLabel(
              self.apos,
              req,
              choice.richLabel
            );
          }
        }
      }
    };
  }
};
