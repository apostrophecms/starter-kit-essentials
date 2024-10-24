module.exports = {
  extend: '@apostrophecms/page-type',
  options: {
    label: 'React Todo App'
  },
  build: {
    vite: {
      bundles: {
        todoapp: {}
      }
    }
  },
  components(self) {
    return {
      reactRefresh(req, data) {
        return {};
      }
    };
  },
  handlers (self) {
    return {
      'apostrophe:modulesRegistered': {
        injectReactHMR() {
          self.apos.template.prepend({
            where: 'head',
            when: 'hmr',
            bundler: 'vite',
            component: 'todoapp:reactRefresh'
          });
        }
      }
    };
  }
};
