<script>
  import { fade } from "svelte/transition";
</script>

<style>
  .card {
    background: white;
    margin: 10px 0;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
  }
</style>

<div class="card" in:fade>
  <slot />
</div>
