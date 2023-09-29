<script lang="ts">
    import { onMount } from "svelte";
    import mapboxgl from "mapbox-gl";
    import "mapbox-gl/dist/mapbox-gl.css";
    import type { Challenge } from "../models/model.challenge";
    import { userChallengeStore } from "../stores/store.userchallenge";
    import ChallengeDetails from "./modals/ChallengeDetails.svelte";
    import { countries } from "../countries";
    import { getMarkerIcon } from "$lib/dynamics/markers";

    let m: Challenge[];
    let map: any;
    let selected: Challenge;
    let showModal: Boolean = false;

    userChallengeStore.subscribe((x) => (m = x));

    onMount(() => {
        mapboxgl.accessToken =
            "pk.eyJ1Ijoic2V2ZWxib2VuIiwiYSI6ImNsbHhocmZrNzJoMjUzZXBlMjExdHk4cm0ifQ.c_Zemr0BA-eNGfvjh0HTfg";

        map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/sevelboen/cllxhvvdp00j301qx1ky4ekmn",
            center: [0, 0],
            zoom: 1,
        });

        map.on("load", () => {
            m.forEach((x) => {
                const country = countries[Math.floor(Math.random() * countries.length)];

                let mark = new mapboxgl.Marker(getMarkerIcon(x?.type, x?.state?.state))
                    .setLngLat([country[1], country[0]])
                    .addTo(map);

                mark.getElement().addEventListener("click", () => {
                    selected = x;
                    showModal = true;
                });

                x.marker = mark;
            });
        });

        const elements = document.getElementsByClassName(
            "mapboxgl-ctrl-bottom-right"
        );

        while (elements.length > 0 && elements[0] && elements[0].parentNode) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    });
</script>

<div id="map" class="map" />

<ChallengeDetails bind:showModal bind:challenge={selected} />

<style>
    .map {
        display: block;
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: lightblue;
    }
</style>
