const path = require('path');
const shortName = 'a3-boilerplate';

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, 'data', `${shortName}.sqlite`)
  },
  useNullAsDefault: true
});

const sql = require('@apostrophecms/sql')({
  knex,
  metadata: {
    folder: path.join(__dirname, 'sql-metadata')
  }
});

require('apostrophe')({
  shortName,
  modules: {
    '@apostrophecms/db': {
      options: {
        // Substitute for mongodb database connection
        client: sql
      }
    },
    '@apostrophecms/rich-text-widget': {
      options: {
        className: 'bp-rich-text'
      }
    },
    '@apostrophecms/image-widget': {
      options: {
        className: 'bp-image-widget'
      }
    },
    '@apostrophecms/video-widget': {
      options: {
        className: 'bp-video-widget'
      }
    },
    // `asset` supports the project's webpack build for client-side assets.
    asset: {},
    // The project's first custom page type.
    'default-page': {}
  }
});
