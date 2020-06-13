<script>
  import { db } from "../firebase.js";

  export let jornadaActiva;
  let res = [];

  db.collection(`jornada${jornadaActiva.numero}`).onSnapshot(data => {
    res = data.docs.find(player => player.data().name === "resultados");
    res = res.data().partidos;
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

{#each jornadaActiva.partidos as { loc, vis }, i}
  <div class="match-field">
    <img src="./img/{loc}.png" alt={loc} />
    <p>{res[i] || '  -  '}</p>
    <img src="./img/{vis}.png" alt={vis} />
  </div>
{/each}
