<script lang="ts">
	import { onMount } from "svelte";
	import * as topojson from "topojson-client";
	import { geoPath, geoEquirectangular } from "d3-geo";
	import { draw } from "svelte/transition";
	import type { Country } from "src/models/model.map";

	const width_const = 1550;
	const height_const = 750;

	const geoProjection = geoEquirectangular()
		.scale(250)
		.translate([width_const / 2, height_const / 2]);

	let countries: Country[] = [];
	let selected: Country;

	onMount(async () => {
		const world = await fetch(
			"https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
		).then((d) => d.json());

		countries = topojson.feature(world, world.objects.countries).features;
	});
</script>

<svg width={width_const} height={height_const} viewBox={`0 0 ${width_const} ${height_const}`}>
	<g fill="white" stroke="black">
		{#each countries as feature, i}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<path
				d={geoPath().projection(geoProjection)(feature)}
				on:click={() => selected = feature }
				class="country"
				in:draw={{ delay: i * 50, duration: 1000 }}
				fill={feature.properties.name[0] == "A" 
					? "hsl(80 20% 50% / 20%)"
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

<div class="selectedName">{selected?.properties.name ?? ""}</div>

<style>
	.country:hover {
		fill: hsl(0 0% 50% / 20%);
	}

	.selectedName {
		text-align: center;
		margin-top: 8px;
		font-size: 1.5rem;
	}
</style>
