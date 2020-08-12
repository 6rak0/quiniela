<script context="module">
  export async function preload(page, session) {
    const { token } = session;

    if (!token) {
      return this.redirect(302, "login");
    }

    const response = await this.fetch(`http://pi.box:4000/api/partidos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (data.error) {
      return this.error(response.status, data.error);
    }

    return { data };
  }
</script>

<script>
  export let data;
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<p>partidos</p>
{#each data as partido}{partido.username} - {partido.title}{/each}
