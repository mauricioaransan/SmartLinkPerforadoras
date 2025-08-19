<template>
  <v-app-bar :color="COLOR.card">
    <v-row class="ma-4" justify="space-between">
      <v-app-bar-nav-icon class="mt-4"  v-if="mdAndDown" variant="text" @click="showDrawer()" ></v-app-bar-nav-icon>
      <span v-if="!xs" class="mt-4 titleProject">{{ t('title.titleSL') }}</span>
      <v-select
        class="pt-5"
        v-model="locale"
        :items="xs ? languageMin : language "
        :label="t('labels.language')"
        variant="outlined"
        density="compact"
        item-value="value"
        item-title="title"
        :max-width="xs ? 90 : 130"
      />
    </v-row>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'

/********************************
 ************ VUETIFY ***********
 *******************************/
import { useDisplay } from 'vuetify';
const { xs, mdAndDown } = useDisplay();

/********************************
 ********** CONSTANTES **********
 *******************************/
import { COLOR } from '@/const/colors'

/********************************
 ************ I18N **************
 *******************************/
import { useI18n } from 'vue-i18n'
let { locale, t } = useI18n()

/********************************
 ************ STORE *************
 *******************************/
import { useDrawerStore } from '@/stores/drawer'

/**
 * Store del Drawer para mostrar/ocultar el drawer
 */
const storeDrawer = useDrawerStore()

/**
 * Sirve como control para mandar al show o el hide del drawer
 */
const controllerDrawer = ref(false)

function showDrawer(){
  controllerDrawer.value = !controllerDrawer.value

  controllerDrawer.value ? storeDrawer.setShowDrawer() : storeDrawer.setHideDrawer()
}

watch(mdAndDown, (v) => {
  !v ? storeDrawer.setShowDrawer() : storeDrawer.setHideDrawer()
})

const language = ref([
  { title: computed(() => t('appBar.es')), value: 'es' },
  { title: computed(() => t('appBar.en')), value: 'en' },
])

const languageMin = ref([
  { title: 'ES', value: 'es' },
  { title: 'EN', value: 'en' },
])
</script>
