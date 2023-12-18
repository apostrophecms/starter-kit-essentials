<template>
  <AposInputWrapper
    :modifiers="modifiers" :field="field"
    :error="effectiveError" :uid="uid"
    :display-options="displayOptions"
  >
    <template #body>
      <pre>{{ jsonValue }}</pre>
    </template>
  </AposInputWrapper> 
</template>

<script> 
import AposInputMixin from 'Modules/@apostrophecms/schema/mixins/AposInputMixin';

export default {
  name: 'TranslationMetaField',
  mixins: [ AposInputMixin ],
  computed: {
    jsonValue() {
      if (!this.value.data) {
        return 'N/A';
      }
      return JSON.stringify(this.value.data, null, 2);
    }
  },
  methods: {
    validate(values) {
      return false;
    },
  }
}
</script>
