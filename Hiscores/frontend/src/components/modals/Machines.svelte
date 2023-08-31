<script lang="ts">
    import { userStore } from "../../stores/store.user";
    import { userMachineStore } from "../../stores/store.usermachine";
    import DeployButton from "../DeployButton.svelte";
    import Modal from "../Modal.svelte";

    export let showModal = false;
    
    let user: any;
    let machineTableData: any;

    userStore.subscribe(x => user = x);
    userMachineStore.subscribe(x => machineTableData = x);
</script>
<Modal bind:showModal>
<div class="wrapper">
	<h1>Flag details</h1>
	<br />
</div>
<div class="wrapper">
	<table>
		<thead>
			<tr>
				<th>Description</th>
				<th>Access</th>
				<th>Score</th>
				{#if user}
					<th>Status</th>
				{/if}
			</tr><tr />
		</thead>
		<tbody>
			{#each machineTableData as machine}
				<tr>
					<td>{machine.description}</td>
					{#if machine.hosted}
						<td
							><DeployButton
								machineId={machine.id}
								imageId={machine.access}
								ip={machine.state?.ip}
								instanceId={machine.state?.instanceid}
							/></td
						>
					{:else}
						<td>{machine.access}</td>
					{/if}
					<td>{machine.score}</td>
					{#if user}
						<td
							>Status: {machine.state?.status || "Not done!"}</td
						>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
</Modal>
<style>
    h1, tr {
        color: #01b118d0;
    }
</style>