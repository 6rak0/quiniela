<script>
  import { createEventDispatcher } from "svelte";
  import { db } from "../stores/firebase.js";
  import Button from "../shared/Button.svelte";

  const dispatcher = createEventDispatcher();

  let title;
  const handleSubmit = () => {
    db.collection("movies").add({ title });
    dispatcher("tabChange", "Lista");
  };
</script>

<style>
  form {
    width: 80%;
    margin: 60px auto;
    text-align: center;
  }
  .form-field {
    margin: 20px auto 60px auto;
  }
  input {
    width: 100%;
    border: none;
    border-block-end: 2px solid teal;
    font-size: 20px;
    background: #fafafa;
  }
  label {
    display: block;
    margin: 10px auto;
    font-size: 0.9rem;
    text-align: left;
  }
</style>

<form on:submit|preventDefault={handleSubmit}>
  <div class="form-field">
    <label for="movie">título de la película</label>
    <input type="text" id="movie" required bind:value={title} />
  </div>
  <Button>👍</Button>
</form>
