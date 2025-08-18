import i18n from "../../i18n/i18n"
import { computed } from 'vue'

export const HEADER_TASKS: any = [
  { key: 'code', title: computed (() => i18n.global.t('labels.taskCode')), align: 'center' },
  { key: 'description', title: computed (() => i18n.global.t('labels.task')), align: 'center' },
  { key: 'device', title: computed (() => i18n.global.t('labels.device')), align: 'center' },
  { key: 'status', title: computed (() => i18n.global.t('labels.status')), align: 'center' },
  { key: 'assigned_to', title: computed (() => i18n.global.t('labels.assigned_at')), align: 'center' },
  { key: 'error_code', title: computed (() => i18n.global.t('labels.errorCode')), align: 'center' },
  { key: 'created_at', title: computed (() => i18n.global.t('labels.created_at')), align: 'center' },
  { key: 'finished_at', title: computed (() => i18n.global.t('labels.finished_at')), align: 'center' },
  { key: 'comments', title: computed (() => i18n.global.t('labels.comments')), align: 'center' },
  { key: 'config', title: computed (() => i18n.global.t('labels.configuration')), align: 'center', style: 'min-width: 250px' },
]

export const STATUS_TASK: any = [
  { id: 0, name: 'labels.completed'},
  { id: 1, name: 'labels.in_process'},
  { id: 2, name: 'labels.pending'}
]