<script lang="ts">
	import { page } from "$app/stores";
	import { BACKEND_URL } from "../static/static_values";
	import { onMount } from "svelte";

	export let imageId = "";
	export let loading = false;

	let ip = "";
	let error = "";
	let instanceId = "";

	onMount(() => {
		console.log("Check button status...");
	});

	const init = async () => {
		let resp = await fetch(`http://${BACKEND_URL}/machines/init`, {
			method: "POST",
			body: JSON.stringify({
				imageid: imageId,
				username: $page.data.user,
			}),
		});
		let respJson = await resp.json();

		instanceId = respJson.status;

		loading = true;
		checkState();
	};

	const checkState = async () => {
		setTimeout(async () => {
			let resp = await fetch(`http://${BACKEND_URL}/machines`, {
				method: "POST",
				body: JSON.stringify({
					imageid: instanceId,
					username: $page.data.user,
				}),
			});

			let respJson = await resp.json();

			if (!respJson.ip) {
				checkState();
			} else {
				loading = false;
				ip = respJson.ip;
			}
		}, 3000);
	};

	const terminate = async () => {
		let resp = await fetch(`http://${BACKEND_URL}/machines/terminate`, {
			method: "POST",
			body: JSON.stringify({
				imageid: instanceId,
				username: $page.data.user,
			}),
		});
		let respJson = await resp.json();

		ip = "";
		loading = false;
	};
</script>

<div class="form">
	{#if ip}
		{ip}<button on:click={() => terminate()}>Terminate CTF</button>
	{:else if error}
		{error}
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
