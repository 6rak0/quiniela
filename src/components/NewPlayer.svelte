<script>
  import { createEventDispatcher } from "svelte";
  import { db } from "../firebase.js";
  import Button from "../shared/Button.svelte";

  const dispatcher = createEventDispatcher();

  export let jornadaActiva;
  let players = [];
  let newPlayer = {};
  newPlayer.total = 0;
  let check = false;

  db.collection(`jornada${jornadaActiva.numero}`).onSnapshot(
    data => (players = data.docs)
  );

  const checkName = () => {
    players.forEach(player => {
      if (player.data().name === newPlayer.name) {
        check = true;
      }
    });
  };

  const handleSubmit = () => {
    checkName();
    if (check) {
      check = false;
      alert(`el nombre ${newPlayer.name} está ocupado, intenta con otro`);
    } else {
      db.collection(`jornada${jornadaActiva.numero}`)
        .doc(newPlayer.name)
        .set(newPlayer);
      dispatcher("tabChange", "puntos");
    }
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
      bind:value={newPlayer.name} />
  </div>
  {#each jornadaActiva.partidos as { loc, vis }, i}
    <div class="form-field">
      <div class="input-field">
        <img src="img/{loc}.png" alt={loc} />
        <select required bind:value={newPlayer[i]}>
          <option value="">Elige</option>
          <option value="L">L</option>
          <option value="E">E</option>
          <option value="V">V</option>
        </select>
        <img src="img/{vis}.png" alt={vis} />
      </div>
    </div>
  {/each}
  <Button>enviar 👍</Button>
</form>
