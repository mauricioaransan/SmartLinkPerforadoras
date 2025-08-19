<template>
    <div>
        <h1>Mapa</h1>
        <v-sheet width="100%">
            <div ref="mapContainer"></div>
        </v-sheet>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, type Ref } from 'vue';
// DRIVE_OBS
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

let map: maplibregl.Map;
const mapContainer = ref<HTMLDivElement | null>(null);

const postPORTItems = (tipo:string, latitud:number, longitud:number, color:string, valor:string, index:number, fecha:string) => {
    let finalITEM = {                        
            "type": "Feature",
            "properties": {
                "level": 0,
                "name": `AllGraph${tipo}`,
                "height": 40,
                "base_height": 0,
                "color": color,
                "center": [longitud,latitud],
                "valor": valor,
                "fecha" : fecha
            },
            "geometry": {
                "coordinates": [longitud,latitud],
                "type": "Polygon"
            },
            'id': index 
    }
    // if(tipo.toUpperCase() === 'TX')       { finalTXArray.value.push(finalITEM) }
    // if(tipo.toUpperCase() === 'RX')       { finalRXArray.value.push(finalITEM) }
}

const setSourceAndLayer = async (source:string, alldata:any, layer:string) => {
    const mySource = map.getSource(source);
    if(mySource === undefined){ 
        map.addSource(source, { 'type': 'geojson', 'data': alldata});        
        map.addLayer({
            'id': layer,
            'type': 'fill-extrusion',
            'source': source,
            'paint': {
                'fill-extrusion-color': ['get', 'color'],
                'fill-extrusion-height': ['get', 'height'],
                'fill-extrusion-base': ['get', 'base_height'],
                'fill-extrusion-opacity':1,
            }
        });
        
        const popup = new maplibregl.Popup({
            closeButton: false,
            closeOnClick: false
        });

        map.on('mouseenter', layer, (e:any) => {
            map.getCanvas().style.cursor = 'pointer';
            
            const coordinates:any = [e.lngLat.lng, e.lngLat.lat];
            const valor = e.features[0].properties.valor ;
            let mensaje = `${valor}` 

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            popup.setLngLat(coordinates).setHTML(mensaje).addTo(map);
        });

        map.on('mouseleave', layer, () => {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });
    }
    // else{
    //     mySource.setData(alldata)
    // }
}

const clearLayerSource = (layer:string, source:string) => {
    if(map.getLayer(layer)) { map.removeLayer(layer); }
    if(map.getSource(source)) { map.removeSource(source); }
}

const watchLayer = (selectedVar: Ref<boolean>, type: string, source: string, finalObject: Ref<any>, layer: string) => {
    watch(selectedVar, (state) => {
        if (state) {
            setSourceAndLayer(source, finalObject.value, layer);
        } else {
            clearLayerSource(layer, source);
        }
    });
}; 

onMounted(async() => {
    map  = new maplibregl.Map({
        container: mapContainer.value as HTMLDivElement,
        center: [-76.974010, -12.1090877],
        zoom: 14,
        pitch: 40,
        bearing: 30,
        style: 'https://api.maptiler.com/maps/satellite/style.json?key=6JWVt6LFaY22nquimZpF',
    });

     // Crear un elemento personalizado para el marker
        const el = document.createElement("div");
        el.className = "custom-marker";

        // Puedes usar una imagen
        const img = document.createElement("img");
        img.src = "/SmartlinkLAOS/hcgroup.jpg"; // coloca tu imagen en `public/marker.png`
        img.style.width = "40px";
        img.style.height = "40px";
        el.appendChild(img);

        new maplibregl.Marker({ element: el })
            .setLngLat([-76.974010, -12.1090877]) // coordenadas
            .addTo(map);
        // antialias: true,
    
    map.addControl(new maplibregl.NavigationControl());

})
</script>

<style scoped>
.maplibregl-map { height: 700px; }
</style>