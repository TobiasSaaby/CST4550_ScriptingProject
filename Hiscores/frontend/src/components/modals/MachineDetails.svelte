<script lang="ts">
    import DeployButton from "../DeployButton.svelte";
    import Modal from "../Modal.svelte";
    import type { Machine } from "../../models/model.machine";

export let showModal: Boolean;
export let machine: Machine;
</script>

<Modal bind:showModal>
    <h2 slot="header">
        {machine?.description}
    </h2>
    <p>    Score: {machine?.score}<br />
    Status: {machine?.state?.status || "Not done!"}<br />
</p>

    {#if machine?.hosted}
        <DeployButton
            machineId={machine.id}
            imageId={machine.access}
            ip={machine.state?.ip}
            instanceId={machine.state?.instanceid}
        />
    {:else}
        {machine?.access}
    {/if}
</Modal>
<style>
    h2, p {
        color: green;
    }
</style>