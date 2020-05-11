<script>
  import { db } from "../../firebase.js";

  export let ja;
  let players = [];
  const i = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let partidos = [];

  db.collection(`jornada${ja}`).onSnapshot(data => {
    players = data.docs;
    players = players.filter(player => player.data().name != "resultados");
  });
  db.collection(`partidos${ja}`).onSnapshot(data => {
    partidos = data.docs;
  });
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
</style>

<div class="table">
  <table>
    <tr>
      <th />
      {#each partidos as partido}
        <th>
          <img src="./img/{partido.data().loc}.png" alt={partido.data().loc} />
          <img src="./img/{partido.data().vis}.png" alt={partido.data().vis} />
        </th>
      {/each}
      <th>Puntos</th>
    </tr>
    {#each players as player}
      <tr>
        <td>{player.data().name}</td>
        {#each i as i}
          <td>{player.data()[i]}</td>
        {/each}
        <td>{player.data().total}</td>
      </tr>
    {/each}
  </table>
</div>
