<script>
  import { stores, goto } from "@sapper/app";
  import { onMount } from "svelte";
  import axios from "axios";
  import { partidos, jA } from "../stores";
  const { session } = stores();
  const i = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let entradas = [];

  onMount(async () => {
    const response = await axios.get(
      `https://45.77.197.176:4000/api/entradas/jornada/${$jA.número}`,
      {
        headers: { Authorization: `Bearer ${$session.token}` }
      }
    );
    entradas = response.data;
  });
</script>

<style>
  img {
    width: 30px;
  }
  @media (orientation: portrait) {
    .table {
      display: none;
    }
  }
  @media (orientation: landscape) {
    .mensaje {
      display: none;
    }
  }
</style>

<div class="container has-text-centered">
  <div class="section">
    <div class="table">
      <table class="table is-fullwidth">
        <tr>
          <th />
          {#each $partidos as { local, visita, resultado }}
            <th>
              <div class="container">
                <img src="./img/{local.corto}.png" alt={local.corto} />
                <img src="./img/{visita.corto}.png" alt={visita.corto} />
              </div>
              {resultado || '-'}
            </th>
          {/each}
          <th>Puntos</th>
        </tr>
        {#each entradas as { username, pred, puntos }}
          <tr>
            <td>{username}</td>
            {#each i as i}
              <td>{pred[i] || ' - '}</td>
            {/each}
            <td>{puntos || 0}</td>
          </tr>
        {/each}
      </table>
    </div>
    <div class="mensaje">
      <p>Para ver la tabla gira tu teléfono.</p>
    </div>
  </div>
</div>
