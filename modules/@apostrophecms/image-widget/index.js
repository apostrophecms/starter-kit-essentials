export default {
  // Showcase standard widget actions in the breadcrumb
  widgetOperations(self, options) {
    return {
      add: {
        editCustom: {
          placement: 'breadcrumb',
          action: 'edit',
          icon: 'cog-icon',
          tooltip: 'apostrophe:edit'
        }
      }
    };
  }
};
