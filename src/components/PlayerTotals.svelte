<script>
  import { flip } from "svelte/animate";
  import { db } from "../../firebase.js";
  import Card from "../shared/Card.svelte";
  import jornadas from "../../jornadas.js";

  export let ja;
  let players = [];

  db.collection(`jornada${ja}`)
    .orderBy("total", "desc")
    .onSnapshot(data => {
      players = data.docs;
      let resultados;
      players.forEach(player => {
        if (player.data().name === "resultados") {
          resultados = player.data();
        }
        players = players.filter(player => player.data().name != "resultados");
      });
      players.forEach(player => {
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
  @media (max-width: 480px) {
    .movie-list {
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
  }
</style>

<div class="movie-list">
  {#each players as player (player.id)}
    <div animate:flip={{ duration: 500 }}>
      <Card>
        <h3>{player.data().name}</h3>
        <p>{player.data().total}</p>
      </Card>
    </div>
  {/each}
</div>
