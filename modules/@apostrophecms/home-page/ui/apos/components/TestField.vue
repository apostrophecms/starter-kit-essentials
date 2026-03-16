<template>
  <AposInputWrapper
    :modifiers="modifiers" :field="field"
    :error="effectiveError" :uid="uid"
    :display-options="displayOptions"
  >
    <template #body>
      <div class="apos-input-wrapper">
        <input v-model="next" />
        <button class="clear" @click="clear">Clear</button>
      </div>
    </template>
  </AposInputWrapper>
</template>

<script>
import AposInputMixin from 'Modules/@apostrophecms/schema/mixins/AposInputMixin';

export default {
  name: 'TestField',
  mixins: [ AposInputMixin ],
  methods: {
    validate(value) {
      if (this.field.required) {
        if (!value) {
          return 'required';
        }
      }
      return false;
    },
    clear() {
      this.next = null;
    }
  }
};
</script>
