import i18n from "../../i18n/i18n"
import { computed } from 'vue'

export const HEADER_USERS:any = [
    { key: 'name', title: computed (() => i18n.global.t('labels.name')), align: 'center' },
    { key: 'role', title: computed (() => i18n.global.t('labels.role')), align: 'center' },
    { key: 'email', title: computed (() => i18n.global.t('labels.email')), align: 'center' },
    { key: 'password', title: computed (() => i18n.global.t('labels.password')), align: 'center' },
    { key: 'status', title: computed (() => i18n.global.t('labels.status')), align: 'center' },
    { key: 'config', title: computed (() => i18n.global.t('labels.configuration')), align: 'center' },
]