<script lang="ts">
	import { BACKEND_URL_CLIENT } from "../static/static_values";
    import Map from "../components/Map.svelte";

	/* let submitFlag = async (event: any) => {
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
	*/
</script>

	<div class="wrapper">
		<Map />
	</div> 
	<!-- 
{#if user}
	<div class="wrapper">
		<Map2 m={machineTableData}/>
	</div>
	<div class="wrapper">
		<Map m={machineTableData}/>
	</div>

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
{/if} -->

<style>
	* {
		padding: 0;
		margin: 0;
	}

	.wrapper {
		display: block;
		justify-content: center;
		align-items: center;
	}

</style>
