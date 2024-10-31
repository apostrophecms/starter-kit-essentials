<script>
  import svelteLogo from "./assets/svelte.svg";

  let { id, widget, options } = $props();
  let count = $state(widget.counter);
  let message = $state("");
  let debugState = $state(false);
  let debugLabel = $state("Show Debug");

  const debug = JSON.stringify({ id, widget, options }, null, 2);

  const onClick = () => {
    message = "";
    count += 1;

    apos.http
      .post("/api/v1/asset/count", {
        body: {
          type: widget.type,
          id: widget._id,
          count,
        },
      })
      .then(console.log)
      .catch((err) => (message = err.message));
  };

  const onDebugClick = () => {
    debugState = !debugState;
  };
</script>

<div class="py-8">
  <div class="flex justify-center content-center">
    <a href="https://vite.dev" target="_blank" rel="noreferrer">
      <!-- We can use public images as we did -->
      <img
        src={`${window.apos.assetBaseUrl}/modules/asset/vite.svg`}
        class="logo"
        alt="Vite Logo"
      />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <!-- ...or inline -->
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>

  <!-- Title from the widget data  -->
  <h1>{widget.title}</h1>

  <!-- A server error message will appear here -->
  {#if message}
    <p class="mt-4 p-4 bg-red-400">[Server Message] {message}</p>
  {/if}

  <!-- The Button. No tailwind CSS because we grab it directly
        from the vite template installs. -->
  <div class="card">
    <button class="cbutton" onclick={onClick}>
      count is {count}
    </button>
  </div>

  <!-- A toggle for debugging - show App props (coming from the server) -->
  <h4 class="text-center mb-4 text-xl">
    <button onclick={onDebugClick}>
      {debugLabel}
    </button>
  </h4>
  <div class="text-center" style="display: {debugState ? 'block' : 'none'};">
    <pre class="m-auto">{debug}</pre>
  </div>
</div>
