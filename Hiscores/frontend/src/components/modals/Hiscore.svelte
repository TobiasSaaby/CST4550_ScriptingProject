<script lang="ts">
    import { userStore } from "../../stores/store.user";
    import { userTableStore } from "../../stores/store.usertable";
    import Modal from "../Modal.svelte";

    export let showModal = false;
    
    let user: any;
    let userTableData: any;

    userStore.subscribe(x => user = x);
    userTableStore.subscribe(x => userTableData = x);
</script>
<Modal bind:showModal>
    <div class="wrapper">
	<h1>Hiscore</h1>
	<br />
</div>
<div class="wrapper">
	<table>
		<thead>
			<tr>
				<th>Username</th>
				<th>Score</th>
				<th>Flags</th>
			</tr>
		</thead>
		<tbody>
			{#each Object.keys(userTableData) as userData}
				<tr
					class={user &&
					userTableData[Number(userData)].username == user
						? "player"
						: ""}
				>
					<td>{userTableData[Number(userData)].username}</td>
					<td
						>{userTableData[Number(userData)].flags.reduce(
							(pSum, x) => pSum + x.score,
							0
						)}</td
					>
					<td>{userTableData[Number(userData)].flags.length}</td>
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
