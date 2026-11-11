// A checkbox form field whose visible label is rich text, so editors can
// include links (for example, "I accept the privacy policy").
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
export default {
  extend: '@apostrophecms/form-boolean-field-widget',
  options: {
    label: 'project:richTextCheckbox',
    icon: 'toggle-switch-outline-icon'
  },
  fields: {
    add: {
      // Keep the plain-text label. It builds the field name and identifies
      // the field in submissions, so it stays required. Only its label and
      // help text change, to explain its role.
      fieldLabel: {
        label: 'project:richTextCheckboxFieldLabel',
        help: 'project:richTextCheckboxFieldLabelHelp',
        type: 'string',
        required: true
      },
      richLabel: {
        label: 'project:richTextCheckboxRichLabel',
        help: 'project:richTextCheckboxRichLabelHelp',
        type: 'area',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [ 'bold', 'italic', 'link' ],
              insert: []
            }
          }
        }
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
      // For headless front ends. Rich text links to pages on this site are
      // stored as placeholders (`#apostrophe-permalink-...`) and only become
      // real URLs when Apostrophe renders the widget. The REST API returns
      // the stored placeholders, so resolve them here and expose the result
      // as `_richLabelHtml`. Properties starting with `_` are never saved.
      async load(_super, req, widgets) {
        await _super(req, widgets);
        const richText = self.apos.modules['@apostrophecms/rich-text-widget'];
        for (const widget of widgets) {
          const items = widget.richLabel?.items || [];
          let html = '';
          for (const item of items) {
            html += await richText.renderRichText(req, item.content);
          }
          widget._richLabelHtml = html;
        }
      }
    };
  }
};
