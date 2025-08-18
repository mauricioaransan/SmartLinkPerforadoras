<template>
  <v-sheet class="pa-6 dialogSheet" v-if="typeDialog === LABELS.delete">
    <span class="titleDialogs">{{ t('title.delete') }}: {{ errorCode }}</span>
    <v-row class="ma-0 mx-2 mt-4" justify="end">
      <v-btn :color="COLOR.green" :disabled="disabledAXIOS" @click="deleteError()" :block="xs">
        {{ t('buttons.delete') }}
      </v-btn>
      <v-btn :class="!xs ? 'ml-2' : 'mt-2'" @click="closeDialogError" :color="COLOR.red" :block="xs">
        {{ t('buttons.cancel') }}
      </v-btn>
    </v-row>
  </v-sheet>
  <v-sheet class="pa-6 dialogSheet" v-else>
    <span class="titleDialogs" v-if="typeDialog === LABELS.add">{{ t('title.add') }}</span>
    <span class="titleDialogs" v-if="typeDialog === LABELS.edit">{{ t('title.change') }}: {{ objError.code }}</span>
    <v-row class="ma-0 mt-4">
      <v-col class="pa-0 px-2" cols="12" sm="6" v-if="typeDialog === LABELS.edit">
        <v-text-field
          v-model="errorCode"
          :label="t('labels.errorCode')"
          variant="outlined"
          density="compact"
          readonly
        />
      </v-col>
      <v-col class="pa-0 px-2" cols="12" sm="6" v-if="typeDialog === LABELS.edit">
        <v-text-field
          v-model="errorDescription"
          :label="t('labels.description')"
          variant="outlined"
          density="compact"
          readonly
        />
      </v-col>
      <v-col class="pa-0 px-2" cols="12">
        <v-text-field
          v-model="errorSolution"
          :label="t('labels.solution')"
          variant="outlined"
          density="compact"
        />
      </v-col>
    </v-row>
    <v-row class="ma-0 mx-2" justify="end">
      <v-btn
        :color="COLOR.green"
        v-if="typeDialog === 'add'"
        :disabled="disableAdd || disabledAXIOS"
        @click="addError()"
        :block="xs"
      >
        {{ t('buttons.add') }}
      </v-btn>
      <v-btn
        v-if="typeDialog === LABELS.edit"
        :disabled="disableAdd || disableEdit || disabledAXIOS"
        @click="changeError"
        :color="COLOR.green"
        :block="xs"
      >
        {{ t('buttons.change') }}
      </v-btn>
      <v-btn :class="!xs ? 'ml-2' : 'mt-2'" @click="closeDialogError" :color="COLOR.red" :block="xs">
        {{ t('buttons.cancel') }}
      </v-btn>
    </v-row>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

/********************************
 ************ VUETIFY ***********
 *******************************/
import { useDisplay } from 'vuetify';
const { xs } = useDisplay();

/********************************
 ********** CONSTANTES **********
 *******************************/
import { COLOR } from '@/const/colors'
import { LABELS } from '@/const/labels'
import { TYPEERRORMSG, TYPEMSG } from '@/const/snackbar'

/********************************
 ********** TYPESCRIPT **********
 *******************************/
import type { PropType } from 'vue'
import type { ERROR } from '@/types/Error'

/********************************
 *********** SERVICES ***********
 *******************************/
import { finalAddError, finalChangeError, finalDeleteError } from '@/services/errorServices'

/********************************
 ************ I18N **************
 *******************************/
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

/********************************
 ************ STORE *************
 *******************************/
import { useSnackBarStore } from '@/stores/snackbar'

/**
 * Store del SnackBar para cuando se agrega/modifica/elimina/error
 */
const storeSnackBar = useSnackBarStore()

/**
 * Props del DIALOGO, Se recibe desde 'ErrorManagment'
 */
const props = defineProps({
  /**
   * Tipo del DIALOGO, add/edit/delete
   */
  typeDialog: { type: String, required: true },

  /**
   * Objeto ERROR
   */
  objError: { type: Object as PropType<ERROR>, required: true },
})

/**
 * EMITS funciones para ejecutar en el padre 'ErrorManagment'
 */
const emits = defineEmits(['closeDialog', 'getError'])

/**
 * Cierra el DIALOGO y resetea el valor del newObjectError en el PADRE 'ErrorManagment'
 */
async function closeDialogError() {
  emits('closeDialog')
}

/**
 * Captura a los Errores de la API : 'getAllError()'
 */
async function getDialogRole() {
  emits('getError')
}

/**
 * ID del Error Seleccionado / Nueva ID
 */
const errorID = ref(props.objError.id)

/**
 * CÓDIGO del Error Seleccionado / Nuevo Código
 */
const errorCode = ref(props.objError.code)

/**
 * DESCRIPCIÓN del Error Seleccionado / Nueva Descripción
 */
const errorDescription = ref(props.objError.description)

/**
 * SOLUCIÓN del Error Seleccionado / Nueva Solución
 */
const errorSolution = ref(props.objError.solution)

/**
 * Deshabilita el botón que activa el servicio hasta que tenga alguna respuesta,
 * para evitar enviar constantemente peticiones a la API
 */
const disabledAXIOS = ref(false)

/**
 * Objeto que se envía a la DB, captura los cambios realizados en los textfields
 */
const errorObj = computed(() => {
  return {
    id: errorID.value,
    code: errorCode.value,
    description: errorDescription.value,
    solution: errorSolution.value,
  }
})

/**
 * Manda al Servicio de Agregar un ERROR a la Base de Datos
 */
async function addError() {
  //Botón Deshabilitado
  disabledAXIOS.value = true

  /**
   * Respuesta del Servicio
   */
  const statusError = await finalAddError(errorObj.value)
  await responseAxios(statusError.status, props.typeDialog)
}

/**
 * Manda al Servicio de Editar un ERROR a la Base de Datos
 */
async function changeError() {
  //Botón Deshabilitado
  disabledAXIOS.value = true

  /**
   * Respuesta del Servicio
   */
  const statusError = await finalChangeError(errorObj.value)
  await responseAxios(statusError.status, props.typeDialog)
}

/**
 * Manda al Servicio de Editar un ERROR a la Base de Datos
 */
async function deleteError() {
  //Botón Deshabilitado
  disabledAXIOS.value = true

  /**
   * Respuesta del Servicio
   */
  const statusError = await finalDeleteError(errorObj.value)
  await responseAxios(statusError.status, props.typeDialog)
}

/**
 * Muestra el snackbar dependiendo del estado y el tipo de la petición
 * @param status Estado de la petición
 * @param tipo Tipo de petición
 */
async function responseAxios(status: number, tipo: string) {
  /**
   * Mensaje de agregar/editar/eliminar Correctamente
   */
  const msgFinal = TYPEMSG[tipo]

  /**
   * Mensaje de Error en el serivicio
   */
  const msgErrorFinal = TYPEERRORMSG[tipo]

  if (status === 200) {
    await getDialogRole()
    await closeDialogError()
    storeSnackBar.showSnackBar({ type: tipo, msg: msgFinal, valor: true })
  }
  if (status === 400) {
    storeSnackBar.showSnackBar({ type: LABELS.error, msg: msgErrorFinal, valor: true })
  }

  //Habilita el botón
  disabledAXIOS.value = false
}

/**
 * Deshabilita el botón de agregar cuando los textfields están vacíos
 */
const disableAdd = computed(
  () => errorCode.value === '' || errorDescription.value === '' || errorSolution.value === '',
)

/**
 * Deshabilita el botón de editar cuando no hay ningún cambio de los textfields
 */
const disableEdit = computed(
  () =>
    errorCode.value === props.objError.code &&
    errorDescription.value === props.objError.description &&
    errorSolution.value === props.objError.solution,
)
</script>
