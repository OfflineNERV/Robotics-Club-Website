<script>
  export let mobile = false;
</script>

{#if mobile}
  <a
    href="/register"
    type="button"
    class="btn variant-ghost-secondary hover:variant-filled-secondary"
    data-sveltekit-preload-data>Sign Up</a
  >
{:else}
  <a
    href="/register"
    type="button"
    class="btn variant-ghost-secondary hover:variant-filled-secondary"
    data-sveltekit-preload-data>Become a Member</a
  >
{/if}
