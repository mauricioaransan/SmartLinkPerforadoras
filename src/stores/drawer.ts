import { defineStore } from 'pinia'

export const useDrawerStore = defineStore('drawer', {
  state: () => ({
    viewDrawer : true
  }),
  actions: {
    getViewDrawer() {
      return this.viewDrawer
    },
    setShowDrawer() {
      this.viewDrawer = true;
    },
    setHideDrawer() {
      this.viewDrawer = false;
    },
    
  },
})