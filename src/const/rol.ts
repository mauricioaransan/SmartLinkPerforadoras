import i18n from "../../i18n/i18n"
import { computed } from 'vue'

export const HEADER_ROL:any = [
    { key: 'id', title: computed (() => i18n.global.t('labels.id')), align: 'center' },
    { key: 'role', title: computed (() => i18n.global.t('labels.role')), align: 'center' },
    { key: 'pages', title: computed (() => i18n.global.t('labels.pages')), align: 'center' },
    { key: 'config', title: computed (() => i18n.global.t('labels.configuration')), align: 'center' },
]

export const PAGES:any = {
    dashboard : computed (() => i18n.global.t('sidebar.dashboard')),
    usermng : computed (() => i18n.global.t('sidebar.usermng')),
    taskmng : computed (() => i18n.global.t('sidebar.taskmng')),
    errormng : computed (() => i18n.global.t('sidebar.errmng')),
    rolmng : computed (() => i18n.global.t('sidebar.rolemng')),
    logout : computed (() => i18n.global.t('sidebar.logout')),    
}