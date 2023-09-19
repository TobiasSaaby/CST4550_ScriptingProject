<script lang="ts">
    import DeployButton from "../DeployButton.svelte";
    import Modal from "../Modal.svelte";
    import type { Challenge } from "../../models/model.challenge";

    export let showModal: Boolean;
    export let challenge: Challenge;
</script>

<Modal bind:showModal>
    <h2 slot="header">
        {challenge?.description}
    </h2>
    <p>
        Score: {challenge?.score}<br />
        Status: {challenge?.state?.status || "Not done!"}<br />
    </p>

    {#if challenge?.type == 2}
        <DeployButton bind:challenge />
    {:else}
        {challenge?.access}
    {/if}
</Modal>

<style>
    h2,
    p {
        color: green;
    }
</style>
