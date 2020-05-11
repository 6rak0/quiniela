<script>
  import { createEventDispatcher } from "svelte";
  import { db } from "../../firebase.js";
  import Button from "../shared/Button.svelte";
  import jornadas from "../../jornadas.js";

  const dispatcher = createEventDispatcher();

  export let ja;
  const partidos = jornadas[ja - 1];

  let player = {};
  const handleSubmit = () => {
    player.total = 0;
    db.collection(`jornada${ja}`).add(player);
    dispatcher("tabChange", "resultados");
  };
</script>

<style>
  form {
    width: 80%;
    margin: 60px auto;
    text-align: center;
  }
  .form-field {
    margin: 20px auto 60px auto;
  }
  input {
    width: 80%;
    border: none;
    border-block-end: 2px solid teal;
    font-size: 30px;
    background: #fafafa;
    text-align: center;
  }
  img {
    width: 36px;
  }
  .input-field {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  select {
    font-size: 24px;
  }
</style>

<form on:submit|preventDefault={handleSubmit}>
  <div class="form-field">
    <input type="text" placeholder="nombre" required bind:value={player.name} />
  </div>
  {#each partidos as partido, i}
    <div class="form-field">
      <div class="input-field">
        <img src="./img/{partido.loc}.png" alt={partido.loc} />
        <select bind:value={player[i]}>
          <option value="error">Elige</option>
          <option value="L">L</option>
          <option value="E">E</option>
          <option value="V">V</option>
        </select>
        <img src="./img/{partido.vis}.png" alt={partido.vis} />
      </div>
    </div>
  {/each}
  <Button>👍</Button>
</form>
