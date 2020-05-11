<script>
  import Tabs from "./shared/Tabs.svelte";
  import NewPlayer from "./components/NewPlayer.svelte";
  import PlayerTotals from "./components/PlayerTotals.svelte";

  let items = ["puntos", "entrada"];
  let activeItem = "puntos";
  const jornadaActiva = 10;

  const tabChange = e => {
    activeItem = e.detail;
  };
</script>

<style>
  main {
    max-width: 960px;
    margin: 40px auto;
  }
</style>

<main>
  <Tabs {items} {activeItem} on:tabChange={tabChange} />
  {#if activeItem === 'puntos'}
    <PlayerTotals ja={jornadaActiva} />
  {:else if activeItem === 'entrada'}
    <NewPlayer on:tabChange={tabChange} ja={jornadaActiva} />
  {/if}
</main>
