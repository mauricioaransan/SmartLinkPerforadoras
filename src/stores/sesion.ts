import { defineStore } from 'pinia'

type SESION = {
  user: string
  role: number
}

export const useSesionStore = defineStore('sesion', {
  state: () => ({
    sesion : {} as SESION
  }),
  actions: {
    getSesion() {
      return this.sesion
    },
    setSesion(sesionObj: SESION) {
      this.sesion = sesionObj
    },
    
  },
})
