<script lang="ts">
  import { userStore } from "../stores/store.user";
  import Challenges from "../components/modals/ChallengesList.svelte";
  import Hiscore from "../components/modals/Hiscore.svelte";
  import Login from "../components/modals/Login.svelte";
  import Register from "../components/modals/Register.svelte";

  let u: any;
  let showChallengesModal = false;
  let showHiscoresModal = false;
  let showLoginModal = false;
  let showRegisterModal = false;

  userStore.subscribe((x) => (u = x));
</script>

<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
/>
<header>
  <!-- svelte-ignore a11y-missing-attribute -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  {#if u}<a on:click={() => console.log(u)}
      ><img
        src="https://github.com/ecemgo/today-i-learned-app/assets/13468728/4f2923ea-9eca-4221-8b18-7198f78fd04e"
        alt="logo"
        class="logo"
      /></a
    >
  {:else}
    <a />
  {/if}
  <nav class="navbar">
    <a
      on:click={() => (showChallengesModal = true)}
      class="nav-item"
      style="--i: 0">Challenges</a
    >
    <a
      on:click={() => (showHiscoresModal = true)}
      class="nav-item"
      style="--i: 0">Hiscores</a
    >
    {#if !u}
      <a
        on:click={() => (showRegisterModal = true)}
        class="nav-item"
        style="--i: 0">Register</a
      >
      <a
        on:click={() => (showLoginModal = true)}
        class="nav-item"
        style="--i: 0">Login</a
      >
    {:else}
      <a on:click={() =>{ userStore.set("");document.cookie = `session=""`
 }} class="nav-item" style="--i: 0"
        >Logout</a
      >
    {/if}
  </nav>
</header>

<Challenges bind:showModal={showChallengesModal} />
<Hiscore bind:showModal={showHiscoresModal} />
<Login bind:showModal={showLoginModal} />
<Register bind:showModal={showRegisterModal} />

<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1rem 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 5;
  }

  .nav-item {
    position: relative;
    color: #fff;
    font-size: 1rem;
    font-weight: 500;
    line-height: 25px;
    letter-spacing: -0.13px;
    text-decoration: none;
    margin-left: 2.5rem;
    transition: all 0.5s ease;
  }

  .nav-item:hover {
    color: rgba(0, 185, 46, 0.9);
  }

  .nav-item::after {
    content: "";
    position: absolute;
    bottom: -0.3rem;
    left: 50%;
    width: 0;
    height: 0.15rem;
    transform: translateX(-50%);
    background-color: rgba(0, 185, 46, 0.9);
    transition: all 0.5s ease;
  }

  .nav-item:hover::after {
    width: 100%;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 900px) {
    header {
      padding: 1.3rem 5%;
    }
  }

  @media (max-width: 700px) {
    header::before {
      content: "";
      top: 0;
      left: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(50px);
      z-index: -1;
    }

    header::after {
      content: "";
      top: 0;
      left: -100%;
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      );
      transition: 0.8s;
    }

    .navbar {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      height: 0;
      background: rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(50px);
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .nav-item {
      display: block;
      font-size: 1.1rem;
      margin: 2rem 0;
      text-align: center;
      transform: translateY(-50px);
      opacity: 0;
      transition: all 0.3s ease;
    }

    .nav-item:hover::after {
      width: auto;
    }

    #check:checked ~ .navbar a {
      transform: translateY(0);
      opacity: 1;
      transition-delay: calc(0.15s * var(--i));
    }
  }
</style>
