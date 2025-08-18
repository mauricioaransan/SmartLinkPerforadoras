<script setup lang="ts">
import { RouterView } from 'vue-router'
import router from './router'

/********************************
 ********** COMPONENTES *********
 *******************************/
import Snackbar from './components/snackbar/Snackbar.vue'

/**
 * Store de la sesión del usuario, para funcionalidades como ocultar ciertas vistas/ventanas
 */
import { useSesionStore } from '@/stores/sesion'

/**
 * Variable que utiliza la STORE
 */
const storeUserLog = useSesionStore()

/**
 * Captura el usuario guardado en la Store del navegador (esto cambiara con el tiempo para hacerlo con tokens)
 */
let userLogged = localStorage.getItem('userSesion')

/**
 * Captura el rol del usuario guardado en la Store del navegador
 */
let roleLogged = localStorage.getItem('roleSesion')

// if (userLogged !== null) {
//   // Almacena en la store el usuario y su rol
//   storeUserLog.setSesion({ user: userLogged, role: parseInt(roleLogged ?? '0') })

//   // Agrega a la URL "/admin" y redirecciona a la vista "views/AdminView.vue"
//   router.replace('/admin')
// } else {
//   // Agrega a la URL "/login" y redirecciona a la vista "views/Login.vue"
//   // ya que no encontró ningún usuario logeado
//   router.replace('/login')
// }
router.replace('/login')
</script>

<template>
  <RouterView />
  <div>
    <Snackbar />
  </div>
</template>
