<script>
  import Header from "./components/Header.svelte";
  import Tabs from "./shared/Tabs.svelte";
  import NewMovie from "./components/NewMovie.svelte";
  import MovieList from "./components/MovieList.svelte";

  let items = ["Lista", "Agregar película"];
  let activeItem = "Lista";

  const tabChange = e => {
    activeItem = e.detail;
  };
</script>

<style>
  main {
    max-width: 960px;
    margin: 40px auto;
  }
</style>

<Header title="Películas" />
<main>
  <Tabs {items} {activeItem} on:tabChange={tabChange} />
  {#if activeItem === 'Lista'}
    <MovieList />
  {:else if activeItem === 'Agregar película'}
    <NewMovie on:tabChange={tabChange} />
  {/if}
</main>
