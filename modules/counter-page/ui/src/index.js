import { createRoot } from 'react-dom/client';
import { createElement } from 'react';
import App from './app/App.jsx';
import './app/index.css';

export default () => {
  window.apos.util.onReady(() => {
    const mount = document.getElementById('react-app');
    if (!mount) {
      return;
    }
    const title = mount.dataset.title;
    const app = createElement(App, {
      title
    });
    createRoot(mount).render(app);
  });
};
