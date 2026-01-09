export default {
  options: {
    myGenericColor: 'red'
  },
  fields: {
    add: {
      textColor: {
        type: 'color',
        label: 'Text Color',
        help: 'Choose a color for the text',
        selector: 'body',
        property: 'color'
      },
      backgroundColor: {
        type: 'color',
        label: 'Background Color',
        help: 'Choose a background color',
        selector: 'body',
        property: 'background-color',
        mediaQuery: '(min-width: 768px)'
      },
      textDecoration: {
        type: 'select',
        label: 'Text Decoration',
        selector: 'body',
        property: 'text-decoration',
        choices: [
          {
            label: 'None',
            value: 'none'
          },
          {
            label: 'Underline',
            value: 'underline'
          }
        ]
      },
      fontSize: {
        label: 'Font Size',
        type: 'range',
        min: 1,
        max: 40,
        step: 1,
        def: 30,
        unit: 'px',
        property: 'font-size',
        selector: 'body'
      }
    },
    group: {
      colors: {
        label: 'Colors',
        fields: [ 'textColor', 'backgroundColor' ]
      },
      typography: {
        label: 'Typography',
        fields: [ 'textDecoration' ],
        group: {
          fonts: {
            label: 'Fonts',
            inline: true,
            fields: [ 'fontSize' ]
          }
        }
      }
    }
  }
};
