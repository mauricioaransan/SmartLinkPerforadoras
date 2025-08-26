<template>
    <v-sheet color="transparent"  style="align-self: center;">
        <v-row class="ma-0" justify="space-around">
            <Buttons :colorDodecaedro="'red'" :title="'Dashboard'" :colorCard="'blue'" :colorText="'white'" @click="showPages(VISIBLE_PAGE_DASHBOARD.showDashboard)" />
            <Buttons :colorDodecaedro="'blue'" :title="'Dashboard'" :colorCard="'blue'" :colorText="'white'" @click="showPages(VISIBLE_PAGE_DASHBOARD.showTest)" />
            <Buttons :colorDodecaedro="'orange'" :title="'Dashboard'" :colorCard="'blue'" :colorText="'white'" @click="showPages(VISIBLE_PAGE_DASHBOARD.showTest)" />
            <Buttons :colorDodecaedro="'purple'" :title="'Dashboard'" :colorCard="'blue'" :colorText="'white'" @click="showPages(VISIBLE_PAGE_DASHBOARD.showTest)" />
            <!-- <v-col class="ma-0">
                <Buttons :colorDodecaedro="'red'" :title="'Dashboard'" :colorCard="'blue'" :colorText="'white'" @click="showPages(VISIBLE_PAGE_DASHBOARD.showDashboard)" />
            </v-col>
            <v-col>
                <Buttons :colorDodecaedro="'blue'" :title="'Dashboard'" :colorCard="'blue'" :colorText="'white'" @click="showPages(VISIBLE_PAGE_DASHBOARD.showTest)" />
            </v-col>
            <v-col>
                <Buttons :colorDodecaedro="'orange'" :title="'Dashboard'" :colorCard="'blue'" :colorText="'white'" @click="showPages(VISIBLE_PAGE_DASHBOARD.showTest)" />
            </v-col>
            <v-col>
                <Buttons :colorDodecaedro="'purple'" :title="'Dashboard'" :colorCard="'blue'" :colorText="'white'" @click="showPages(VISIBLE_PAGE_DASHBOARD.showTest)" />
            </v-col> -->
        </v-row>
    </v-sheet>

    <v-sheet >
        <PrincipalPage v-if="showpage === VISIBLE_PAGE_DASHBOARD.showDashboard"/>
    </v-sheet>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import Dodecaedro from '@/components/PrincipalComponents/Dodecaedro.vue';
import { VISIBLE_PAGE_DASHBOARD } from '@/const/dashboard';
import PrincipalPage from '@/components/Dashboard/PrincipalPage.vue';
import Buttons from '@/components/PrincipalComponents/Buttons.vue';


const showpage = ref('')

function showPages(visiblePage:string){
    showpage.value = visiblePage
}
</script>