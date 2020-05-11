<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let items;
  export let activeItem;
</script>

<style>
  .tabs {
    margin-block-end: 20px;
  }
  ul {
    display: flex;
    justify-content: center;
    padding: 0;
  }
  li {
    margin: 0 8px;
    font-size: 1.2rem;
    color: #555;
    cursor: pointer;
  }
  .active {
    color: teal;
    border-block-end: 1px solid teal;
    padding-block-end: 8px;
  }
</style>

<div class="tabs">
  <ul>
    {#each items as item}
      <li on:click={() => dispatch('tabChange', item)}>
        <div class:active={item === activeItem}>{item}</div>
      </li>
    {/each}
  </ul>
</div>
