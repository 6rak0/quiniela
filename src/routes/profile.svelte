<script>
  import { stores } from "@sapper/app";
  const { session } = stores();
</script>

<svelte:head>
  <title>Perfil</title>
</svelte:head>

<div class="container">
  <div class="section">
    <p>{$session.user.username}</p>
    <p>{$session.user.id}</p>
    <p>{$session.user.isAdmin}</p>
  </div>
</div>
