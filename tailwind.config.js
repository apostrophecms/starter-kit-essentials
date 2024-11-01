/** @type {import('tailwindcss').Config} */
export default {
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
