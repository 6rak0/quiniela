<script>
  import axios from "axios";
  import { goto, stores } from "@sapper/app";
  const { session } = stores();

  let username, password, errorMessage;
  $: if (username || password) {
    errorMessage = null;
  }

  async function login() {
    try {
      const response = await axios.post("/login", {
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
      errorMessage = "ocurrión un error, intenta de nuevo";
    }
  }
</script>

<svelte:head>
  <title>inicia sesión</title>
</svelte:head>

<div class="container">
  <div class="section">
    <h1 class="title has-text-centered">Inicia sesión</h1>
    <hr />
    {#if errorMessage}
      <p class="help is-danger">{errorMessage}</p>
    {/if}
    <form on:submit|preventDefault={login}>
      <div class="field">
        <label class="label">Nombre</label>
        <div class="control">
          <input class="input" type="text" required bind:value={username} />
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input
            class="input"
            type="password"
            required
            bind:value={password}
            class:is-danger={errorMessage} />
        </div>
      </div>
      <div class="control has-text-centered">
        <button class="button is-primary">inicia sesión</button>
      </div>
    </form>
    <hr />
    <br />
    <div class="has-text-centered">
      <p>¿ya te registraste?</p>
      <br />
      <a href="/registro">
        <button class="button is-info">regístrate</button>
      </a>
    </div>
  </div>
</div>
