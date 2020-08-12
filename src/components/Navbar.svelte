<script>
  import { goto, stores } from "@sapper/app";
  const { session } = stores();

  export let segment;
  let isActive = false;

  // function logout() {
  //   $session.token = null;
  //   $session.user = null;
  //   goto("/");
  // }
</script>

<nav class="navbar is-info" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a
      class="navbar-item"
      aria-current={segment === undefined ? 'page' : undefined}
      href=".">
      <span class="title">
        <img src="./img/logo-guardianes.png" alt="logo" />
      </span>
    </a>
    <!-- svelte-ignore a11y-missing-attribute-->
    <a
      role="button"
      class="navbar-burger burger"
      class:is-active={isActive}
      aria-label="menu"
      aria-expanded="false"
      on:click={() => (isActive = !isActive)}>
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </a>
  </div>
  <div class="navbar-menu" class:is-active={isActive}>
    <div class="navbar-start">
      <a
        class="navbar-item"
        aria-current={segment === 'entrada' ? 'page' : undefined}
        href="/entrada"
        on:click={() => (isActive = !isActive)}>
        Entrada
      </a>
      <a
        class="navbar-item"
        aria-current={segment === 'resultados' ? 'page' : undefined}
        href="/resultados"
        on:click={() => (isActive = !isActive)}>
        Resultados
      </a>
      <a
        class="navbar-item"
        aria-current={segment === 'tabla' ? 'page' : undefined}
        href="/tabla">
        Tabla
      </a>
      {#if $session.user}
        {#if $session.user.isAdmin}
          <a
            class="navbar-item"
            aria-current={segment === 'update' ? 'page' : undefined}
            href="/update">
            Update
          </a>
        {/if}
      {/if}
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          {#if $session.user}
            <a
              class="button is-primary is-light"
              aria-current={segment === 'profile' ? 'page' : undefined}
              href="profile"
              on:click={() => (isActive = !isActive)}>
              👤 {$session.user.username}
            </a>
            <!-- <button class="button" on:click={logout}>cerrar sesión</button> -->
          {:else}
            <a
              class="button"
              aria-current={segment === 'login' ? 'page' : undefined}
              href="/login">
              iniciar sesión
            </a>
          {/if}
        </div>
      </div>
    </div>
  </div>
</nav>
