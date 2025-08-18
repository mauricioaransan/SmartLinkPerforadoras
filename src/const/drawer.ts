import i18n from "../../i18n/i18n"
import { computed } from 'vue'
import { LABELS } from "./labels"

export const DRAWERADMIN = [
    { icon: '🏠', title: computed (() => i18n.global.t('sidebar.dashboard')), value: LABELS.dashboard },
    { icon: '👤', title: computed (() => i18n.global.t('sidebar.usermng')), value: LABELS.usermng },
    { icon: '📋', title: computed (() => i18n.global.t('sidebar.taskmng')), value: LABELS.taskmng },
    { icon: '❗', title: computed (() => i18n.global.t('sidebar.errmng')), value: LABELS.errormng },
    { icon: '🛡️', title: computed (() => i18n.global.t('sidebar.rolemng')), value: LABELS.rolmng },
    { icon: '↩️', title: computed (() => i18n.global.t('sidebar.logout')), value: LABELS.logout },
]