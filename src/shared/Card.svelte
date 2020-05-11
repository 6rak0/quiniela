<script>
  import { fade } from "svelte/transition";
</script>

<style>
  .card {
    background: white;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
</style>

<div class="card" in:fade>
  <slot />
</div>
