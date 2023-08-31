<script lang="ts">
    import { onMount } from "svelte";
    import mapboxgl from "mapbox-gl";
    import "mapbox-gl/dist/mapbox-gl.css";
    import type { Machine } from "../models/model.machine";
    import { userMachineStore } from "../stores/store.usermachine";
    import MachineDetails from "./modals/MachineDetails.svelte";

    let m: Machine[];
    let map: any;
    let selected: Machine;
    let showModal: Boolean = false;

    userMachineStore.subscribe(x => m = x)

    onMount(() => {
        mapboxgl.accessToken = "pk.eyJ1Ijoic2V2ZWxib2VuIiwiYSI6ImNsbHhocmZrNzJoMjUzZXBlMjExdHk4cm0ifQ.c_Zemr0BA-eNGfvjh0HTfg";

        map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/sevelboen/cllxhvvdp00j301qx1ky4ekmn",
            center: [0, 0],
            zoom: 1,
        });

        map.on("load", () => {
            m.forEach((x) => {
                let mark = new mapboxgl.Marker({ color: "black" })
                    .setLngLat([10 * x.id, 10 * x.id])
                    .addTo(map);

                mark.getElement().addEventListener("click", () => {
                    selected = x;
                    showModal = true;
                });
            });

            const elements = document.getElementsByClassName(
                "mapboxgl-ctrl-bottom-right"
            );

            while (
                elements.length > 0 &&
                elements[0] &&
                elements[0].parentNode
            ) {
                elements[0].parentNode.removeChild(elements[0]);
            }
        });
    });
</script>

<div id="map" class="map" />

<MachineDetails bind:showModal machine={selected}/>

<style>
    .map {
        display: block;
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: lightblue;
    }
</style>
