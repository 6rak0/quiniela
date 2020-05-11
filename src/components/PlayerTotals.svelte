<script>
  import { flip } from "svelte/animate";
  import { db } from "../../firebase.js";
  import Card from "../shared/Card.svelte";
  import jornadas from "../../jornadas.js";

  export let ja;
  let players = [];

  db.collection(`jornada${ja}`).onSnapshot(data => {
    players = data.docs;
    let resultados;
    players.forEach(user => {
      if (player.data().name === "resultados") {
        resultados = player.data();
      }
      let puntos = 0;
      for (let i = 0; i < 9; i++) {
        if (player.data()[i] === resultados[i]) {
          puntos++;
        }
      }
      db.collection(`jornada${ja}`)
        .doc(player.id)
        .update({ total: puntos });
    });
    players = players.filter(player => player.data().name != "resultados");
  });
</script>

<style>
  .movie-list {
    width: 80%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
  h2 {
    text-align: center;
  }
</style>

<h2>Jornada {ja}</h2>
<div class="movie-list">
  {#each players as player (player.id)}
    <div animate:flip={{ duration: 500 }}>
      <Card>
        <h2>{player.data().name}</h2>
        <p>{player.data().total}</p>
      </Card>
    </div>
  {/each}
</div>
