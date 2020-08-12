<script>
  import { user } from "../stores";
</script>

<svelte:head>
  <title>Perfil</title>
</svelte:head>

<div class="container">
  <div class="section">
    <p>{$user.username}</p>
    <p>{$user._id}</p>
    <p>{$user.isAdmin}</p>
  </div>
</div>
