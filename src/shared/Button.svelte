<script>
  export let type = "normal";
</script>

<style>
  button {
    background-color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  .normal {
    font-size: 20px;
    padding: 10px 20px;
    color: white;
    background-color: teal;
  }
  .delete {
    color: crimson;
    border: 2px solid crimson;
    padding: 5px 15px;
  }
</style>

<button class={type} on:click>
  <slot />
</button>
