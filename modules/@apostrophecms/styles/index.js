export default {
  styles: {
    add: {
      bodyFont: {
        type: 'string',
        label: 'Body Font Family',
        selector: 'body',
        property: 'font-family',
        def: 'system-ui, sans-serif'
      },
      lineHeight: {
        type: 'range',
        label: 'Line Height',
        selector: 'body',
        property: 'line-height',
        min: 1,
        max: 2.5,
        step: 0.1,
        def: 1.5
      },
      letterSpacing: {
        type: 'range',
        label: 'Letter Spacing',
        selector: 'body',
        property: 'letter-spacing',
        min: -0.05,
        max: 0.2,
        step: 0.01,
        def: 0,
        unit: 'em'
      }
    },
    group: {
      typography: {
        label: 'Typography',
        fields: ['bodyFont', 'lineHeight', 'letterSpacing']
      }
    }
  }
};