<template>
    <v-row class="ma-0">
        <v-col cols="8" >
            <!-- <div> -->
                <h1>Mapa</h1>
                <v-sheet width="100%" color="transparent">
                    <div ref="mapContainer"></div>
                </v-sheet>
            <!-- </div> -->
        </v-col>
        <v-col cols="4">
            <h1>Tabla</h1>
            <Tabla/>
        </v-col>
    </v-row>

    

    <MapDialog 
    v-if="showSheet" 
    color="darkblue" 
    :style="{ top: mouseY + 'px', left: mouseX + 'px' }" 
    style="position: fixed; z-index: 9;" 
    :hexaTitle1="finalBandWidth"
    :hexaTitle2="`${finalLatency}ms`"
    :hexaTitle3="finalLost"
    :hexaTitle4="finalUptime"
    :ip="finalIP"
    />
</template>

<script setup lang="ts">
import { onMounted, ref, watch, type Ref } from 'vue';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import axios from 'axios';
import { APIS_MAPS, APIS_TOPOLOGY } from '@/const/apis';
import MapDialog from '@/components/dialog/MapDialog.vue';
import markerImg from "@/assets/perforadora.png";
import Tabla from '../PrincipalComponents/Tabla.vue';



const showSheet = ref(false);
const mouseX = ref(0);
const mouseY = ref(0);
const finalIP = ref('')
const finalLatency = ref('');
const finalUptime = ref('');
const finalBandWidth = ref('');
const finalLost = ref('')
const showMAP = ref(false)


const finalTXArray   = ref<any[]>([]);
const finalTXObject   = ref<any>({'features': [], "type": ''});

let map: maplibregl.Map;
const mapContainer = ref<HTMLDivElement | null>(null);

const postPORTItems = async (tipo:string, latitud:number, longitud:number, color:string, valor:string, index:number, fecha:string, uptime:string, latency: string, ip: string, bandwidth: string, lost:string, name:string) => {
    let finalITEM = {                        
            "type": "Feature",
            "properties": {
                "level": 0,
                "name": name,
                "height": 40,
                "base_height": 0,
                "color": color,
                "center": [longitud,latitud],
                "valor": valor,
                "fecha" : fecha,
                "uptime": uptime,
                "latency": latency,
                "bandwidth": bandwidth,
                "lost": lost,
                "ip": ip
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
                 'icon-image': 'custom-marker',
                 "text-field": ["get", "name"],  // toma el campo "title" de tu GeoJSON
                "text-font": ["Open Sans Bold"],
                "text-size": 12,
                "text-offset": [0, 3.5], // desplaza el texto debajo del icono
                "text-anchor": "top"
            },
            paint: {
                "text-color": "#FFFFFF"
            }
        });


        map.on('mouseenter', layer, (e:any) => {
            map.getCanvas().style.cursor = 'pointer';
            
            showSheet.value = true;
            mouseX.value = e.clientX + 20;
            mouseY.value = e.clientY + 50;
        });

        map.on('mousemove', layer, (e: any) => {
            map.getCanvas().style.cursor = 'pointer';

            // Para que se mueva con el mouse
            mouseX.value = e.point.x + 20;
            mouseY.value = e.point.y + 50;
            finalIP.value = `IP: ${e.features[0].properties.ip}`;
            finalLatency.value = `${e.features[0].properties.latency}`;
            finalUptime.value = `${e.features[0].properties.uptime}`;
            finalBandWidth.value = `${e.features[0].properties.bandwidth}`;
            finalLost.value = `${e.features[0].properties.lost}`;
        });

        map.on('mouseleave', layer, () => {
            showSheet.value = false;
            finalIP.value = ``;
            finalLatency.value = ``;
            finalUptime.value = ``;
            finalBandWidth.value = ``;
            finalLost.value = ``;
        });
    }
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
    axios.get(APIS_MAPS.getAllLatLngInfo).then(async (response) => {
        response.data.forEach((item:any) => {
            finalITEMS.value[item.ip] = {
                ip: finalITEMS.value[item.ip].ip,
                uptime: finalITEMS.value[item.ip].uptime,
                latency : finalITEMS.value[item.ip].latency,
                bandwidth : finalITEMS.value[item.ip].bandwidth,
                lost : finalITEMS.value[item.ip].lost,
                name : finalITEMS.value[item.ip].name,
                latitud: item.latitud,
                longitud: item.longitud,
                fecha: item.fecha
            }
        })


        let lat = 0;
        let lng = 0;

        Object.entries(finalITEMS.value).forEach(([ip, item]:any) => {

            const finalLatitud = item.latitud??(-12.1080877+lat);
            const finalLongitud = item.longitud??(-76.974010+lng);
            const finalEBandWidth = item.bandwidth??0
            const finalELatency = item.latency??0
            const finalELost = item.lost??0

            lat+=0.0011;
            lng+=0.0011;

            postPORTItems('TX', finalLatitud, finalLongitud, ``, `IP: ${ip}`,1,`${item.fecha}`,`${item.uptime}`,`${finalELatency}`,`${item.ip}`, `${finalEBandWidth}`,`${finalELost}`, item.name);
        });

        finalTXObject.value = { "features" : finalTXArray.value, type : "FeatureCollection" };
        await setSourceAndLayer('SourceTX',finalTXObject.value,'LayerTX');
        
        await clearLayerSource('LayerRX','SourceRX');


    })
}

const finalITEMS = ref<any>({})

async function  getAllOperabilityLastDay() {
    await axios.get(APIS_TOPOLOGY.getAllOpLastDay).then((response) => {
        const items = response.data;
        items.forEach((item:any) => {
            const totalUptime = item.ok + item.alert + item.alarm + item.down;
            const uptime = `${(((item.ok + item.alert + item.alarm) / totalUptime)*100).toFixed(2)}%`;

            const NotDown = item.ok + item.alert + item.alarm ;
            const lost = `${((item.down / NotDown)*100).toFixed(2)}%`

            if(!finalITEMS.value[item.ip]) {
                finalITEMS.value[item.ip] = {}
            }
            finalITEMS.value[item.ip] = {
                ip: item.ip,
                name: item.name,
                uptime : uptime,
                lost : lost
            }
        })

        // console.log(finalITEMS.value)
    })
}

async function  getAllLatencyLastMinute() {
    await axios.get(APIS_MAPS.getAllLatency).then((response) => {
        const items = response.data;
        items.forEach((item:any) => {
            finalITEMS.value[item.ip] = {
                ip: finalITEMS.value[item.ip].ip,
                name: finalITEMS.value[item.ip].name,
                uptime: finalITEMS.value[item.ip].uptime,
                lost: finalITEMS.value[item.ip].lost,
                latency : item.latencia.toFixed(2)
            }
        })
    })
}

async function  getAllBandWidth() {
    await axios.get(APIS_MAPS.getAllBandWidth).then((response) => {
        const items = response.data;
        items.forEach((item:any) => {
            const finalBandWidth = JSON.parse(item.bandwidth??'{ Tx : -1, Rx : -1 }')
            
            finalITEMS.value[item.ip] = {
                ip: finalITEMS.value[item.ip].ip,
                uptime: finalITEMS.value[item.ip].uptime,
                name: finalITEMS.value[item.ip].name,
                latency: finalITEMS.value[item.ip].latency,
                lost: finalITEMS.value[item.ip].lost,
                bandwidth : finalBandWidth.Rx,
            }
        })
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
    showMAP.value = true;

    const img = new Image(80, 80);

    img.onload = () => {
    map.addImage("custom-marker", img);
    };

    img.src = markerImg;

    await getAllOperabilityLastDay();
    await getAllLatencyLastMinute();
    await getAllBandWidth();
    await getAllInfoIntoMap();
    


    map.addControl(new maplibregl.NavigationControl());

})
</script>

<style>
.maplibregl-map { height: 700px; }
.maplibregl-popup-content{
    color: black;
}
</style>