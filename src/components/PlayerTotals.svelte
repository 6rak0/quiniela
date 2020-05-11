<script>
  import { flip } from "svelte/animate";
  import { db } from "../../firebase.js";
  import Card from "../shared/Card.svelte";
  import jornadas from "../../jornadas.js";

  export let ja;
  let users = [];

  db.collection(`jornada${ja}`).onSnapshot(data => {
    users = data.docs;
    let resultados;
    users.forEach(user => {
      if (user.data().name === "resultados") {
        resultados = user.data();
      }
      let puntos = 0;
      for (let i = 0; i < 9; i++) {
        if (user.data()[i] === resultados[i]) {
          puntos++;
        }
      }
      db.collection(`jornada${ja}`)
        .doc(user.id)
        .update({ total: puntos });
    });
    users = users.filter(user => user.data().name != "resultados");
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
</style>

<div class="movie-list">
  {#each users as user (user.id)}
    <div animate:flip={{ duration: 500 }}>
      <Card>
        <h2>{user.data().name}</h2>
        <p>{user.data().total}</p>
      </Card>
    </div>
  {/each}
</div>
