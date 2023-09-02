<script lang="ts">
	import { page } from "$app/stores";
	import { BACKEND_URL_CLIENT } from "../static/static_values";
	import { onMount } from "svelte";

	export let ip: string = "";
	export let imageId: string = "";
	export let machineId: number;
	export let instanceId: string = "";

	let error = "";

	onMount(() => {
		if (instanceId) {
			checkState();
		}
	});

	const init = async () => {
		let resp = await fetch(`${BACKEND_URL_CLIENT}/machines/init`, {
			method: "POST",
			body: JSON.stringify({
				machineid: machineId,
				imageid: imageId,
				username: $page.data.user,
			}),
		});
		let respJson = await resp.json();

		instanceId = respJson.status;

		if (instanceId[0] != "i") {
			error = "Error when creating EC2 instance...";
		}

		checkState();
	};

	const checkState = async () => {
		setTimeout(async () => {
			let resp = await fetch(`${BACKEND_URL_CLIENT}/machines`, {
				method: "POST",
				body: JSON.stringify({
					machineid: machineId,
					instanceid: instanceId,
					username: $page.data.user,
				}),
			});

			let respJson = await resp.json();

			if (!respJson.ip) {
				checkState();
			} else {
				ip = respJson.ip;
			}
		}, 3000);
	};

	const terminate = async () => {
		let resp = await fetch(`${BACKEND_URL_CLIENT}/machines/terminate`, {
			method: "POST",
			body: JSON.stringify({
				machineid: machineId,
				instanceid: instanceId,
				username: $page.data.user,
			}),
		});
		let respJson = await resp.json();

		ip = "";
		instanceId = "";
	};
</script>

<div class="form">
	{#if ip}
		{ip}<button on:click={() => terminate()}>
			<span />
			<span />
			<span />
			<span />
			Terminate CTF
		</button>
	{:else if error}
		{error}
	{:else if !instanceId}
		<button on:click={() => init()}>
			<span />
			<span />
			<span />
			<span />
			Initialize CTF
		</button>
	{:else}
		<button>
			<span />
			<span />
			<span />
			<span />
			Loading...
		</button>
	{/if}
</div>

<style>
	.form {
		position: relative;
		padding: 20px;
	}

	button {
		border: none;
		position: relative;
		display: inline-block;
		padding: 10px 20px;
		color: #00dd1d;
		background-color: transparent;
		font-size: 12px;
		text-decoration: none;
		text-transform: uppercase;
		overflow: hidden;
		transition: 0.5s;
		letter-spacing: 4px;
	}

	button:hover {
		color: #00dd1d;
		color: #fff;
		border-radius: 5px;
		box-shadow: 0 0 5px #00dd1d, 0 0 25px #00dd1d, 0 0 50px #00dd1d,
			0 0 100px #00dd1d;
	}

	button span {
		position: absolute;
		display: block;
	}

	button span:nth-child(1) {
		top: 0;
		left: -100%;
		width: 100%;
		height: 2px;
		background: linear-gradient(90deg, transparent, #00dd1d);
		animation: btn-anim1 1s linear infinite;
	}

	@keyframes btn-anim1 {
		0% {
			left: -100%;
		}
		50%,
		100% {
			left: 100%;
		}
	}

	button span:nth-child(2) {
		top: -100%;
		right: 0;
		width: 2px;
		height: 100%;
		background: linear-gradient(180deg, transparent, #00dd1d);
		animation: btn-anim2 1s linear infinite;
		animation-delay: 0.25s;
	}

	@keyframes btn-anim2 {
		0% {
			top: -100%;
		}
		50%,
		100% {
			top: 100%;
		}
	}

	button span:nth-child(3) {
		bottom: 0;
		right: -100%;
		width: 100%;
		height: 2px;
		background: linear-gradient(270deg, transparent, #00dd1d);
		animation: btn-anim3 1s linear infinite;
		animation-delay: 0.5s;
	}

	@keyframes btn-anim3 {
		0% {
			right: -100%;
		}
		50%,
		100% {
			right: 100%;
		}
	}

	button span:nth-child(4) {
		bottom: -100%;
		left: 0;
		width: 2px;
		height: 100%;
		background: linear-gradient(360deg, transparent, #00dd1d);
		animation: btn-anim4 1s linear infinite;
		animation-delay: 0.75s;
	}

	@keyframes btn-anim4 {
		0% {
			bottom: -100%;
		}
		50%,
		100% {
			bottom: 100%;
		}
	}
</style>
