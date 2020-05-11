<script>
  //import jornadas from "../../jornadas.js";
  import { db } from "../../firebase.js";

  export let ja;
  //let partidos = jornadas[ja - 1];
  let partidos = [];

  db.collection(`partidos${ja}`).onSnapshot(data => {
    partidos = data.docs;
  });
</script>

<style>
  img {
    width: 36px;
  }
  .match-field {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
</style>

{#each partidos as partido}
  <div class="match-field">
    <img src="./img/{partido.data().loc}.png" alt={partido.data().loc} />
    <p>{partido.data().res || '  -  '}</p>
    <img src="./img/{partido.data().vis}.png" alt={partido.data().vis} />
  </div>
{/each}
