<script lang="ts">
	import { BACKEND_URL_CLIENT } from "../static/static_values";
	import type { User } from "src/models/model.user";
	import DeployButton from "../components/DeployButton.svelte";
    import type { Machine, UserMachine } from "src/models/model.machine";

	export let data: {
		user: string;
		userTableData: User[];
		machineTableData: Machine[];
	};

	let { user, userTableData, machineTableData} = data;

	userTableData = userTableData.sort(
		(x, y) =>
			y.flags.reduce((ySum, yVal) => (ySum = yVal.score), 0) -
			x.flags.reduce((xSum, xVal) => (xSum = xVal.score), 0)
	);

	let submitFlag = async (event: any) => {
		let fd = new FormData(event.target);

		let resp = await fetch(`${BACKEND_URL_CLIENT}/flags/submit`, {
			method: "POST",
			body: JSON.stringify({ username: user, flag: fd.get("flag") }),
		});

		if (resp.status == 200) {
			location.reload();
		} else {
			// TODO: Handle error
			location.reload();
		}
	};
</script>

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

{#if user}
	<div class="wrapper">
		<h1>Submit flag</h1>
		<br />
	</div>
	<div class="wrapper">
		<form on:submit|preventDefault={submitFlag} class="">
			<input type="text" id="flag" name="flag" />
			<input type="submit" value="Submit" />
		</form>
	</div>
{/if}

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

<style>
	* {
		padding: 0;
		margin: 0;
	}

	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	h1 {
		font-size: 1.5rem;
		margin-top: 1.5em;
		color: #111;
		margin-bottom: 1.5em;
	}

	input[type="text"] {
		border-radius: 10px 0px 0px 10px;
		width: 200px;
		height: 50px;
		padding-right: 50px;
		background: rgba(0, 0, 0, 0.1);
		border: 0;
	}

	input[type="submit"] {
		margin-left: -5px;
		border-radius: 0px 10px 10px 0px;
		height: 50px;
		width: 50px;
		background: rgba(255, 137, 0, 0.9);
		color: rgba(0, 0, 0, 0.8);
		border: 0;
	}

	table,
	th,
	td {
		border-collapse: collapse;
		margin-bottom: 10px;
	}

	th,
	td {
		border-style: solid;
		border-width: 0 1px 1px 0;
		border-color: rgba(0, 0, 0, 0.1);
	}

	table {
		font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
		font-size: 14px;
		border-radius: 10px;
		border-spacing: 0;
		text-align: center;
	}

	.player td {
		color: rgba(0, 0, 0, 1);
		font-weight: bold;
		background: rgba(215, 215, 215, 1);
		color: rgba(0, 0, 0, 0.8);
	}

	th {
		background: rgba(255, 137, 0, 0.9);
		padding: 10px 20px;
		color: rgba(129, 69, 0, 1);
	}

	th:first-child,
	td:first-child {
		padding: 7px 8px;
	}

	th:first-child {
		border-top-left-radius: 5px;
	}

	th:last-child {
		border-top-right-radius: 5px;
		border-right: none;
	}

	td {
		padding: 7px 20px;
		background: rgba(230, 230, 230, 1);
		color: rgba(0, 0, 0, 0.6);
	}

	tr:last-child td:first-child {
		border-radius: 0 0 0 5px;
	}
	tr:last-child td:last-child {
		border-radius: 0 0 5px 0;
	}
	tr td:last-child {
		border-right: none;
	}
</style>
