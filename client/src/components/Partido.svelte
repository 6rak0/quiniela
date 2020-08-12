<script>
  export let partido;
</script>

<style>
  .box {
    width: 70%;
  }
  img {
    width: 36px;
    height: 36px;
  }
  .is-flex {
    justify-content: space-between;
    align-items: center;
  }
</style>

<div class="container box">
  <p class="has-text-centered has-text-weight-light">
    {new Date(partido.fecha).toLocaleString()}
  </p>
  <div class="container is-flex">
    <img src="./img/{partido.local.corto}.png" alt={partido.local.corto} />
    <p>{partido.local.equipo}</p>
    <p>{partido.local.goles || 0}</p>
  </div>
  <div class="container is-flex">
    <img src="./img/{partido.visita.corto}.png" alt={partido.visita.corto} />
    <p>{partido.visita.equipo}</p>
    <p>{partido.visita.goles || 0}</p>
  </div>
</div>
