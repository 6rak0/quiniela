<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import Partido from "../components/Partido.svelte";

  let jornada;
  let partidos = [];

  onMount(async () => {
    const { data } = await axios.get("/api/partidos");
    partidos = data;
    jornada = partidos[0].jornada;
  });
</script>

<style>

</style>

<svelte:head>
  <title>resultados</title>
</svelte:head>

<div class="container has-text-centered">
  <p class="is-size-3 has-text-weight-bold">Jornada {jornada}</p>
  <p class="is size-5 has-text-weight-light">Resultados</p>
  <div class="container">
    {#each partidos as partido}
      <Partido {partido} />
    {/each}
  </div>
</div>
