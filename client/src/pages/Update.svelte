<script>
  import axios from "axios";
  import { partidos } from "../stores";

  import Partido from "../components/Partido.svelte";

  let j, id, gv, gl, r, partido;

  async function getMatch() {
    const { data } = await axios.post(`/api/partidos/agregar/${j}/${id}`, {
      local: {
        goles: gl
      },
      visita: {
        goles: gv
      },
      resultado: r.toUpperCase()
    });
    partido = data;
  }
</script>

<div class="container has-text-centered">
  <div class="section">
    <form on:submit|preventDefault={getMatch}>
      <div class="field">
        <label class="label">jornada</label>
        <div class="control">
          <input class="input" type="number" bind:value={j} />
        </div>
      </div>
      <div class="field">
        <label class="label">partido</label>
        <div class="control">
          <input class="input" type="number" bind:value={id} />
        </div>
      </div>
      <div class="field">
        <label class="label">local</label>
        <div class="control">
          <input class="input" type="number" bind:value={gl} />
        </div>
      </div>
      <div class="field">
        <label class="label">visita</label>
        <div class="control">
          <input class="input" type="number" bind:value={gv} />
        </div>
      </div>
      <div class="field">
        <label class="label">resultado</label>
        <div class="control">
          <input class="input" type="text" bind:value={r} />
        </div>
      </div>
      <div class="control has-text-centered">
        <button class="button is-primary">buscar</button>
      </div>
    </form>
    <hr />
    {#if partido}
      <Partido {partido} />
    {/if}
  </div>
</div>
