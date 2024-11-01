<script setup>
import { ref, computed } from 'vue';

const { id, options, widget } = defineProps({
  id: String,
  widget: Object,
  options: Object
});

const count = ref(widget.counter);
const message = ref('');
const debugState = ref(false);
const debugLabel = computed(() => `${debugState.value ? 'Hide' : 'Show'} Debug`);
const debug = JSON.stringify({ id, widget, options }, null, 2);
const baseUrl = computed(() => window.apos.assetBaseUrl);

const onClick = () => {
  message.value = "";
  count.value += 1;

  apos.http
    .post("/api/v1/asset/count", {
      body: {
        type: widget.type,
        id: widget._id,
        count: count.value,
      },
    })
    .then(console.log)
    .catch((err) => (message.value = err.message));
};

const onDebugClick = () => {
  debugState.value = !debugState.value;
};

</script>

<template>
  <div class="py-8">
    <div class="flex justify-center content-center">
      <a href="https://vite.dev" target="_blank" rel="noreferrer">
        <!-- We can use public images as we did -->
        <img :src="`${baseUrl}/modules/asset/vite.svg`" class="logo" alt="Vite Logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank" rel="noreferrer">
        <!-- ...or a relative path -->
        <img src="./assets/vue.svg" class="logo vue" alt="Vue Logo" />
      </a>
    </div>

    <!-- Title from the widget data  -->
    <h1>{{ widget.title }}</h1>

    <!-- A server error message will appear here -->
    <p v-if="message" class="mt-4 p-4 bg-red-400">[Server Message] {{ message }}</p>

    <!-- The Button. No tailwind CSS because we grab it directly
          from the vite template installs. -->
    <div class="card">
      <button class="cbutton" @click="onClick">
        count is {{ count }}
      </button>
    </div>

    <!-- A toggle for debugging - show App props (coming from the server) -->
    <h4 class="text-center mb-4 text-xl">
      <button @click="onDebugClick">
        {{ debugLabel }}
      </button>
    </h4>
    <div v-show="debugState" class="text-center">
      <pre class="m-auto">{{ debug }}</pre>
    </div>
  </div>
</template>
