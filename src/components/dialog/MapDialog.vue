<template>
    <v-sheet elevation="8" class="pa-3" width="580">
        <h3 class="mb-4">{{ ip }}</h3>
        <v-row class="ma-0">
            <Hexagon class="mx-8" color="green" :title="hexaTitle1" subtitle="Mbps" :sizeTitle="35" :sizeSubTi="15" icon="mdi-chart-timeline-variant"/>
            <Hexagon class="mx-8" color="green" :title="hexaTitle2" subtitle="Latencia" :sizeSubTi="15" :sizeTitle="25" icon="mdi-speedometer"/>
            <Hexagon class="mx-8" color="green" :title="hexaTitle3" subtitle="Pérdida" :sizeSubTi="15" :sizeTitle="25" icon="mdi-wifi-arrow-up"/>
            <Hexagon class="mx-8" color="green" :title="hexaTitle4" subtitle="Uptime" :sizeSubTi="15" :sizeTitle="25" icon="mdi-chart-bar"/>
        </v-row>
    </v-sheet>
</template>

<script setup lang="ts">
import Hexagon from '@/components/PrincipalComponents/Hexagon.vue';

interface Props {
    hexaTitle1: string
    hexaTitle2: string
    hexaTitle3: string
    hexaTitle4: string
    ip: string
}

const props = defineProps<Props>()
// defineProps({
//     hexaTitle1: { type: String, required: true},
//     ip: { type: String, required: true}
// })

</script>