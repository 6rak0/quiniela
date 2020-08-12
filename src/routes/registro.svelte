<script>
  import axios from "axios";
  import { goto, stores } from "@sapper/app";
  const { session } = stores();

  let username, password, errorMessage;
  $: if (username) {
    errorMessage = null;
  }

  async function signup() {
    try {
      const response = await axios.post("/signup", {
        username,
        password
      });
      if (response.data.error) {
        username = "";
        password = "";
        errorMessage = response.data.error;
      } else {
        $session.user = response.data.user;
        $session.token = response.data.token;
        goto("/tabla");
      }
    } catch (err) {
      console.log(err);
      errorMessage = "ocurrió un error, intenta de nuevo";
    }
  }
</script>

<svelte:head>
  <title>registro</title>
</svelte:head>

<div class="container">
  <div class="section">
    <h1 class="title has-text-centered">Registro</h1>
    <hr />
    <form on:submit|preventDefault={signup}>
      <div class="field">
        <label class="label">Nombre</label>
        <div class="control">
          <input
            class="input"
            type="text"
            required
            bind:value={username}
            class:is-danger={errorMessage} />
          {#if errorMessage}
            <p class="help is-danger">{errorMessage}</p>
          {/if}
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password" required bind:value={password} />
        </div>
      </div>
      <div class="control has-text-centered">
        <button class="button is-primary">Enviar</button>
      </div>
    </form>
    <hr />
    <br />
    <div class="has-text-centered">
      <p>¿usuario registrado?</p>
      <br />
      <a href="/login">
        <button class="button is-info">inicia sesión</button>
      </a>
    </div>
  </div>
</div>
