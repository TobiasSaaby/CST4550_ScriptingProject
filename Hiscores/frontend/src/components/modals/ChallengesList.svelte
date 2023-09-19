<script lang="ts">
    import { userStore } from "../../stores/store.user";
    import { userChallengeStore } from "../../stores/store.userchallenge";
    import DeployButton from "../DeployButton.svelte";
    import Modal from "../Modal.svelte";

    export let showModal = false;
    
    let user: any;
    let challengeTableData: any;

    userStore.subscribe(x => user = x);
    userChallengeStore.subscribe(x => challengeTableData = x);
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
			{#each challengeTableData as challenge}
				<tr>
					<td>{challenge.description}</td>
					{#if challenge.hosted}
						<td
							><DeployButton bind:challenge /></td
						>
					{:else}
						<td>{challenge.access}</td>
					{/if}
					<td>{challenge.score}</td>
					{#if user}
						<td
							>Status: {challenge.state?.status || "Not done!"}</td
						>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
</Modal>
<style>

.wrapper {
  text-align: center;
}

h1 {
  color: #00ff00; /* Green text color */
}

table {
  border-collapse: collapse;
  width: 100%;
  background-color: #111; /* Dark background color */
  color: #00ff00; /* Green text color */
}

th, td {
  text-align: center;
}

th {
  background-color: #000; /* Black header background */
}

th, td {
  border-bottom: 1px solid #00ff00; /* Green border for cells */
}

tbody tr:nth-child(even) {
  background-color: #222; /* Slightly lighter background for even rows */
}

tbody tr:nth-child(odd) {
  background-color: #111; /* Dark background for odd rows */
}

</style>