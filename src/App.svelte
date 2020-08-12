<script>
  import { db } from "/firebase.js";
  import Button from "./shared/Button.svelte";

  let jornada, partido, resultado, marcador;

  const calcularResultado = () => {
    if (marcador[0] > marcador[4]) {
      return "L";
    } else if (marcador[0] === marcador[4]) {
      return "E";
    } else if (marcador[0] < marcador[4]) {
      return "V";
    }
  };

  const handleSubmit = () => {
    let res = {};
    db.collection(`jornada${jornada}`)
      .doc("resultados")
      .get()
      .then(data => {
        res = data.data();
        resultado = calcularResultado();
        partido = partido - 1;
        res[partido] = resultado;
        res.partidos[partido] = marcador;
        db.collection(`jornada${jornada}`)
          .doc("resultados")
          .update(res);
        partido++;
      });
  };
</script>

<style>
  main {
    max-width: 960px;
    margin: 40px auto;
  }
  form {
    width: 70%;
    margin: 60px auto;
    text-align: center;
  }
  .form-field {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    padding: 50px;
  }
  input {
    width: 80%;
    border: none;
    border-block-end: 2px solid teal;
    font-size: 30px;
    background: #fafafa;
    text-align: center;
  }
  /* select {
    font-size: 24px;
    color: #555;
  } */
</style>

<main>
  <!-- <form on:submit|preventDefault={createResults}>
    <input type="number" placeholder="jornada" required bind:value={jornada} />
    <Button>crear 👍</Button>
  </form> -->
  <form on:submit|preventDefault={handleSubmit}>
    <div class="form-field">
      <input
        type="number"
        placeholder="jornada"
        required
        bind:value={jornada} />
      <input
        type="number"
        placeholder="partido"
        required
        bind:value={partido} />
      <!-- <select required bind:value={resultado}>
        <option value="">Elige</option>
        <option value="L">L</option>
        <option value="E">E</option>
        <option value="V">V</option>
      </select> -->
      <input
        type="text"
        placeholder="marcador"
        required
        bind:value={marcador} />
    </div>

    <Button>enviar 👍</Button>
  </form>
</main>
