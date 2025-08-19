<template>
    <div>
        <h1>Mapa</h1>
        <v-sheet width="100%">
            <div id="map"></div>
        </v-sheet>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

let map;

onMounted(async() => {
    map  = new maplibregl.Map({
        container: 'map',
        center: [-76.974010, -12.1090877],
        zoom: 14,
        pitch: 40,
        bearing: 30,
        style: 'https://api.maptiler.com/maps/satellite/style.json?key=6JWVt6LFaY22nquimZpF',
    });
        // antialias: true,
    
    map.addControl(new maplibregl.NavigationControl());

})
</script>

<style scoped>
#map { height: 700px; }
</style>