<script lang="ts">
	import { onMount } from "svelte";
	import { feature } from "topojson-client";
	import { geoPath, geoEquirectangular } from "d3-geo";
	import { draw } from "svelte/transition";
	import type { Country } from "src/models/model.map";
    import type { Machine } from "src/models/model.machine";
	import Modal from "./Modal.svelte";
    import { filter, map } from "d3";
    import { xlink_attr } from "svelte/internal";
    import DeployButton from "./DeployButton.svelte";

	export let m: Machine[];
	
	const width_const = 1550;
	const height_const = 750;

	const geoProjection = geoEquirectangular()
		.scale(250)
		.translate([width_const / 2, height_const / 2]);

	let showModal = false;
	let countries: Country[] = [];
	let selected: Country;

	onMount(async () => {
		const world = await fetch(
			"https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
		).then((d) => d.json());

		countries = feature(world, world.objects.countries).features;

		countries.forEach((x, i) => x.machine = m.find(y => y.id == i))
	});
</script>

<svg width={width_const} height={height_const} viewBox={`0 0 ${width_const} ${height_const}`}>
	<g fill="white" stroke="black">
		{#each countries as feature, i}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<path
				d={geoPath().projection(geoProjection)(feature)}
				on:click={() => {selected = feature; showModal = !!feature?.machine;}}
				class="country"
				in:draw={{ delay: i * 50, duration: 1000 }}
				fill={feature.machine != null
					? "red"
					: "hsl(200 20% 50% / 20%)"
				}
			/>
		{/each}
	</g>

	{#if selected}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<path
			d={geoPath().projection(geoProjection)(selected)}
			on:click={() => selected = null }
			fill="hsl(0 0% 50% / 20%)"
			stroke="black"
			stroke-width={2}
		/>
	{/if}
</svg>

<Modal bind:showModal>
	<h2 slot="header">
		{selected?.properties?.name}<br/>
		{selected?.machine?.description}
	</h2>
		Score: {selected?.machine?.score}<br/>
		Status: {selected?.machine?.state?.status || "Not done!"}<br/>
		{#if selected?.machine?.hosted}
			<DeployButton
					machineId={selected.machine.id}
					imageId={selected.machine.access}
					ip={selected.machine.state?.ip}
					instanceId={selected.machine.state?.instanceid}
				/>
		{:else}
			{selected?.machine?.access}
		{/if}
	
</Modal>

<style>
	.country:hover {
		fill: hsla(0, 0%, 50%, 0.541);
	}
</style>
