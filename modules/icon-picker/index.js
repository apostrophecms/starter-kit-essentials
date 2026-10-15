// Registers the `iconPicker` field type: a searchable Lucide icon grid
// plus standard size/color/stroke/shape controls, stored together as
//
//   { name: 'map-pin', size: 'm', color: '#000000ff', strokeWidth: 2, shape: 'none' }
//
// Follows the "reusing standard fields" pattern from the docs: the style
// controls are a plain schema rendered by `AposSchema` in the browser and
// laundered by `apos.schema.convert` on the server.
//
// Render a stored value with
// `<Template templateName="icon-picker:icon" icon={value} />`.

import { icons as lucideIcons } from 'lucide';

export default {
  options: {
    alias: 'iconPicker',
    // Kebab-case Lucide names offered in the picker. Override in app.js to
    // curate a different set: https://lucide.dev/icons/
    icons: [
      'arrow-right', 'arrow-left', 'arrow-up-right', 'chevron-right',
      'chevron-left', 'chevron-down', 'plus', 'minus', 'check', 'search',
      'map-pin', 'globe', 'building-2', 'house', 'briefcase', 'tag', 'heart',
      'star', 'trending-up', 'download', 'upload', 'external-link', 'mail',
      'phone', 'calendar', 'clock', 'user', 'users', 'settings', 'info',
      'circle-alert', 'circle-check', 'lock', 'shopping-cart',
      'message-circle', 'play'
    ],
    // Size choices, in px
    sizes: {
      s: 16,
      m: 24,
      l: 32,
      xl: 48
    }
  },
  init(self) {
    self.iconNodes = self.loadIconNodes();
    self.enableBrowserData();
    self.addIconPickerFieldType();
  },
  methods(self) {
    return {
      // Map each configured kebab-case name to its Lucide icon node,
      // an array of `[ tag, attrs ]` pairs
      loadIconNodes() {
        const nodes = {};
        for (const name of self.options.icons) {
          const pascal = name.split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('');
          const node = lucideIcons[pascal];
          if (!node) {
            self.apos.util.warn(`icon-picker: unknown Lucide icon "${name}", skipping`);
            continue;
          }
          nodes[name] = node;
        }
        return nodes;
      },
      getStyleSchema() {
        return [
          {
            name: 'size',
            label: 'Size',
            type: 'select',
            def: 'm',
            choices: Object.keys(self.options.sizes).map(value => ({
              label: value.toUpperCase(),
              value
            }))
          },
          {
            name: 'color',
            label: 'Color',
            help: 'Leave empty to inherit the surrounding text color.',
            type: 'color'
          },
          {
            name: 'strokeWidth',
            label: 'Stroke width',
            type: 'range',
            min: 0.5,
            max: 3,
            step: 0.25,
            def: 2
          },
          {
            name: 'shape',
            label: 'Shape',
            type: 'select',
            def: 'none',
            choices: [
              {
                label: 'None',
                value: 'none'
              },
              {
                label: 'Circle',
                value: 'circle'
              },
              {
                label: 'Rounded',
                value: 'rounded'
              }
            ]
          }
        ];
      },
      addIconPickerFieldType() {
        self.apos.schema.addFieldType({
          name: 'iconPicker',
          convert: self.convertInput,
          isEmpty: (field, value) => !value?.name,
          vueComponent: 'InputIconPickerField'
        });
      },
      async convertInput(req, field, data, destination) {
        let input = data[field.name];
        if (input == null || typeof input !== 'object' || Array.isArray(input)) {
          input = {};
        }
        const name = self.apos.launder.string(input.name);
        const result = {
          name: self.iconNodes[name] ? name : ''
        };
        if (field.required && !result.name) {
          throw self.apos.error('required');
        }
        const errors = [];
        try {
          await self.apos.schema.convert(req, self.getStyleSchema(), input, result);
        } catch (e) {
          for (const error of e) {
            errors.push({
              path: error.path,
              error: error.error
            });
          }
        }
        destination[field.name] = result;
        if (errors.length) {
          throw errors;
        }
      },
      getIconNode(name) {
        return self.iconNodes[name] || null;
      },
      // Color field values are a color or a CSS custom property name,
      // e.g. a token set by `@apostrophecms/styles`
      getCssColor(color) {
        if (!color) {
          return null;
        }
        return color.startsWith('--') ? `var(${color})` : color;
      },
      getBrowserData(req) {
        return {
          schema: self.getStyleSchema(),
          icons: self.iconNodes,
          sizes: self.options.sizes
        };
      }
    };
  }
};
