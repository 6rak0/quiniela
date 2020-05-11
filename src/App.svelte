<script>
  import Tabs from "./shared/Tabs.svelte";
  import NewPlayer from "./components/NewPlayer.svelte";
  import PlayerTotals from "./components/PlayerTotals.svelte";
  import Results from "./components/Results.svelte";
  import Footer from "./components/Footer.svelte";

  let items = ["puntos", "entrada", "resultados"];
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
  h2 {
    text-align: center;
  }
</style>

<main>
  <h2>Jornada {jornadaActiva}</h2>
  <Tabs {items} {activeItem} on:tabChange={tabChange} />
  {#if activeItem === 'puntos'}
    <PlayerTotals ja={jornadaActiva} />
  {:else if activeItem === 'entrada'}
    <NewPlayer on:tabChange={tabChange} ja={jornadaActiva} />
  {:else if activeItem === 'resultados'}
    <Results on:tabChange={tabChange} ja={jornadaActiva} />
  {/if}
</main>
<Footer />
