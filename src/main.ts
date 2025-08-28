// import './assets/main.css'
import './assets/vuedefault.css'
import '@mdi/font/css/materialdesignicons.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { vuetify } from './plugins/vuetify'
import i18n from '../i18n/i18n'
import 'vuetify/styles'
import VueEcharts from "vue-echarts";
import "echarts"; 

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)
app.component("v-chart", VueEcharts);

app.mount('#app')
