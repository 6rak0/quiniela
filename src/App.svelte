<script>
  // import Tabs from "./shared/Tabs.svelte";
  // import NewPlayer from "./components/NewPlayer.svelte";
  // import PlayerTotals from "./components/PlayerTotals.svelte";
  // import Results from "./components/Results.svelte";
  // import Tabla from "./components/Tabla.svelte";
  import Jornada from "./components/Jornada.svelte";
  import Footer from "./components/Footer.svelte";
  import jornadas from "./jornadas.js";

  // let items = ["puntos", "registro", "resultados", "tabla"];
  const now = Date.now();
  $: jornadaActiva = jornadas.find(jornada => now < jornada.fin);
  //const jornadaActiva = jornadas[12].numero;
  // const now = Date.now();
  //const limit = jornadas[12].limit;

  // let activeItem = now < limit ? "registro" : "puntos";

  // const tabChange = e => {
  //   activeItem = e.detail;
  // };

  // const minus = () => {
  //   jornadaActiva = jornadas.find(
  //     jornada => jornadaActiva.numero - 1 === jornada.numero
  //   );
  // };
  // const plus = () => {
  //   jornadaActiva = jornadas.find(
  //     jornada => jornadaActiva.numero + 1 === jornada.numero
  //   );
  // };
</script>

<style>
  main {
    max-width: 960px;
    margin: 40px auto;
  }
  h2 {
    text-align: center;
  }
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
  li {
    margin: 0 8px;
    font-size: 1.2rem;
    color: #555;
  }
</style>

<main>
  <!-- <h2>Jornada {jornadaActiva}</h2>
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
  {/if} -->
  <ul>
    <!-- <li>
      <button on:click={minus}>«</button>
    </li> -->
    <li>
      <h2>Jornada {jornadaActiva.numero}</h2>
    </li>
    <!-- <li>
      <button on:click={plus}>»</button>
    </li> -->
  </ul>
  <Jornada {jornadaActiva} />
</main>
<Footer />
