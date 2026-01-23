// modules/@apostrophecms/styles/index.js

export default {
  styles: {
    add: {
      // ============================================
      // TYPOGRAPHY CONTROLS
      // ============================================

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
      },

      // ============================================
      // RESPONSIVE TYPOGRAPHY
      // Demonstrates media query usage for device-specific styling
      // ============================================

      bodyFontSizeMobile: {
        type: 'range',
        label: 'Body Font Size (Mobile)',
        selector: 'body',
        property: 'font-size',
        min: 14,
        max: 18,
        step: 1,
        def: 16,
        unit: 'px',
        mediaQuery: '(max-width: 767px)'  // Mobile breakpoint
      },
      bodyFontSizeTablet: {
        type: 'range',
        label: 'Body Font Size (Tablet)',
        selector: 'body',
        property: 'font-size',
        min: 14,
        max: 20,
        step: 1,
        def: 16,
        unit: 'px',
        mediaQuery: '(min-width: 768px) and (max-width: 1023px)'  // Tablet breakpoint
      },
      bodyFontSizeDesktop: {
        type: 'range',
        label: 'Body Font Size (Desktop)',
        selector: 'body',
        property: 'font-size',
        min: 14,
        max: 22,
        step: 1,
        def: 18,
        unit: 'px',
        mediaQuery: '(min-width: 1024px)'  // Desktop breakpoint
      },

      // ============================================
      // MAIN LAYOUT CONTROLS
      // Using CSS custom property for flexible control
      // ============================================

      contentMaxWidth: {
        type: 'range',
        label: 'Content Max Width',
        selector: ':root',
        property: '--content-max-width',
        min: 800,
        max: 1600,
        step: 50,
        def: 1200,
        unit: 'px'
      },

      // ============================================
      // RESPONSIVE SPACING
      // Shows how spacing can adapt to screen size
      // ============================================

      mainPaddingMobile: {
        type: 'range',
        label: 'Main Padding (Mobile)',
        selector: 'main',
        property: [ 'padding-left', 'padding-right' ],
        min: 0,
        max: 32,
        step: 4,
        def: 16,
        unit: 'px',
        mediaQuery: '(max-width: 767px)'
      },
      mainPaddingDesktop: {
        type: 'range',
        label: 'Main Padding (Desktop)',
        selector: 'main',
        property: [ 'padding-left', 'padding-right' ],
        min: 0,
        max: 64,
        step: 8,
        def: 32,
        unit: 'px',
        mediaQuery: '(min-width: 768px)'
      },

      // ============================================
      // IMAGE WIDGET GLOBAL DEFAULTS
      //
      // NOTE: These selectors depend on the className options
      // configured in app.js for each widget. If you change those
      // className values, you must update these selectors accordingly.
      //
      // Current widget classNames (from app.js):
      //   - @apostrophecms/image-widget: 'bp-image-widget'
      //   - @apostrophecms/video-widget: 'bp-video-widget'
      //   - @apostrophecms/rich-text-widget: 'bp-rich-text'
      // ============================================

      // ============================================
      // IMAGE WIDGET GLOBAL DEFAULTS
      // ============================================

      imageDefaultWidth: {
        type: 'range',
        label: 'Default Width',
        selector: '.bp-image-widget',
        property: 'width',
        min: 0,
        max: 100,
        step: 10,
        def: 100,
        unit: '%'
      },
      imageDefaultAlignment: {
        type: 'select',
        label: 'Default Alignment',
        selector: '.bp-image-widget',
        class: true,
        choices: [
          {
            label: 'Left',
            value: 'apos-left'
          },
          {
            label: 'Center',
            value: 'apos-center'
          },
          {
            label: 'Right',
            value: 'apos-right'
          }
        ]
      },

      // Responsive image sizing example
      imageMaxWidthMobile: {
        type: 'range',
        label: 'Max Width (Mobile)',
        selector: '.bp-image-widget',
        property: 'max-width',
        min: 200,
        max: 600,
        step: 50,
        def: 400,
        unit: 'px',
        mediaQuery: '(max-width: 767px)'
      },

      // ============================================
      // VIDEO WIDGET GLOBAL DEFAULTS
      // ============================================

      videoDefaultWidth: {
        type: 'range',
        label: 'Default Width',
        selector: '.bp-video-widget',
        property: 'width',
        min: 0,
        max: 100,
        step: 10,
        def: 100,
        unit: '%'
      },
      videoDefaultAlignment: {
        type: 'select',
        label: 'Default Alignment',
        selector: '.bp-video-widget',
        class: true,
        choices: [
          {
            label: 'Left',
            value: 'apos-left'
          },
          {
            label: 'Center',
            value: 'apos-center'
          },
          {
            label: 'Right',
            value: 'apos-right'
          }
        ]
      },

      // ============================================
      // RICH TEXT WIDGET GLOBAL DEFAULTS
      // ============================================

      richTextDefaultWidth: {
        type: 'range',
        label: 'Default Width',
        selector: '.bp-rich-text',
        property: 'width',
        min: 0,
        max: 100,
        step: 10,
        def: 100,
        unit: '%'
      },
      richTextDefaultMargin: {
        preset: 'margin',
        label: 'Default Margin',
        selector: '.bp-rich-text'
      },
      richTextDefaultPadding: {
        preset: 'padding',
        label: 'Default Padding',
        selector: '.bp-rich-text'
      },

      // ============================================
      // LAYOUT WIDGET GLOBAL DEFAULTS
      // ============================================

      layoutDefaultWidth: {
        type: 'range',
        label: 'Default Width',
        selector: '.layout-widget',
        property: 'width',
        min: 0,
        max: 100,
        step: 10,
        def: 100,
        unit: '%'
      },

      // Responsive layout spacing
      layoutGapMobile: {
        type: 'range',
        label: 'Column Gap (Mobile)',
        selector: '.layout-widget',
        property: 'gap',
        min: 0,
        max: 32,
        step: 4,
        def: 16,
        unit: 'px',
        mediaQuery: '(max-width: 767px)'
      },
      layoutGapDesktop: {
        type: 'range',
        label: 'Column Gap (Desktop)',
        selector: '.layout-widget',
        property: 'gap',
        min: 0,
        max: 64,
        step: 8,
        def: 32,
        unit: 'px',
        mediaQuery: '(min-width: 768px)'
      }
    },

    // ============================================
    // INTERFACE ORGANIZATION
    // ============================================

    group: {
      // Tab 1: Typography
      typography: {
        label: 'Typography',
        group: {
          // Section: Base typography
          base: {
            label: 'Base Typography',
            fields: [ 'bodyFont', 'lineHeight', 'letterSpacing' ]
          },
          // Section: Responsive typography
          responsive: {
            label: 'Responsive Font Sizes',
            fields: [
              'bodyFontSizeMobile',
              'bodyFontSizeTablet',
              'bodyFontSizeDesktop'
            ]
          }
        }
      },

      // Tab 2: Layout
      layout: {
        label: 'Layout',
        group: {
          // Section: Container
          container: {
            label: 'Container',
            fields: [ 'contentMaxWidth' ]
          },
          // Section: Responsive spacing
          spacing: {
            label: 'Responsive Spacing',
            fields: [
              'mainPaddingMobile',
              'mainPaddingDesktop'
            ]
          }
        }
      },

      // Tab 3: Widget Defaults
      widgetDefaults: {
        label: 'Widget Defaults',
        group: {
          imageDefaults: {
            label: 'Image Widgets',
            fields: [
              'imageDefaultWidth',
              'imageDefaultAlignment',
              'imageMaxWidthMobile'
            ]
          },
          videoDefaults: {
            label: 'Video Widgets',
            fields: [
              'videoDefaultWidth',
              'videoDefaultAlignment'
            ]
          },
          richTextDefaults: {
            label: 'Rich Text Widgets',
            fields: [
              'richTextDefaultWidth',
              'richTextDefaultMargin',
              'richTextDefaultPadding'
            ]
          },
          layoutDefaults: {
            label: 'Layout Widgets',
            fields: [
              'layoutDefaultWidth',
              'layoutGapMobile',
              'layoutGapDesktop'
            ]
          }
        }
      }
    }
  }
};
