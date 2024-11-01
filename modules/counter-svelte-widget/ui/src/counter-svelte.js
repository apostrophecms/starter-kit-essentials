import { mount } from 'svelte';
import App from './app/App.svelte';

// Environments are available here (`import.meta.env.PROD`, `import.meta.env.DEV`, etc.)
// https://vite.dev/guide/env-and-mode.html
export default () => {
  apos.util.widgetPlayers['counter-svelte'] = {
    selector: '[data-apos-svelte-widget]',
    player
  };
};

function player(el) {
  // 1. Do nothing if no element or if already mounted
  if (!el || el.childNodes.length > 0) {
    return;
  }
  // 2. Grab the data from the `data-*` attributes.
  // See `modules/asset/ui/src/index.js` for the implementation
  const {
    id,
    widget,
    options
  } = apos.util.parsePlayerData(el);

  // 3. Mount and render the app
  mount(App, {
    target: el,
    props: {
      id,
      widget,
      options
    }
  });
}