// Part of the core - `@apostrophecms/translation` module.
const _ = require('lodash');

module.exports = {
  options: {
    alias: 'translation',
    enabled: true
  },

  init(self) {
    self.providers = [];
    self.enableBrowserData();
  },

  handlers(self) {
    return {
      // Translate the document.
      '@apostrophecms/doc-type:beforeLocalized': {
        // `draft` is the document to translate
        // `source` is the locale to translate from
        // `target` is the locale to translate to
        // `options`
        // - update: boolean
        // - provider: ID of the provider to use, usually sent by
        // the UI (not implemented yet)
        async submitTranslation(req, draft, {
          source, target, options
        }) {
          await self.submitTranslation(req, draft, {
            source,
            target,
            options
          });
        }
      },

      // Manage the document translation meta. Set state to `finalized` if
      // when appropriate, do not copy the meta to the published document.
      '@apostrophecms/doc-type:beforePublished': {
        async manageTranslationMeta(req, {
          firstTime, draft, published
        }) {
          const meta = draft.aposTranslationMeta;
          if (!meta || meta.state === 'finalized') {
            return;
          }

          if (self.getProvider(draft.aposTranslationMeta?.provider.id)) {
            return;
          }

          if (meta.state === 'translated') {
            draft.aposTranslationMeta.state = 'finalized';
          }
          delete published.aposTranslationMeta;
        }
      }
    };
  },

  methods(self) {
    return {
      getProvider(providerId) {
        return self.providers.find(({ config }) => (
          config.id === providerId
        )) || self.providers[0];
      },

      // Public API. `submitTranslation` handler should be present in the module
      // that wants to provide translations. It will be called with the
      // following arguments:
      // - req: the request object
      // - source: the locale to translate from
      // - target: the locale to translate to
      // - data: the data to translate - array of objects with `text`, either
      //   `path` or `id` (or both, `id` represents `field._id` if available)
      //   properties.
      //   - `text` is the text to translate
      //   - `path` is the dot path to the field that contains the text, see
      //     `apos.util.get()` for more details on the format.
      //   - `_id` is `object._id` that contains the text, optional
      //   - `metaType` e.g. area, widget, array, etc., optional.
      //   - `type` is the field type.
      // It should return an object with the following properties:
      // - state: 'pending' or 'translated'
      // - fields: array of objects with the following properties:
      //   - `translated`: the translated text
      //
      // `provider` is an object with the following properties:
      // - id: the provider ID
      // - label: the provider label
      // - instant: if true, the translation will be returned immediately,
      //   otherwise the translation will be considered asynchronous. If skipped,
      //   the translation will be considered synchronous (true by default).
      //
      // Usually this handler shouldn't be called directly, but through the
      // the module's `addProvider(config)` method.
      addProvider(module, provider) {
        if (self.options.enabled === false) {
          self.logDebug('add-provider-skip', 'Not enabled');
          return;
        }

        self.providers.push({
          submitHandler: module.submitTranslation,
          config: provider
        });
      },

      async submitTranslation(req, draft, {
        source, target, options
      }) {
        // XXX investigate options.update and why it's "true".
        if (self.options.enabled === false) {
          self.logDebug(
            req,
            'before-localize-skip',
            'Not enabled or update requested',
            {
              options,
              enabled: self.options.enabled
            }
          );
          return;
        }

        if (self.providers.length === 0) {
          self.logDebug(req, 'before-localize-skip', 'No providers available');
          return;
        }

        const provider = self.getProvider(options.provider);

        if (!provider) {
          throw self.apos.error('notfound', 'Provider not found');
        }

        const meta = self.getLocalizationMeta(req, draft, provider);
        if (!meta.fields.length) {
          self.logDebug(req, 'before-localize-skip', 'No fields to translate');
          return;
        }

        self.logDebug(req, 'before-localize', {
          source,
          target,
          meta
        });
        // We send a flat array of items with only `text` property and expect
        // the same array back with translated `text` property.
        const result = await provider
          .submitHandler(req, {
            source,
            target,
            data: meta
          });

        self.logDebug(req, 'before-apply', {
          meta,
          result
        });

        self.applyTranslation(req, draft, meta, result);

        self.logDebug(req, 'after-localize', {
          aposTranslationMeta: draft.aposTranslationMeta
        });

        await self.apos.notify(
          req,
            `Successfully translated ${result.fields.length} fields by ${meta.provider.label}.`,
            {
              type: 'success',
              dismiss: false
            }
        );
      },

      // Fake stuff, just for prototyping, it's fairly more complicated than
      // that (recursion, deep objects, arrays, etc.)
      getLocalizationMeta(req, draft, provider) {
        const result = {
          version: '1.0',
          state: 'pending',
          provider: {
            id: provider.config.id,
            label: provider.config.label
          },
          fields: []
        };

        const manager = self.apos.doc.getManager(draft.type);
        if (!manager) {
          return result;
        }

        const schema = manager.schema;
        for (const field of schema) {
          if (!field.translate === false) {
            continue;
          }

          const value = _.get(draft, field.name);
          switch (field.type) {
            case 'string':
              result.fields.push({
                path: field.name,
                schemaPath: [ field.name ],
                text: value,
                metaType: 'string',
                type: field.type
              });
              break;

            case 'slug': {
              const formatted = self.apos.util.slugify(
                value.split('/').pop(),
                { separator: ' ' }
              );
              result.fields.push({
                path: field.name,
                schemaPath: [ field.name ],
                text: formatted,
                metaType: 'string',
                type: field.type
              });
              break;
            }

            case 'area': {
              result.fields.push(...self.getRichTextFrom(value, [ field.name ]));
              break;
            }
          }
        }

        return result;
      },

      // A naive implementation again, just for prototyping.
      // It lacks validation, error handling, etc.
      applyTranslation(req, draft, meta, translated) {
        const manager = self.apos.doc.getManager(draft.type);
        if (!manager) {
          return;
        }

        const newMeta = {
          ...meta,
          ...translated,
          fields: []
        };

        if (newMeta.state === 'pending') {
          newMeta.fields = meta.fields;
          draft.aposTranslationMeta = newMeta;
          return;
        }

        for (const [ index, item ] of translated.fields.entries()) {
          const field = meta.fields[index];
          const oldText = self.apos.util.get(draft, field.path);

          // Dirty, as it should be when prototyping.
          if (field.type !== 'slug' && oldText !== field.text) {
            self.logDebug(
              req,
              'apply-translation-skip',
              'Skipping, source text has been changed',
              {
                documentText: oldText,
                tranlateSource: field.text
              }
            );
            continue;
          }

          if (!item.translated) {
            self.logDebug(
              req,
              'apply-translation-skip',
              'Skipping, no translation provided',
              field
            );
            continue;
          }

          let value = item.translated;
          switch (field.type) {
            case 'slug': {
              const prefix = oldText.split('/').slice(0, -1).join('/');
              value = prefix + '/' + self.apos.util.slugify(value);
              break;
            }
          }

          self.apos.util.set(draft, field.path, value);

          const metaField = {
            ...item,
            ...field
          };
          delete metaField.translated;
          newMeta.fields.push(metaField);
        }

        // Can be migrated in the future to `aposTranslation` collection.
        draft.aposTranslationMeta = newMeta;
      },

      // Example handler to extract widgets from an area. It's a modified
      // version of the `@apostrophecms/area:richText()`.
      // It's here to demonstrate how we can handle complex data structures
      // via single string `path` identifiers.
      getRichTextFrom(area, schemaPath) {
        const winners = [];
        if (!area || typeof area !== 'object') {
          return winners;
        }
        self.apos.doc.walk(area, function (o, key, value, dotPath, ancestors) {
          if (test(value)) {
            winners.push(value);
          }
        });

        return winners.map(({
          _id, content, metaType, type
        }) => ({
          _id,
          path: `@${_id}.content`,
          // Keep only root field name,
          // not important, widgets are identified by `_id` anyway.
          schemaPath,
          metaType,
          type,
          text: content
        }));

        function test(item) {
          if (!item || typeof item !== 'object') {
            return false;
          }
          if (!_.includes(self.apos.area.richTextWidgetTypes, item.type)) {
            return false;
          }
          return true;
        }
      }
    };
  },

  extendMethods(self) {
    return {
      getBrowserData(_super, req) {
        const data = _super(req);
        data.providers = self.providers
          .map(({ config }) => ({
            label: config.label,
            id: config.id
          }));
        data.enabled = self.options.enabled && self.providers.length > 0;

        return data;
      }
    };
  }
};
