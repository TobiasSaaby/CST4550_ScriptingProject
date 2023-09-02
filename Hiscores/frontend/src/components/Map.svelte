<script lang="ts">
    import { onMount } from "svelte";
    import mapboxgl from "mapbox-gl";
    import "mapbox-gl/dist/mapbox-gl.css";
    import type { Machine } from "../models/model.machine";
    import { userMachineStore } from "../stores/store.usermachine";
    import MachineDetails from "./modals/MachineDetails.svelte";
    import AlertIcon from "../lib/images/alert.png";
    import {countries} from "../../../countries"

    let m: Machine[];
    let map: any;
    let selected: Machine;
    let showModal: Boolean = false;

    let markerSize = "50"

    userMachineStore.subscribe((x) => (m = x));

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
                let el = document.createElement("div");
                
                el.className = 'marker';
                el.style.backgroundImage = `url(${AlertIcon})`;
                el.style.width = `${markerSize}px`;
                el.style.height = `${markerSize}px`;
                el.style.backgroundSize = '100%';

                const country = countries[Math.floor(Math.random()*countries.length)]

                //let mark = new mapboxgl.Marker({ color: "black" })
                    let mark = new mapboxgl.Marker(el)
                    .setLngLat([country[1], country[0]])
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

<MachineDetails bind:showModal machine={selected} />

<style>
    .map {
        display: block;
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: lightblue;
    }
</style>
