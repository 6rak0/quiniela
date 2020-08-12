<script>
  import axios from "axios";

  async function getData() {
    const { data } = await axios.get(`/api/partidos`);
    console.log(data);
  }
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<button on:click={getData}>test</button>
