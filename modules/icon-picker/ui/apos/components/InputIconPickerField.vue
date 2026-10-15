<template>
  <AposInputWrapper
    :field="field"
    :error="effectiveError"
    :uid="uid"
    :display-options="displayOptions"
    :modifiers="modifiers"
  >
    <template #body>
      <div class="icon-picker">
        <div
          class="icon-picker__preview"
          :style="{ color: previewColor }"
        >
          <span
            v-if="next.name"
            :class="[ 'icon-picker__shape', `icon-picker__shape--${next.shape || 'none'}` ]"
            v-html="previewSvg"
          />
          <span
            v-else
            class="icon-picker__empty"
          >No icon selected</span>
        </div>
        <input
          v-model="search"
          type="search"
          class="apos-input apos-input--text icon-picker__search"
          placeholder="Search icons"
          :aria-label="`Search ${field.label || 'icons'}`"
        >
        <div class="icon-picker__grid">
          <button
            v-if="!search"
            type="button"
            class="icon-picker__option icon-picker__option--none"
            :aria-pressed="!next.name"
            @click="select('')"
          >
            No icon
          </button>
          <button
            v-for="name in filteredNames"
            :key="name"
            type="button"
            class="icon-picker__option"
            :title="name"
            :aria-label="name"
            :aria-pressed="next.name === name"
            @click="select(name)"
            v-html="optionSvgs[name]"
          />
          <p
            v-if="!filteredNames.length"
            class="icon-picker__no-results"
          >
            No icons match "{{ search }}"
          </p>
        </div>
        <AposSchema
          v-model="schemaInput"
          :schema="schema"
          :trigger-validation="triggerValidation"
          :generation="generation"
          :modifiers="modifiers"
        />
      </div>
    </template>
  </AposInputWrapper>
</template>

<script>
import AposInputMixin from 'Modules/@apostrophecms/schema/mixins/AposInputMixin.js';

// Build SVG markup from a Lucide icon node. The nodes come from the
// `lucide` package via server browser data, not from user input.
function toSvg(node, { size = 24, strokeWidth = 2 } = {}) {
  const children = node
    .map(([ tag, attrs ]) => {
      const attrString = Object.entries(attrs)
        .map(([ key, value ]) => `${key}="${value}"`)
        .join(' ');
      return `<${tag} ${attrString}/>`;
    })
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" ` +
    'viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    `stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" ` +
    `aria-hidden="true">${children}</svg>`;
}

export default {
  name: 'InputIconPickerField',
  mixins: [ AposInputMixin ],
  props: {
    generation: {
      type: Number,
      required: false,
      default: null
    }
  },
  data() {
    const next = this.getNext();
    const { name, ...styles } = next;
    return {
      next,
      search: '',
      schemaInput: {
        data: styles
      }
    };
  },
  computed: {
    config() {
      return window.apos.modules['icon-picker'];
    },
    schema() {
      return this.config.schema;
    },
    filteredNames() {
      const names = Object.keys(this.config.icons);
      const term = this.search.trim().toLowerCase().replace(/\s+/g, '-');
      return term ? names.filter(name => name.includes(term)) : names;
    },
    // The grid always shows icons at a fixed size and stroke, so build it once
    optionSvgs() {
      return Object.fromEntries(
        Object.entries(this.config.icons)
          .map(([ name, node ]) => [ name, toSvg(node) ])
      );
    },
    previewSvg() {
      const node = this.config.icons[this.next.name];
      if (!node) {
        return '';
      }
      return toSvg(node, {
        size: this.config.sizes[this.next.size] || this.config.sizes.m,
        strokeWidth: this.next.strokeWidth ?? 2
      });
    },
    previewColor() {
      const color = this.next.color;
      if (!color) {
        return null;
      }
      return color.startsWith('--') ? `var(${color})` : color;
    }
  },
  watch: {
    schemaInput: {
      deep: true,
      handler() {
        if (!this.schemaInput.hasErrors) {
          this.next = {
            ...this.schemaInput.data,
            name: this.next.name
          };
        }
        if (this.triggerValidation) {
          this.validateAndEmit();
        }
      }
    },
    generation() {
      this.next = this.getNext();
      const { name, ...styles } = this.next;
      this.schemaInput = {
        data: styles
      };
    }
  },
  methods: {
    getNext() {
      const value = this.modelValue?.data;
      if (value && typeof value === 'object') {
        return { ...value };
      }
      return { ...(this.field.def || {}) };
    },
    select(name) {
      this.next = {
        ...this.next,
        name
      };
    },
    validate(value) {
      if (this.schemaInput.hasErrors) {
        return 'invalid';
      }
      if (this.field.required && !value?.name) {
        return 'required';
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.icon-picker {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.icon-picker__preview {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 96px;
  border: 1px solid var(--a-base-9);
  border-radius: var(--a-border-radius);
  background-color: var(--a-base-10);
}

.icon-picker__shape {
  display: inline-flex;
  line-height: 0;
}

.icon-picker__shape--circle,
.icon-picker__shape--rounded {
  padding: 0.5em;
  background-color: color-mix(in srgb, currentColor 12%, transparent);
}

.icon-picker__shape--circle {
  border-radius: 50%;
}

.icon-picker__shape--rounded {
  border-radius: 6px;
}

.icon-picker__empty,
.icon-picker__no-results {
  color: var(--a-base-3);
  font-size: var(--a-type-label);
}

.icon-picker__no-results {
  grid-column: 1 / -1;
  margin: 0;
}

.icon-picker__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(48px, 1fr));
  gap: 6px;
  max-height: 220px;
  overflow-y: auto;
  padding: 2px;
}

.icon-picker__option {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  padding: 0;
  border: 1px solid var(--a-base-8);
  border-radius: var(--a-border-radius);
  color: var(--a-text-primary);
  background-color: var(--a-background-primary);
  cursor: pointer;

  &:hover,
  &:focus-visible {
    border-color: var(--a-primary);
  }

  &[aria-pressed="true"] {
    border-color: var(--a-primary);
    color: var(--a-white);
    background-color: var(--a-primary);
  }
}

.icon-picker__option--none {
  grid-column: span 2;
  aspect-ratio: auto;
  font-size: var(--a-type-small);
}
</style>
