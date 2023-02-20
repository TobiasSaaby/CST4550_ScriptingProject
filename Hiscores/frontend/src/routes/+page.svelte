<script lang="ts">
    import { enhance } from "$app/forms";
	import type { User } from "src/models/model.user";
	import type { Flag } from "src/models/model.flag";

	export let data: {user: string, userTableData: User[], flagTableData: Flag[]};
	let {user, userTableData, flagTableData} = data;

	userTableData = userTableData.sort((x, y) =>
		y.flags.reduce((ySum, yVal) => ySum = yVal.score, 0) -
		x.flags.reduce((xSum, xVal) => xSum = xVal.score, 0));
</script>
<h1>Hiscore:</h1>
<div class="wrapper">
	<table>
		<thead>
			<tr>
				<th>Username</th>
				<th>Score</th>
				<th>Flags</th>
			</tr>
		</thead>
		<tbody> <!-- Remember to highlight current user -->
			{#each Object.keys(userTableData) as userData}
				<tr class="{userTableData[Number(userData)].username == user ? 'player' : ''}">
					<td>{userTableData[Number(userData)].username}</td>
					<td>{userTableData[Number(userData)].flags.reduce(
							(pSum, x) => pSum + x.score,
							0
						)}</td>
					<td>{userTableData[Number(userData)].flags.length}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

{#if user}
<h1>Submit flag:</h1>
<form use:enhance method="POST" action="?/submitFlag" class="">
<fieldset>
	<fieldset>
		<label for="flag" >Flag</label>
		<input type="text" id="flag" name="flag" />
	</fieldset>

	<button type="submit">Submit</button>
</fieldset>
</form>
{/if}

<h1>Flag details:</h1>
<br />
<div class="wrapper">
	<table>
		<thead>
			<tr>
				<th>Description</th>
				<th>Access (Port)</th>
				<th>Score</th>
				{#if user}
				<th>Status</th>
				{/if}
			</tr><tr />
		</thead>
		<tbody>
			{#each flagTableData as flag}
				<tr>
					<td>{flag.description}</td>
					<td>{flag.access}</td>
					<td>{flag.score}</td>
					{#if user}
					<td>Status goes here</td>
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
	th,
	td {
		border-style: solid;
		border-width: 0 1px 1px 0;
		border-color: rgba(0, 0, 0, 0.1);
	}

	th:first-child {
		border-top-left-radius: 5px;
	}
	th:last-child {
		border-top-right-radius: 5px;
		border-right: none;
	}
	th:first-child,
	td:first-child {
		padding: 7px 8px;
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
	table,
	th,
	td {
		border-collapse: collapse;
		margin-bottom: 10px;
	}

	table.redTable thead th {
		font-size: 19px;
		font-weight: bold;
		color: #ffffff;
		text-align: center;
		border-left: 2px solid #a40808;
	}

	table.redTable thead th:first-child {
		border-left: none;
	}

	table.blueTable thead th {
		font-size: 15px;
		font-weight: bold;
		color: #ffffff;
		border-left: 2px solid #d0e4f5;
	}

	table.blueTable thead th:first-child {
		border-left: none;
	}
</style>
