import { createRoot } from 'react-dom/client';
import { createElement } from 'react';
import App from './app/App.jsx';
import './app/index.css';

export default () => {
  window.apos.util.onReady(() => {
    const title = document.getElementById('react-app').dataset.title;
    const app = createElement(App, {
      title
    });
    createRoot(document.getElementById('react-app')).render(app);
  });
};
