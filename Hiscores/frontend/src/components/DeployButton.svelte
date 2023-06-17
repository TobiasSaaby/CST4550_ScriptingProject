<script lang="ts">
	import { onMount } from "svelte";

	export let imageId = "";
	export let loading = false;
	let ip = "";

	let i = 0;

	onMount(() => {
		console.log("Check button status...");
	});

	const init = async () => {
		console.log(`Initiating Image: ${imageId}`);
		loading = true;
		checkState();
	};

	const checkState = async () => {
		setTimeout(() => {
			if (i != 3) {
				console.log("checking init");
				checkState();
				i++;
			} else {
				console.log("It's UP!");
				loading = false;
				ip = "127.0.0.1";
			}
		}, 1000);
	};

	const terminate = () => {
		console.log(`Terminating CTF ${imageId}`)
		ip = "";
		loading = false;
	}
</script>

<div class="form">
	{#if ip}
		{ip}<button on:click={() => terminate()}>Terminate CTF</button>
	{:else if !loading}
		<button on:click={() => init()}> Initialize CTF </button>
	{:else}
		<button>Loading...</button>
	{/if}
</div>

<style>
	.form {
		position: relative;
		padding: 20px;
	}
</style>
