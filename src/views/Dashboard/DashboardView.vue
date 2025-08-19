<template>
    <v-sheet color="transparent"  style="align-self: center;">
        <v-row class="ma-0" justify="space-around">
            <Dodecaedro @click="showPages(VISIBLE_PAGE_DASHBOARD.showDashboard)" :colorText="'purple'" :colorCard="'green'" :title="'Dashboard'"/>
            <Dodecaedro @click="showPages(VISIBLE_PAGE_DASHBOARD.showTest)" :colorCard="'red'" :title="'algo'"/>
            <Dodecaedro @click="showPages(VISIBLE_PAGE_DASHBOARD.showTest)" :colorCard="'purple'" :title="'todologo'"/>
            <Dodecaedro @click="showPages(VISIBLE_PAGE_DASHBOARD.showTest)" :colorCard="'orange'" :title="'example in todo'"/>
        </v-row>
    </v-sheet>

    <v-sheet >
        <PrincipalPage v-if="showPage === VISIBLE_PAGE_DASHBOARD.showDashboard"/>
    </v-sheet>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Dodecaedro from '@/components/PrincipalComponents/Dodecaedro.vue';
import { VISIBLE_PAGE_DASHBOARD } from '@/const/dashboard';
import PrincipalPage from '@/components/Dashboard/PrincipalPage.vue';

const showPage = ref('')

function showPages(visiblePage:string){
    showPage.value = visiblePage
}
</script>

<style scoped>

</style>