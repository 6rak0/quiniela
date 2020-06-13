<script>
  import { db } from "../firebase.js";

  export let jornadaActiva;
  let players = [];
  const i = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  db.collection(`jornada${jornadaActiva.numero}`)
    .orderBy("total", "desc")
    .onSnapshot(
      data =>
        (players = data.docs.filter(
          player => player.data().name != "resultados"
        ))
    );
</script>

<style>
  .table {
    text-align: center;
    display: flex;
    justify-content: center;
  }
  td {
    padding: 10px;
  }
  tr td:first-child {
    border-block-end: 1px solid black;
  }
  th {
    border-inline-end: 1px solid black;
  }
  img {
    width: 20px;
  }
  @media (orientation: portrait) {
    .table {
      display: none;
    }
    p {
      text-align: center;
    }
  }
  @media (orientation: landscape) {
    .table {
      display: flex;
    }
    .alert {
      display: none;
    }
  }
</style>

<div class="table">
  <table>
    <tr>
      <th />
      {#each jornadaActiva.partidos as { loc, vis }}
        <th>
          <img src="./img/{loc}.png" alt={loc} />
          <img src="./img/{vis}.png" alt={vis} />
        </th>
      {/each}
      <th>Puntos</th>
    </tr>
    {#each players as player}
      <tr>
        <td>{player.data().name}</td>
        {#each i as i}
          <td>{player.data()[i] || ' - '}</td>
        {/each}
        <td>{player.data().total}</td>
      </tr>
    {/each}
  </table>
</div>
<div class="alert">
  <p>Para ver la tabla gira tu teléfono.</p>
</div>
