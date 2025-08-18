import i18n from "../../i18n/i18n"
import { computed } from 'vue'

export const HEADER_ERROR: any = [
  { key: 'code', title: computed (() => i18n.global.t('labels.code')), align: 'center' },
  { key: 'description', title: computed (() => i18n.global.t('labels.description')), align: 'center' },
  { key: 'solution', title: computed (() => i18n.global.t('labels.solution')), align: 'center' },
  { key: 'config', title: computed (() => i18n.global.t('labels.configuration')), align: 'center' },
]
