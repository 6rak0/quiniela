<script>
  import Tabs from "../shared/Tabs.svelte";
  import NewPlayer from "./NewPlayer.svelte";
  import PlayerTotals from "./PlayerTotals.svelte";
  import Results from "./Results.svelte";
  import Tabla from "./Tabla.svelte";

  let items = ["registro", "puntos", "tabla", "resultados"];

  export let jornadaActiva;
  const now = Date.now();

  let activeItem = now < jornadaActiva.limit ? "registro" : "puntos";

  const tabChange = e => {
    activeItem = e.detail;
  };
</script>

<style>
  p {
    text-align: center;
  }
</style>

<p>{jornadaActiva.fecha}</p>
<Tabs {items} {activeItem} on:tabChange={tabChange} />
{#if activeItem === 'puntos'}
  <PlayerTotals ja={jornadaActiva.numero} />
{:else if activeItem === 'registro'}
  {#if now < jornadaActiva.limit}
    <NewPlayer on:tabChange={tabChange} {jornadaActiva} />
  {:else}
    <p>No se aceptan más registros</p>
    <p>Nos vemos en la próxima jornada</p>
  {/if}
{:else if activeItem === 'resultados'}
  <Results on:tabChange={tabChange} {jornadaActiva} />
{:else if activeItem === 'tabla'}
  <Tabla on:tabChange={tabChange} {jornadaActiva} />
{/if}
