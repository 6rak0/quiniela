<script>
  import { stores } from "@sapper/app";
  import { onMount } from "svelte";
  import axios from "axios";
  const { session } = stores();
  let gl, gv, id, jornada;

  async function update() {
    const response = await axios.put(
      `http://45.77.197.176:4000/api/partidos/update/${jornada}/${id}`,
      { gl, gv },
      { headers: { Authorization: `Bearer ${$session.token}` } }
    );
    console.log(response);
  }
</script>

<div class="container">
  <div class="section">
    <form on:submit|preventDefault={update}>
      <div class="field">
        <label class="label">Jornada</label>
        <div class="control">
          <input class="input" type="number" required bind:value={jornada} />
        </div>
      </div>
      <div class="field">
        <label class="label">ID</label>
        <div class="control">
          <input class="input" type="number" required bind:value={id} />
        </div>
      </div>
      <div class="field">
        <label class="label">Local</label>
        <div class="control">
          <input class="input" type="number" required bind:value={gl} />
        </div>
      </div>
      <div class="field">
        <label class="label">Visita</label>
        <div class="control">
          <input class="input" type="number" required bind:value={gv} />
        </div>
      </div>
      <div class="control has-text-centered">
        <button class="button is-primary">enviar</button>
      </div>
    </form>
  </div>
</div>
