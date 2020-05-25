<script>
  import Jornada from "./components/Jornada.svelte";
  import Footer from "./components/Footer.svelte";
  import jornadas from "./jornadas.js";

  const now = Date.now();
  $: jornadaActiva = jornadas.find(jornada => now < jornada.fin);
  let activeItem;

  const minus = () => {
    if (jornadaActiva.numero === 13) return;
    else {
      jornadaActiva = jornadas.find(
        jornada => jornadaActiva.numero - 1 === jornada.numero
      );
    }
  };
  const plus = () => {
    if (jornadaActiva.numero === 17) return;
    else {
      jornadaActiva = jornadas.find(
        jornada => jornadaActiva.numero + 1 === jornada.numero
      );
    }
  };
</script>

<style>
  main {
    max-width: 960px;
    margin: 40px auto;
  }
  h2 {
    text-align: center;
  }
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
  li {
    margin: 0 8px;
    font-size: 1.2rem;
    color: #555;
  }
</style>

<main>
  <ul>
    <li>
      <button on:click={minus}>«</button>
    </li>
    <li>
      <h2>Jornada {jornadaActiva.numero}</h2>
    </li>
    <li>
      <button on:click={plus}>»</button>
    </li>
  </ul>
  <Jornada {jornadaActiva} {activeItem} />
</main>
<Footer />
