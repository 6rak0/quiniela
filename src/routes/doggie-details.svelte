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

    const parsed = await response.json();

    if (parsed.error) {
      return this.error(response.status, parsed.error);
    }

    return { parsed };
  }
</script>

<script>
  export let parsed;
</script>

<h1>welcome to the doggie details page</h1>
<ul>
  {#each parsed as doggo}
    <li>{doggo.username} - {doggo.title}</li>
  {/each}
</ul>
