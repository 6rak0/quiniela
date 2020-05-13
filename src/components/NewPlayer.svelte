<script>
  import { createEventDispatcher } from "svelte";
  import { db } from "../../firebase.js";
  import Button from "../shared/Button.svelte";

  const dispatcher = createEventDispatcher();

  export let ja;
  let partidos = [];

  db.collection(`partidos${ja}`).onSnapshot(data => {
    partidos = data.docs;
  });

  let player = {};
  const handleSubmit = () => {
    player.total = 0;
    db.collection(`jornada${ja}`).add(player);
    dispatcher("tabChange", "puntos");
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
    <input
      type="text"
      placeholder="nombre"
      maxlength="11"
      required
      bind:value={player.name} />
  </div>
  {#each partidos as partido, i}
    <div class="form-field">
      <div class="input-field">
        <img src="./img/{partido.data().loc}.png" alt={partido.data().loc} />
        <select bind:value={player[i]}>
          <option value="null">Elige</option>
          <option value="L">L</option>
          <option value="E">E</option>
          <option value="V">V</option>
        </select>
        <img src="./img/{partido.data().vis}.png" alt={partido.data().vis} />
      </div>
    </div>
  {/each}
  <Button>enviar 👍</Button>
</form>
