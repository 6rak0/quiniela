<script>
  import jornadas from "../../jornadas.js";

  export let ja;
  let partidos = jornadas[ja - 1];
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

{#each partidos as partido, i}
  <div class="match-field">
    <img src="./img/{partido.loc}.png" alt={partido.loc} />
    <p>{partido.res || '  -  '}</p>
    <img src="./img/{partido.vis}.png" alt={partido.vis} />
  </div>
{/each}
