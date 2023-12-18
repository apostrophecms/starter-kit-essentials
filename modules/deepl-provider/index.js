const deepl = require('deepl-node');

module.exports = {
  options: {
    providerId: 'deepl',
    providerLabel: 'DeepL',
    apiSecret: process.env.DEEPL_API_SECRET || null,
    translateOptions: {
      preserveFormatting: true,
      formality: 'less',
      splitSentences: 'nonewlines',
      tagHandling: 'html'
    }
  },

  init(self) {
    self.translator = new deepl.Translator(self.options.apiSecret);
    self.addTranslationProvider({
      id: self.options.providerId,
      label: self.options.providerLabel
      // It's true by default.
      // instant: true,
    });
  },

  methods(self) {
    return {
      async submitTranslation(req, {
        source, target, data
      }) {
        const options = { ...self.options.translateOptions };

        // Usage detection
        const usage = await self.translator.getUsage();
        if (usage.anyLimitReached()) {
          self.logError('submit-translation', 'DeepL API limit reached');
          throw self.apos.error('locked', 'DeepL API limit reached');
        }

        // Language detection
        const sourceLanguages = await self.translator.getSourceLanguages();
        const srcLang = sourceLanguages
          .find(({ code }) => code.split('-')[0].toLowerCase() === source);
        const targetLanguages = await self.translator.getTargetLanguages();
        const trgLang = targetLanguages
          .find(({ code }) => code.split('-')[0].toLowerCase() === target);

        if (!srcLang) {
          throw self.apos.error('invalid', `Source language "${source}" is not supported.`);
        }
        if (!trgLang) {
          throw self.apos.error('invalid', `Target language "${target}" is not supported.`);
        }

        if (options.formality && !trgLang.supportsFormality) {
          delete options.formality;
        }

        const { provider, fields } = data;
        const texts = fields.map(({ text }) => text);

        // A scenario with multiple providers, we could check the supported
        // providers before proxying the request to the right one.
        if (provider.id !== self.options.providerId) {
          throw self.apos.error('invalid', 'Invalid translation provider');
        }

        self.logDebug(req, 'submit-translation-before', {
          provider: self.options.providerId,
          source: srcLang,
          target: trgLang,
          options
        });

        const translation = await self.translator
          .translateText(texts, source, target, options);

        self.logDebug(req, 'submit-translation-after', {
          provider: self.options.providerId,
          source,
          target,
          contentLength: texts.reduce((total, text) => total + text.length, 0)
        });

        return {
          state: 'translated',
          fields: fields.map((item, index) => ({
            ...item,
            translated: translation[index].text
          }))
        };
      }
    };
  }
};
