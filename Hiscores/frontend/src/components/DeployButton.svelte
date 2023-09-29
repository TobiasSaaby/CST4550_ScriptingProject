<script lang="ts">
	import { page } from "$app/stores";
    import { challengeState, type Challenge, type UserChallenge } from "../models/model.challenge";
	import { BACKEND_URL_CLIENT } from "../static/static_values";
	import { onMount } from "svelte";
    import { getMarkerIconInner } from "$lib/dynamics/markers";

	export let challenge: Challenge;

	let error = "";

	onMount(() => {
		if (challenge?.state?.instanceid) {
			checkState();
		}
	});

	const init = async () => {
		challenge.marker.getElement().innerHTML = getMarkerIconInner(challenge?.type, challengeState.Initialising);

		let resp = await fetch(`${BACKEND_URL_CLIENT}/challenges/init`, {
			method: "POST",
			body: JSON.stringify({
				challengeid: challenge.id,
				imageid: challenge.access,
				username: $page.data.user,
			}),
		});
		let respJson = await resp.json();
	
		challenge.state.instanceid = respJson.status;

		if (challenge.state?.instanceid && challenge.state.instanceid.length > 0 && challenge.state.instanceid[0] != "i") {
			error = "Error when creating EC2 instance...";
		}

		checkState();
	};

	const checkState = async () => {
		setTimeout(async () => {
			let resp = await fetch(`${BACKEND_URL_CLIENT}/challenges`, {
				method: "POST",
				body: JSON.stringify({
					challengeid: challenge.id,
					instanceid: challenge.state.instanceid,
					username: $page.data.user,
				}),
			});

			let respJson = await resp.json();

			if (!respJson.ip) {
				checkState();
			} else {
				challenge.state.ip = respJson.ip;
				challenge.marker.getElement().innerHTML = getMarkerIconInner(challenge?.type, challengeState.Running);
			}
		}, 3000);
	};

	const terminate = async () => {
		challenge.marker.getElement().innerHTML = getMarkerIconInner(challenge?.type, challengeState.Started);
		let resp = await fetch(`${BACKEND_URL_CLIENT}/challenges/terminate`, {
			method: "POST",
			body: JSON.stringify({
				challengeid: challenge.id,
				instanceid: challenge.state.instanceid,
				username: $page.data.user,
			}),
		});
		let respJson = await resp.json();
		// TODO: Check response

		
		challenge.state.ip = "";
		challenge.state.instanceid = "";
	};
</script>

<div class="form">
	{#if !challenge?.state || !challenge.state.instanceid}
		<button on:click={() => init()}>
			<span />
			<span />
			<span />
			<span />
			Initialize CTF
		</button>
	{:else if challenge.state.ip}
		<button on:click={() => terminate()}>
			<span />
			<span />
			<span />
			<span />
			Terminate CTF
		</button>
	{:else if error}
		{error}	
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
