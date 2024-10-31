# ApostropheCMS and Vite demo (based on the essentials starter kit)

## Counter apps as widgets (React, Vue, Svelte) (demo)

All frameworks are integrated via single project level `apos.vite.config.mjs` file.

The default template when creating Vite app for React, Vue, or Svelte is a counter app. In this demo those are ported to ApostropheCMS widgets: `counter-react-widget`, `counter-vue-widget`, and `counter-svelte-widget` respectively. The respective UI code can be found in `ui/src` directories of these modules. Every widget has its own bundle, which is loaded only when the widget is present on the page (and no user is logged in).

Additionally, the default counter apps are enhanced to get initial data (props) from the server and communicate their state back to the server.

A page module `modules/counter-page` is created to demonstrate the usage of these widgets. It has an area `main` where you can add the widgets. 

The `modules/asset` module provides common features shared between all widgets and some integrations frameowrk specific integrations:
- a common CSS file to style the original counter app in a similar to the original style
- integrates `tailwindcss` for styling (see below)
- provides common nunjucks filter to stringify objects for `data-*` attributes
- a `counter` API endpoint to save the counter value per widget (with fake in-memory storage instead of a real database - all values will be "forgotten" after a server restart)
- the React refresh runtime injection, required for React HMR with Vite

## Tailwind CSS configuration steps (demo)

The following steps were performed to integrate Tailwind CSS with ApostropheCMS, following the official guide: https://tailwindcss.com/docs/guides/vite

It's not needed to follow these steps to use this demo. They are provided as a reference for those who want to integrate Tailwind CSS with ApostropheCMS.

1. Install Tailwind CSS (we skip `postcss` because it's internally managed by `vite`):
```bash
npm install -D tailwindcss autoprefixer
```

2. Init
```bash
npx tailwindcss init -p
```

3. Edit the created `tailwind.config.js` to become:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apos-build/@apostrophecms/vite/default/src/**/*.{js,jsx}',
    './modules/**/views/**/*.html',
    './views/**/*.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
Edit `apos.vite.config.mjs` to exclude the nunjucks templates from triggering page reloads:
```js
  // ...
  server: {
    watch: {
      // So that Tailwind CSS changes in the nunjucks templates do not trigger
      // page reloads. This is done by `nodemon` because we need a process restart.
      ignored: [
        path.join(__dirname, 'modules/views/**/*.html'),
        path.join(__dirname, 'views/**/*.html')
      ]
    }
  }
  // ...
```

4. Create `./modules/asset/ui/src/tailwind.css` with the following content:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

5. Edit `./modules/asset/ui/src/index.js` to import the CSS file:
```js
import './tailwind.css'
// The rest is the same
```

6. Edit `./modules/@apostrophecms/home-page/views/page.html` and add (server side rendering testing):
```html
    <div class="text-center">
      <span class="box-decoration-clone bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 leading-3">
        Hello World <br />
        From Tailwind CSS
      </span>
    </div>
```

7. `npm run dev`

Tailwind now works for both server-side and client-side rendering (HMR included). The original starter kit styles are preserved.


## Getting started

This Starter Kit, also known as a boilerplate project, serves as a template for initiating new projects and is intended for use in two main ways:

1. **Using Our CLI Tool**: Run our [CLI tool](https://github.com/apostrophecms/cli) to clone this template locally, install its dependencies, and set up an initial admin user. You accomplish this using:
   
   `apos create <my-project-name>`
  
2. **Manual Setup**: Manually `git clone` this repository and install its dependencies using `npm install`. Add an initial admin user with `node app @apostrophecms/user:add admin admin`.

For those who need to create multiple projects with additional base modules, consider [forking this repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks) into your organizational or personal GitHub account. Customize it to fit your needs. To use your customized template, run the following CLI command:

  `apos create <project-name> --starter=<repo-name>`

Here, `<repo-name>` should be the URL of your forked repository, excluding the `https://github.com/` part.

**Note: This template is NOT designed to be installed into an existing project.**

## Running the project

Run `npm run dev` to build the Apostrophe UI and start the site up. Remember, this is during alpha development, so we're all in "dev mode." The `dev` script will watch for saves in client-side CSS and Javascript and trigger a build and page refresh if they are detected. It will also restart the app when server-side code is saved.

## Making it your own

This boilerplate is designed so you can install and start running it right away. If you are starting a project that will go into production one day, there are a few things you should be sure to check:

- [ ] **Update the shortname.** You don't need to perform this step if you created your project using the CLI tool. The `shortname` option in `app.js` is used for the database name (unless another is given in the `@apostrophecms/db` module). You should change this to an appropriate project name before you start adding any users or content you would like to keep.
- [ ] **Update the Express.js session secret.** The secret is set to `undefined` initially in the `modules/@apostrophecms/express/index.js` file. You should update this to a unique string.
- [ ] **Decide if you want hot reloading on.** This boilerplate uses nodemon to restart the app when files are changed. In `modules/@apostrophecms/asset/index.js` there is an option enabled to refresh the browser on restart. If you like this, do nothing. If you don't, remove the option or set it to `false`. The option has no effect when the app is in production.
- [ ] **Update the `className` options in `app.js`.** This option is set for core widget types to provide CSS styling hooks. It is namespaced with `bp-` for "boilerplate." You will likely want to update that to match your general CSS class naming practices.

## You really want the docs

Right now, [all the juicy info is in the ApostropheCMS docs](https://docs.apostrophecms.org), so head over there and start reading! This boilerplate project is a fun introduction to the UI, but you'll want to know more to really try it out.

