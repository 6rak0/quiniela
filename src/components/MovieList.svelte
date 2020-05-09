<script>
  import { flip } from "svelte/animate";
  import { db } from "../stores/firebase.js";
  import Card from "../shared/Card.svelte";
  import Button from "../shared/Button.svelte";

  let movies = [];

  const deleteMovie = id => {
    db.collection("movies")
      .doc(id)
      .delete();
  };

  db.collection("movies").onSnapshot(data => {
    movies = data.docs;
  });
</script>

<style>
  .movie-list {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
</style>

<div class="movie-list">
  {#each movies as movie (movie.id)}
    <div animate:flip={{ duration: 500 }}>
      <Card>
        {movie.data().title}
        <Button type="delete" on:click={() => deleteMovie(movie.id)}>X</Button>
      </Card>
    </div>
  {/each}
</div>
