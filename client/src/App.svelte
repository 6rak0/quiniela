<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import Router, { wrap, push } from "svelte-spa-router";
  import { user } from "./stores";

  import Home from "./pages/Home.svelte";
  import Dashboard from "./pages/Dashboard.svelte";
  //import Jornada from "./pages/Jornada.svelte";
  //import Resultados from "./pages/Resultados.svelte";
  import Registro from "./pages/Registro.svelte";
  import Login from "./pages/Login.svelte";
  import Profile from "./pages/Profile.svelte";
  //import Update from "./pages/Update.svelte";
  import Navbar from "./components/Navbar.svelte";
  import Loading from "./components/Loading.svelte";

  let loading = true;

  onMount(async () => {
    const { data } = await axios.get("/api/auth/user");
    $user = data.user;
    loading = false;
  });

  function conditionsFailed(e) {
    const { reason } = e.detail.userData;
    switch (reason) {
      case "not authenticated":
        return push("/login");
      case "authenticated":
        return push("/dashboard");
      case "not authorized":
        return push("/login");
    }
  }

  const routes = {
    "/": wrap(Home, { reason: "authenticated" }, () => !$user),
    "/dashboard": wrap(Dashboard, { reason: "not authenticated" }, () => $user),
    "/profile": wrap(Profile, { rerason: `not authenticated` }, () => $user),
    //"/jornada": Jornada,
    // "/resultados": wrap(
    //   Resultados,
    //   { reason: "not authenticated" },
    //   () => $user
    // ),
    "/registro": wrap(Registro, { reason: "authenticated" }, () => !$user),
    "/login": wrap(Login, { reason: "authenticated" }, () => !$user)
    //"/update": Update
    //"/update": wrap(Update, { reason: "not authorized" }, () => $user.isAdmin)
  };
</script>

{#if loading}
  <Loading />
{:else}
  <Navbar />
  <Router {routes} on:conditionsFailed={conditionsFailed} />
{/if}
