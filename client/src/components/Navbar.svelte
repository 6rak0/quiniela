<script>
  import axios from "axios";
  import { push } from "svelte-spa-router";
  import { user } from "../stores";

  let isActive = false;

  async function logout() {
    await axios.post("/api/auth/logout");
    $user = null;
    push("/");
  }
</script>

<nav class="navbar is-info">
  <div class="container">
    <div class="navbar-brand">
      <a href="#/" class="navbar-item">
        <span class="title">
          <img src="./img/logo-guardianes.png" alt="logo" />
        </span>
      </a>
      <span
        class="navbar-burger"
        class:is-active={isActive}
        on:click={() => (isActive = !isActive)}
        aria-expanded="false"
        aria-label="menu">
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </span>
    </div>
    <div class="navbar-menu" class:is-active={isActive}>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            {#if $user}
              <a class="button is-primary is-light" href="#/profile">
                👤 {$user.username}
              </a>
              {#if $user.isAdmin}
                <a class="button is-primary" href="#/update">update</a>
              {/if}
              <button class="button" on:click={logout}>cerrar sesión</button>
            {:else}
              <a class="button" href="#/login">iniciar sesión</a>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
