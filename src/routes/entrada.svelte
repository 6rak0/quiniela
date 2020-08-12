<script>
  import { stores, goto } from "@sapper/app";
  import axios from "axios";
  import { partidos, jA } from "../stores";
  const { session } = stores();
  let pred = [];
  let errorMessage = "";
  const now = Date.now();

  async function entrada() {
    const response = await axios.post(
      "http://45.77.197.176:4000/api/entradas/add",
      {
        jornada: $jA.número,
        pred
      },
      { headers: { Authorization: `Bearer ${$session.token}` } }
    );
    if (response.data.success) goto("/tabla");
    else errorMessage = "ya existe una entrada para esta jornada";
  }
</script>

<style>
  img {
    width: 45px;
  }
</style>

<svelte:head>
  <title>entrada</title>
</svelte:head>

<div class="container has-text-centered">
  <p class="is-size-3 has-text-weight-bold">Jornada {$jA.número}</p>
  {#if now < $jA.límite}
    {#if !errorMessage}
      <form on:submit|preventDefault={entrada}>
        {#each $partidos as { local, visita }, i}
          <div class="field">
            <div class="control">
              <img src="img/{local.corto}.png" alt={local.corto} />
              <div class="select">
                <select required bind:value={pred[i]}>
                  <option value="">Elige</option>
                  <option value="L">L</option>
                  <option value="E">E</option>
                  <option value="V">V</option>
                </select>
              </div>
              <img src="img/{visita.corto}.png" alt={visita.corto} />
            </div>
          </div>
        {/each}
        <button class="button is-primary">Enviar</button>
      </form>
    {:else}
      <div class="notification is-danger is-light">
        <button class="delete" on:click={() => (errorMessage = '')} />
        {errorMessage}
      </div>
    {/if}
  {:else}
    <div class="notification is-danger is-light">
      No se aceptan más entradas para esta jornada, nos vemos en la que sigue.
    </div>
  {/if}
</div>
