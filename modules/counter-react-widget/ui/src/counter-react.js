import { debounce } from 'lodash';
import { createRoot } from 'react-dom/client';
import { createElement } from 'react';
import App from './app/App.jsx';

const mount = (el, props) => {
  const app = createElement(App, props);
  createRoot(el).render(app);
};
const mountDebounced = debounce(mount, 100);

// Environments are available here (`import.meta.env.PROD`, `import.meta.env.DEV`, etc.)
// https://vite.dev/guide/env-and-mode.html
export default () => {
  apos.util.widgetPlayers['counter-react'] = {
    selector: '[data-apos-react-widget]',
    player: function (el) {
      // 1. Grab the data from the `data-*` attributes.
      // See `modules/asset/ui/src/index.js` for the implementation
      const {
        id,
        widget,
        options
      } = apos.util.parsePlayerData(el);

      // 2. Debounce the mount if we are in edit mode (player triggered multiple times)
      const effectiveMount = options.editMode === 'true'
        ? mountDebounced
        : mount;

      // 3. Mount and render the app
      effectiveMount(el, {
        id,
        widget,
        options
      });
    }
  };
};
