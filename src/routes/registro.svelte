<script>
  import axios from "axios";
  import { user } from "../stores";
  import { goto } from "@sapper/app";

  let username, password, errorMessage;
  $: if (username) {
    errorMessage = null;
  }

  async function registro() {
    try {
      const { data } = await axios.post("/api/auth/signup", {
        username,
        password
      });
      $user = data.user;
      goto("/dashboard");
    } catch (err) {
      if (err.response.data.msg === "Usuario existente") {
        username = "";
        password = "";
        errorMessage = "Ese usuario ya existe";
      }
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
    <form on:submit|preventDefault={registro}>
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
