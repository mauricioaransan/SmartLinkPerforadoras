<template>
  <v-app>
    <AppBarAdmin />
    <v-navigation-drawer v-model="viewDrawer" :color="COLOR.card" :temporary="!viewDrawer">
      <v-list mandatory v-model:selected="valueList" class="pa-0">
        <v-list-item
          v-for="(item, i) in listItems"
          :key="i"
          :title="item.title.value"
          :value="item.value"
          @click="showMenu(item.value)"
          class="pa-0"
          active-class="itemSelectedCSS"
        >
          <template v-slot:prepend>
            <span style="font-size: 20px; margin-right: 10px"> {{ item.icon }}</span>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import router from '@/router'

/********************************
 ********** COMPONENTES *********
 *******************************/
import AppBarAdmin from './AppBarAdmin.vue'

/********************************
 ********** CONSTANTES **********
 *******************************/
import { COLOR } from '@/const/colors'
import { LABELS } from '@/const/labels'
import { DRAWERADMIN } from '@/const/drawer'

/********************************
 ************ STORE *************
 *******************************/
import { useDrawerStore } from '@/stores/drawer'

/**
 * Store del Drawer para mostrar/ocultar el drawer
 */
const storeDrawer = useDrawerStore()

const viewDrawer = computed(() => storeDrawer.getViewDrawer())

let pagesLogged = localStorage.getItem('pagesSesion');

/**
 * Valor del item seleccionado
 */
const valueList = ref<string[]>([LABELS.dashboard])

/**
 * Tipo del la página para ver
 */
const selectedPage = computed(() => valueList.value[0])

/**
 * Lista del Drawer, capturada del inicio de sesión 
 * y que está guardado en la store del navegador
 */
const listDrawer = pagesLogged ? JSON.parse(pagesLogged??'') : [LABELS.logout]

/**
 * Lista filtrada del Drawer, capturada de la CONSTANTE del DRAWER con la lista 
 * obtenida en el inicio de SESION
 */
const listItems = computed(() => {
  const lista = DRAWERADMIN.filter((item:any) => listDrawer.includes(item.value))
  let prevList:string[] = []
  if(lista[0].value === LABELS.logout){
    if(lista[1]) prevList.push(lista[1].value)
  }
  else{
    prevList.push(lista[0].value)
  }
  valueList.value = prevList

  return lista
})

/**
 * Remueve toda la Store del Navegador cuando se da click a
 * "CERRAR SESIÓN"
 * Coloca "/login" en la URL.
 */
function showMenu(valor:string){
  if(valor === LABELS.logout){
    localStorage.removeItem('userSesion');
    localStorage.removeItem('roleSesion');
    localStorage.removeItem('pagesSesion');
    router.replace('/login')
  }
}

const temporary = ref(false)

</script>

<style>
.itemSelectedCSS {
  background-color: rgb(24, 24, 40) !important;
}
</style>
