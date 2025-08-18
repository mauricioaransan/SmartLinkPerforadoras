import { defineStore } from 'pinia'

type SNACK = {
  type: string
  msg: string
  valor: boolean
}

export const useSnackBarStore = defineStore('snackbar', {
  state: () => ({
    snackbar : {} as SNACK
  }),
  actions: {
    getSnackBar() {
      return this.snackbar
    },
    showSnackBar(snack: SNACK) {
      this.snackbar = snack
    },
    
  },
})
