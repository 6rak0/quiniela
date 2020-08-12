<script>
  import { goto, stores } from "@sapper/app";
  import { onMount } from "svelte";
  import { partidos, jA } from "../stores";
  import axios from "axios";
  import jornadas from "../jornadas";
  const { session } = stores();
  const now = Date.now();
  $jA = jornadas.find(jornada => now < jornada.fin);

  onMount(async () => {
    const res = await axios.get(
      `http://45.77.197.176:4000/api/partidos/${$jA.número}`
    );
    $partidos = res.data;
    if ($session.user) goto("/tabla");
  });
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .container > * {
    margin: 20px;
  }
</style>

<section class="hero is-link is-fullheight-with-navbar">
  <div class="hero-body">
    <div class="container has-text-centered">
      <img src="./img/logo-guardianes.png" alt="logo" />
      <a href="/registro" class="button is-primary is-light">Regístrate</a>
      <a href="/login" class="button is-primary">Inicia sesión</a>
    </div>
  </div>
</section>
