/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apos-build/@apostrophecms/vite/default/src/**/*.{js,jsx}',
    './modules/**/views/**/*.html',
    './views/**/*.html'
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
