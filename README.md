# Apostrophe 3 demo and test project

## Get started

Install dependencies: `npm install`

## Running the project

Run `npm run dev` to build the Apostrophe UI and start the site up. Remember, this is during alpha development, so we're all in "dev mode." The `dev` script will watch for saves in client-side CSS and Javascript and trigger a build and page refresh if they are detected. It will also restart the app when server-side code is saved.

## Debugging the project in IE11

This project is set up with "hot reloading" in webpack, so your changes to the frontend .js and .scss files reload automatically. This is great, but it is incompatible with IE11.

So to test in IE11, use:

```
IE11=1 npm run dev
```

This is only an issue in development. In production the project-level frontend build output is transpiled to be IE11-compatible. (This does not include Apostrophe's admin UI.)

## You really want the docs

Right now, [all the juicy info about A3 is in the a3 docs](https://a3.docs.apostrophecms.org), so head over there and start reading! This boilerplate project is a fun introduction to the UI, but you'll want to know more to really try it out.

