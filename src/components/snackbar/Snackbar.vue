<template>
    <v-snackbar
    v-model="getSnack.valor"
    :timeout="5000"
    :color="getColor(getSnack.type)"
    >            
        {{ getSnack.msg }}
    </v-snackbar>      

</template>

<script setup lang="ts">
import { computed } from 'vue'

/********************************
 ********** CONSTANTES **********
 *******************************/
import { COLOR } from '@/const/colors'

/********************************
 ************ STORE *************
 *******************************/
import { useSnackBarStore } from '@/stores/snackbar'

/**
 * Store del SnackBar para cuando se agrega/modifica/elimina/error
 */
const storeSnackBar = useSnackBarStore()

/**
 * Objeto de la STORE
 */
const getSnack = computed(() => storeSnackBar.getSnackBar())

/**
 * Constantes de los COLORES
 */
const COLORSNACK:any = {
    add : COLOR.green,
    edit : COLOR.warning,
    delete : COLOR.red,
    error : COLOR.error
}

/**
 * Captura el color del SnackBar dependiendo del tipo
 */
function getColor(type:string){
    let colorSnack = COLORSNACK[type]
    return colorSnack
}

       
</script>