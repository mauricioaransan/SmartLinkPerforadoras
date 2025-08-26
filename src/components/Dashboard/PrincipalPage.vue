<template>
    <div>
        <h1>Mapa</h1>
        <v-sheet width="100%">
            <div ref="mapContainer"></div>
        </v-sheet>
    </div>

    <AlgoView
        v-if="showSheet"
        elevation="6"
        class="pa-3"
        color="white"
        style="position: fixed; z-index: 9;"
        :style="{ top: mouseY + 'px', left: mouseX + 'px' }"
    >
        <strong>Información</strong>
        <p>{{finalIP}}</p>
    </AlgoView>
    
</template>

<script setup lang="ts">
import { onMounted, ref, watch, type Ref } from 'vue';
// DRIVE_OBS
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import axios from 'axios';
import { APIS_MAPS } from '@/const/apis';
// import Testeo from '../usables/Testeo.vue';
// import AlgoView from '@/components/PrincipalComponents/Algo.vue';
// import PrincipalPage from '@/components/Dashboard/PrincipalPage.vue'; 


const showSheet = ref(false);
const mouseX = ref(0);
const mouseY = ref(0);
const finalIP = ref('')
const finalLatency = ref('')


const finalTXArray   = ref<any[]>([]);
const finalTXObject   = ref<any>({'features': [], "type": ''});

let map: maplibregl.Map;
const mapContainer = ref<HTMLDivElement | null>(null);

const postPORTItems = async (tipo:string, latitud:number, longitud:number, color:string, valor:string, index:number, fecha:string) => {
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
                "type": "Point"
            },
            'id': index 
    }
    if(tipo.toUpperCase() === 'TX')       { finalTXArray.value.push(finalITEM) }
    // if(tipo.toUpperCase() === 'RX')       { finalRXArray.value.push(finalITEM) }
}

const setSourceAndLayer = async (source:string, alldata:any, layer:string) => {
    const mySource = map.getSource(source);
    if(mySource === undefined){ 
        map.addSource(source, { 'type': 'geojson', 'data': alldata});
        map.addLayer({
            'id': layer,
            'type': 'symbol',
            'source': source,
            'layout':{
                 'icon-image': 'custom-marker'
            }
        });


        // const popup = new maplibregl.Popup({
        //     closeButton: false,
        //     closeOnClick: false
        // });

        map.on('mouseenter', layer, (e:any) => {
            map.getCanvas().style.cursor = 'pointer';
            
            showSheet.value = true;
            mouseX.value = e.clientX + 20;
            mouseY.value = e.clientY + 50;

            // finalIP.value = e.features[0].properties.valor;
            // const coordinates:any = [e.lngLat.lng, e.lngLat.lat];
            // const valor = e.features[0].properties.valor ;
            // let mensaje = `${valor}` 

            // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            // }

            // popup.setLngLat(coordinates).setHTML(mensaje).addTo(map);
        });

        map.on('mousemove', layer, (e: any) => {
            map.getCanvas().style.cursor = 'pointer';

            // Para que se mueva con el mouse
            mouseX.value = e.point.x + 20;
            mouseY.value = e.point.y + 50;
            finalIP.value = e.features[0].properties.valor;
        });

        map.on('mouseleave', layer, () => {
            showSheet.value = false;
            finalIP.value = ''
        });
    }
    // else{
    //     mySource.setData(alldata)
    // }
}

const clearLayerSource = async (layer:string, source:string) => {
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

async function getAllInfoIntoMap(){
    axios.get(APIS_MAPS.getAllLatency).then(async (response) => {
        // response.data.forEach((item:any) => {
        //     postPORTItems('TX', -12.1090877,-76.974010, ``, `IP: ${item.ip}, latencia: ${item.latencia}`,1,'finalItem.fecha');
        // })
        postPORTItems('TX', -12.1090877,-76.974010, ``, `IP: algo2, latencia: algo2`,1,'finalItem.fecha');
        postPORTItems('TX', -12.1290877,-76.964010, ``, `IP: algo1, latencia: algo3`,1,'finalItem.fecha');
        finalTXObject.value = { "features" : finalTXArray.value, type : "FeatureCollection" };
        await setSourceAndLayer('SourceTX',finalTXObject.value,'LayerTX');
        
        await clearLayerSource('LayerRX','SourceRX');
    })
}

onMounted(async() => {
    map  = new maplibregl.Map({
        container: mapContainer.value as HTMLDivElement,
        center: [-76.974010, -12.1090877],
        zoom: 14,
        pitch: 40,
        bearing: 30,
        style: 'https://api.maptiler.com/maps/satellite/style.json?key=6JWVt6LFaY22nquimZpF',
    });

    await getAllInfoIntoMap();
    
    const image = await map.loadImage('https://maplibre.org/maplibre-gl-js/docs/assets/custom_marker.png');
    map.addImage('custom-marker', image.data);


    map.addControl(new maplibregl.NavigationControl());

})
</script>

<style>
.maplibregl-map { height: 700px; }
.maplibregl-popup-content{
    color: black;
}
</style>