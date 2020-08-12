<script>
  import axios from "axios";

  async function getData() {
    const { data } = await axios.get(`/api/partidos`);
    console.log(data);
  }
</script>

<button on:click={getData}>test</button>
