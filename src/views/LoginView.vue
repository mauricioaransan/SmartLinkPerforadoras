<template>
  <v-sheet :color="COLOR.background" height="100vh" style="align-content: center">
    <v-sheet :color="COLOR.card" :width="xs ? 350 : 550" class="ma-auto" style="border-radius: 20px">
      <v-row class="ma-0" justify="center">
        <span class="LoginTittle"> {{ t('title.taskManager') }} </span>
      </v-row>
      <v-form v-model="valid" @submit.prevent="submit">
        <v-container>
          <v-row class="mt-8">
            <v-col cols="12">
              <v-text-field
                v-model="userEmail"
                :rules="emailRules"
                :label="t('labels.email')"
                prepend-icon="mdi-account-hard-hat"
                placeholder="pedro@demo.com/ana@demo.com/juan@demo.com"
                variant="outlined"
                required
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="userPass"
                :type="typePassword"
                :label="t('labels.password')"
                prepend-icon="mdi-lock"
                placeholder="pedrocontra/anacontra/juancontra"
                variant="outlined"
                :append-inner-icon="iconAppend"
                @click:append-inner="changeType()"
                required
              />
            </v-col>
          </v-row>
        </v-container>
        <v-divider class="my-5" :thickness="1"></v-divider>
        <v-row class="ma-0" justify="center">
          <v-btn
            type="submit"
            :color="COLOR.green"
            width="200"
            class="btnLogin mt-2 mb-5 text-white"
            :disabled="disabledBTN || disabledAXIOS"
          >
            {{ t('buttons.login') }}
          </v-btn>
        </v-row>
      </v-form>
    </v-sheet>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import router from '@/router'

/********************************
 ************ VUETIFY ***********
 *******************************/
import { useDisplay } from 'vuetify';
const { xs } = useDisplay();

/********************************
 ********** CONSTANTES **********
 *******************************/
import { COLOR } from '@/const/colors'

/********************************
 ********** TYPESCRIPT **********
 *******************************/
// import type { RULES } from '@/types/Rules'

/********************************
 *********** SERVICES ***********
 *******************************/
import { loginUser } from '@/services/userServices'

/********************************
 ************ I18N **************
 *******************************/
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

/********************************
 ************ STORE *************
 *******************************/
import { useSnackBarStore } from '@/stores/snackbar'
import { useSesionStore } from '@/stores/sesion'

/**
 * Store del SnackBar para cuando se agrega/modifica/elimina/error
 */
const storeSnackBar = useSnackBarStore()

/**
 * Store de la SESION
 */
const storeUserLog = useSesionStore()

/**
 * Valida si el formulario tiene los textfields con valores
 */
const valid = ref(false)

/**
 * EMAIL del Usuario para Logearse
 */
const userEmail = ref<string>('')

/**
 * Contraseña del Usuario para Logearse
 */
const userPass = ref<string>('')

/**
 * Deshabilita el botón que activa el servicio hasta que tenga alguna respuesta,
 * para evitar enviar constantemente peticiones a la API
 */
const disabledAXIOS = ref(false)

/**
 * Objeto que se envía a la DB, captura los cambios realizados en los textfields
 */
const userLoginOBJ = computed(() => {
  return {
    id: 999999,
    email: userEmail.value,
    password: userPass.value,
    name: '',
    role: 999999,
    status: 999999,
  }
})

/**
 * Manda al Servicio de LOGEAR un USUARIO a la Base de Datos
 */
async function submit() {

  //Botón Deshabilitado
  disabledAXIOS.value = true

  /**
   * Respuesta del Servicio
   */
  const statusAXIOS: any = await loginUser(userLoginOBJ.value)

  // Si el estado es 400 => HAY ERROR EN LA API
  if (statusAXIOS.status === 400) {
    storeSnackBar.showSnackBar({ type: 'error', msg: t('snackbar.errorApis'), valor: true })
  }

  // Si el estado es 200 => SI HAY RESPUESTA DE LA API
  if (statusAXIOS.status === 200) {

    /**
     * Valor del Usuario
     */
    const superUSER = statusAXIOS.data[0]

    // Si el role del Usuario es distinto a 999, es un usuario válido
    if (superUSER.role !== 999) {

      // Almacena el rol, las páginas y el usuario en la store del navegador
      localStorage.setItem('userSesion', superUSER.user)
      localStorage.setItem('roleSesion', superUSER.role)
      localStorage.setItem('pagesSesion', superUSER.pages)

      // Guarda el usuario en la Store del proyecto
      storeUserLog.setSesion(superUSER)
      storeSnackBar.showSnackBar({
        type: 'add',
        msg: 'Bienvenido/a ' + superUSER.user,
        valor: true,
      })

      // Agrega '/admin' en la URL y lo redirecciona a la página de 'views/AdminView.vue'
      router.replace('/admin')
    } 
    
    // Si el role del Usuario es igual a 999, no es usuario válido
    else {
      let msg = ''

      // Si el usuario no es válido
      if (superUSER.user === 'user') msg = t('snackbar.login.userNotFound')

      // Si la contraseña no es válida
      if (superUSER.user === 'pass') msg = t('snackbar.login.passWrong')

      // Si el usuario no está habilitado
      if (superUSER.user === 'disabled') msg = t('snackbar.login.disabledUser')

      userEmail.value = ''
      userPass.value = ''
      storeSnackBar.showSnackBar({ type: 'error', msg: msg, valor: true })
    }
  }

  //Habilita el botón
  disabledAXIOS.value = false
}

/**
 * Icono del textfield de contraseña
 */
const iconAppend = ref('mdi-eye')

/**
 * Tipo de Contraseña, si es Password o si es text
 */
const typePassword = ref('password')

/**
 * Variable para validar el cambio de estado de visualizar
 */
const boolPassword = ref(true)

/**
 * Cambia la visualización del TextField de Contraseña para que se pueda ver o no
 */
function changeType() {
  boolPassword.value = !boolPassword.value
  if (boolPassword.value) {
    iconAppend.value = 'mdi-eye'
    typePassword.value = 'password'
  } else {
    iconAppend.value = 'mdi-eye-off'
    typePassword.value = 'text'
  }
}

/**
 * Deshabilita el botón de agregar cuando los textfields están vacíos
 */
const disabledBTN = computed(() => userEmail.value === '' || userPass.value === '')

/**
 * Reglas de los Emails, para que tengan la estructura de EMAIL
 */
const emailRules: any[] = [
  (v:any) => !!v || computed(() => t('errorsRules.mandaEmail')).value,
  (v:any) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || computed(() => t('errorsRules.validEmail')).value,
]
</script>
