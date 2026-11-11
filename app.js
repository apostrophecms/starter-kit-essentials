import 'dotenv/config';
import apostrophe from 'apostrophe';

apostrophe({
  root: import.meta,
  shortName: 'a4-boilerplate',
  modules: {
    // Apostrophe module configuration
    // *******************************
    //
    // NOTE: most configuration occurs in the respective modules' directories.
    // See modules/@apostrophecms/page/index.js for an example.
    //
    // Any modules that are not present by default in Apostrophe must at least
    // have a minimal configuration here to turn them on: `moduleName: {}`
    // ***********************************************************************
    // `className` options set custom CSS classes for Apostrophe core widgets.
    // NOTE: Changing this className will break global style selectors
    // configured in modules/@apostrophecms/styles/index.js
    '@apostrophecms/rich-text-widget': {
      options: {
        className: 'bp-rich-text'
      }
    },
    '@apostrophecms/image-widget': {
      options: {
        className: 'bp-image-widget'
      }
    },
    '@apostrophecms/video-widget': {
      options: {
        className: 'bp-video-widget'
      }
    },
    // `asset` supports the project's build for client-side assets.
    asset: {},
    // use vite for asset bundling and hot module reloading
    '@apostrophecms/vite': {},
    // The project's first custom page type.
    'default-page': {},
    'nested-layout-widget': {},
    'nested-column-widget': {},

    // Forms. The form piece type, the widget that places a form on a page,
    // and the built-in field types.
    '@apostrophecms/form': {},
    '@apostrophecms/form-widget': {},
    '@apostrophecms/form-text-field-widget': {},
    '@apostrophecms/form-textarea-field-widget': {},
    '@apostrophecms/form-select-field-widget': {},
    '@apostrophecms/form-radio-field-widget': {},
    '@apostrophecms/form-checkboxes-field-widget': {},
    '@apostrophecms/form-boolean-field-widget': {},
    '@apostrophecms/form-conditional-widget': {},
    '@apostrophecms/form-divider-widget': {},
    // Example: a checkbox field with a rich text label (see FORM-FIELD-EXAMPLE.md)
    'rich-text-boolean-field-widget': {}
  }
});
