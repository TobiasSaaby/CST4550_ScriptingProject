<script lang="ts">
    import { BACKEND_URL_CLIENT } from "../../static/static_values";
    import Modal from "../Modal.svelte";

    export let showModal = false;
    let entryData: {
        username: string,
        password: string,
        repPassword: string
    }

    const submitForm = async (e: any) => {
        let formData = new FormData(e.target)

        entryData = {
            username: formData.get("username")?.toString() ?? "",
            password: formData.get("password")?.toString() ?? "",
            repPassword: formData.get("repPassword")?.toString() ?? ""
        }

		let resp = await fetch(`${BACKEND_URL_CLIENT}/users/register`, {method: 'POST', body: JSON.stringify({username: entryData.username, password: entryData.password, repeat_password: entryData.repPassword})});
		let respJson = await resp.json();
        //TODO: Set token in store
    };

</script>

<Modal bind:showModal>
    <div class="login-box">
        <h2>Login</h2>
        <form id="loginForm" on:submit|preventDefault={submitForm}>
            <div class="user-box">
                <input id="username" type="text" name="username" />
                <label for="username">Username</label>
            </div>
            <div class="user-box">
                <input id="password" type="password" name="password" />
                <label for="password">Password</label>
            </div>
            <div class="user-box">
                <input id="repPassword" type="password" name="repPassword" />
                <label for="repPassword">Repeat Password</label>
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-missing-attribute -->
            <button type="submit">
                <span />
                <span />
                <span />
                <span />
                Submit
            </button>
        </form>
    </div>
</Modal>

<style>
    .login-box {
        box-sizing: border-box;
        border-radius: 10px;
    }

    .login-box h2 {
        margin: 0 0 30px;
        padding: 0;
        color: #fff;
        text-align: center;
    }

    .login-box .user-box {
        position: relative;
    }

    .login-box .user-box input {
        width: 100%;
        padding: 10px 0;
        font-size: 16px;
        color: #fff;
        margin-bottom: 30px;
        border: none;
        border-bottom: 1px solid #fff;
        outline: none;
        background: transparent;
    }
    .login-box .user-box label {
        position: absolute;
        top: 0;
        left: 0;
        padding: 10px 0;
        font-size: 16px;
        color: #fff;
        pointer-events: none;
        transition: 0.5s;
    }

    .login-box .user-box input:focus ~ label,
    .login-box .user-box input:valid ~ label {
        top: -20px;
        left: 0;
        color: #00dd1d;
        font-size: 12px;
    }
    
    .login-box form button {
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

    .login-box button:hover {
        color: #00dd1d;
        color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 5px #00dd1d, 0 0 25px #00dd1d, 0 0 50px #00dd1d,
            0 0 100px #00dd1d;
    }

    .login-box button span {
        position: absolute;
        display: block;
    }

    .login-box button span:nth-child(1) {
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

    .login-box button span:nth-child(2) {
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

    .login-box button span:nth-child(3) {
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

    .login-box button span:nth-child(4) {
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
