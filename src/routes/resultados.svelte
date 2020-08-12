<script>
  import { partidos, jA } from "../stores";
  import Partido from "../components/Partido.svelte";
</script>

<style>

</style>

<svelte:head>
  <title>resultados</title>
</svelte:head>

<div class="container has-text-centered">
  <p class="is-size-3 has-text-weight-bold">Jornada {$jA.número}</p>
  <p class="is size-5 has-text-weight-light">Resultados</p>
  <div class="container">
    {#each $partidos as partido}
      <Partido {partido} />
    {/each}
  </div>
</div>
