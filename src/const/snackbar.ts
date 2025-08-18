import i18n from "../../i18n/i18n"
import { computed } from 'vue'

export const TYPEMSG: any = {
  add: computed (() => i18n.global.t('snackbar.add')),
  edit: computed (() => i18n.global.t('snackbar.edit')),
  delete: computed (() => i18n.global.t('snackbar.delete')),
}

export const TYPEERRORMSG: any = {
  add: computed (() => i18n.global.t('snackbar.errorAdd')),
  edit: computed (() => i18n.global.t('snackbar.errorEdit')),
  delete: computed (() => i18n.global.t('snackbar.errorDelete')),
  error: computed (() => i18n.global.t('snackbar.errorApis')),
}