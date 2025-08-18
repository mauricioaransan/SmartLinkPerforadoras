import { createVuetify } from 'vuetify'
import type { ThemeDefinition } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles'
import { VDateInput } from 'vuetify/labs/VDateInput'


// import { VBtn, VCard, VTextField, VApp, VMain, VNavigationDrawer, VList, VListItem, VIcon,
//   VContainer, VCol, VRow, VDivider, VForm, VSheet
//  } from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as components from 'vuetify/components'

const lightCustom: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#DADADD',
    bgtopology: '#FFFFFF',
    bgtl: '#F6F6F8',
    colorText: '#000000',
    blackAndWhite: '#FFFFFF',
    colorBorder: '#056DF7',
    colorActive: '#0E2F5A',
    bgCard: '#FFFFFF',
    bgBlackCard: '#FFFFFF',
    error: '#FE1C1C',
    tablerow1: '#FAFAFA',
    tablerow2: '#FFFFFF',
    colorhffont: '#FFFFFF',
    colorhbbg: '#282835',
    subtitle: '#5D6774',
    surface: '#15202B',
    primary: '#3F51B5',
    secondary: '#00CCFF',
    bgDashCard: '#C3EEFA',
    bgCircular: '#002D69',
    btnSelect: '#D5F1F8',
    LTECardTitle: '#034D88',
    LTECardShadow: '#03233D',
    colorGrey: '#383838',
    bgCardSearch: '#002D69',
  },
}
const darkCustom: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#1E1E2F',
    bgtopology: '#27293D',
    bgtl: '#3F4265',
    colorText: '#FFFFFF',
    blackAndWhite: '#000000',
    colorBorder: '#FFFFFF',
    colorActive: '#FFFFFF',
    bgCard: '#0E2F5A',
    bgBlackCard: '#23232C',
    error: '#FE1C1C',
    tablerow1: '#FF00FF',
    tablerow2: '#666565',
    colorhffont: '#2D3A4F',
    colorhbbg: '#EEE',
    subtitle: '#FFFFFF',
    surface: '#15202B',
    primary: '#3F51B5',
    secondary: '#03DAC6',
    bgDashCard: '#0E2F5A',
    bgCircular: '#C3EEFA',
    btnSelect: '#055CD3',
    LTECardTitle: '#FFFFFF',
    LTECardShadow: '#52789E',
    colorGrey: '#C2C2C2',
    // bgCardSearch: '#002D69'
    bgCardSearch: '#B0FFEE',
  },
}

export const vuetify = createVuetify({
  components:{
    ...components,
    VDateInput
  },
  ssr: true,
  // components,
  directives,
  icons:{
    defaultSet: 'mdi'
  },
  theme: {
    defaultTheme: 'lightCustom',
    themes: {
      darkCustom,
      lightCustom,
    },
  },
})
