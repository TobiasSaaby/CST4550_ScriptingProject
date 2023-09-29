<script lang="ts">
    import DeployButton from "../DeployButton.svelte";
    import Modal from "../Modal.svelte";
    import type { Challenge } from "../../models/model.challenge";
    import { BACKEND_URL_CLIENT } from "../../static/static_values";
    import { userStore } from "../../stores/store.user";

    export let showModal: Boolean;
    export let challenge: Challenge;

    let user = "";
    
    userStore.subscribe(x => user = x);


	let submitFlag = async (event: any) => {
		let fd = new FormData(event.target);

        let reqBody =JSON.stringify({ username: user, flag: fd.get("flag") });

        console.log(reqBody)
		let resp = await fetch(`${BACKEND_URL_CLIENT}/flags/submit`, {
			method: "POST",
			body: reqBody
		});

		if (resp.status == 200) {
			location.reload();
		} else {
			// TODO: Handle error
			location.reload();
		}
	};
	
</script>

<Modal bind:showModal>
    <h2 slot="header">
        {challenge?.description}
    </h2>
    <p>
        Score: {challenge?.score}<br />
        Status: {challenge?.state?.status || "Not done!"}
    </p>
    {#if challenge?.state?.ip}
    <p>PUBLIC IP: {challenge?.state?.ip}</p>
    {/if}

    {#if challenge?.type == 2}
        <DeployButton bind:challenge />
    {:else}
    <p>ACCESS PORT: {challenge?.access}</p>
    {/if}

{#if user}
	<div class="submit-box">
		<h3>Submit flag</h3>
		<form on:submit|preventDefault={submitFlag} class="submit-form">
			<input type="text" id="flag" name="flag" />
			<button type="submit"  ><span />
                <span />
                <span />
                <span />
                Submit
            </button>
		</form>
	</div>
{/if} 


</Modal>

<style>
    h2,
    h3,
    p {
        color: green;
    }

    .submit-box {
        box-sizing: border-box;
        border-radius: 10px;
    }

    .submit-box h2 {
        margin: 0 0 30px;
        padding: 0;
        color: #fff;
        text-align: center;
    }

    .submit-box .submit-form {
        position: relative;
    }

    .submit-box .submit-form input {
        width: 100%;
        padding: 10px 0;
        font-size: 16px;
        color: #fff;
        border: none;
        border-bottom: 1px solid #fff;
        outline: none;
        background: transparent;
    }
    .submit-box .submit-form label {
        position: absolute;
        top: 0;
        left: 0;
        padding: 10px 0;
        font-size: 16px;
        color: #fff;
        pointer-events: none;
        transition: 0.5s;
    }

    .submit-box .submit-form input:focus ~ label,
    .submit-box .submit-form input:valid ~ label {
        top: -20px;
        left: 0;
        color: #00dd1d;
        font-size: 12px;
    }
    
    .submit-box form button {
        border: none;
        position: relative;
        display: inline-block;
        padding: 10px 20px;
        color: #00dd1d;
        background-color: transparent;
        font-size: 16px;
        text-decoration: none;
        text-transform: uppercase;
        overflow: hidden;
        transition: 0.5s;
        margin-top: 40px;
        letter-spacing: 4px;
    }

    .submit-box button:hover {
        color: #00dd1d;
        color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 5px #00dd1d, 0 0 25px #00dd1d, 0 0 50px #00dd1d,
            0 0 100px #00dd1d;
    }

    .submit-box button span {
        position: absolute;
        display: block;
    }

    .submit-box button span:nth-child(1) {
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

    .submit-box button span:nth-child(2) {
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

    .submit-box button span:nth-child(3) {
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

    .submit-box button span:nth-child(4) {
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
