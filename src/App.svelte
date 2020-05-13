<script>
  import Tabs from "./shared/Tabs.svelte";
  import NewPlayer from "./components/NewPlayer.svelte";
  import PlayerTotals from "./components/PlayerTotals.svelte";
  import Results from "./components/Results.svelte";
  import Tabla from "./components/Tabla.svelte";
  import Footer from "./components/Footer.svelte";

  let items = ["puntos", "registro", "resultados", "tabla"];
  let activeItem = "puntos";
  const jornadaActiva = 11;
  const now = Date.now();
  const limit = 1589568900000;

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
  p {
    text-align: center;
  }
</style>

<main>
  <h2>Jornada {jornadaActiva}</h2>
  <Tabs {items} {activeItem} on:tabChange={tabChange} />
  {#if activeItem === 'puntos'}
    <PlayerTotals ja={jornadaActiva} />
  {:else if activeItem === 'registro'}
    {#if now < limit}
      <NewPlayer on:tabChange={tabChange} ja={jornadaActiva} />
    {:else}
      <p>No se aceptan más registros</p>
      <p>Nos vemos en la próxima jornada</p>
    {/if}
  {:else if activeItem === 'resultados'}
    <Results on:tabChange={tabChange} ja={jornadaActiva} />
  {:else if activeItem === 'tabla'}
    <Tabla on:tabChange={tabChange} ja={jornadaActiva} />
  {/if}
</main>
<Footer />
