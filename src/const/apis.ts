import { ref } from 'vue'

const finalURL = ref(import.meta.env.VITE_URL_APIS ?? '')

export const APIS_ERROR = {
  getAllError: `${finalURL.value}error/getAllError`,
  addError: `${finalURL.value}error/addError`,
  changeError: `${finalURL.value}error/changeError`,
  deleteError: `${finalURL.value}error/deleteError`,
}

export const APIS_ROLE = {
  getAllRole: `${finalURL.value}role/getAllRole`,
  addRole: `${finalURL.value}role/addRole`,
  changeRole: `${finalURL.value}role/changeRole`,
  deleteRole: `${finalURL.value}role/deleteRole`,
}

export const APIS_TASK = {
  getAllTask: `${finalURL.value}task/getAllTask`,
  addTask: `${finalURL.value}task/addTask`,
  changeTask: `${finalURL.value}task/changeTask`,
  deleteTask: `${finalURL.value}task/deleteTask`,
}

export const APIS_USER = {
  userLogin: `${finalURL.value}login/userLogin`,
  getAllUser: `${finalURL.value}user/getAllUser`,
  addUser: `${finalURL.value}user/addUser`,
  changeUser: `${finalURL.value}user/changeUser`,
  deleteUser: `${finalURL.value}user/deleteUser`,
  changePassUser: `${finalURL.value}user/changePassUser`,
}

export const APIS_MAPS = {
  getAllInfoMap: `${finalURL.value}dashboard/getAllInfoMap`,
  getAllLatency: `${finalURL.value}kpi/getAllLatency`,
  getAllLatLngInfo : `${finalURL.value}dashboard/getAllLatLngInfo`
}

export const APIS_TOPOLOGY ={
  getGraphTopo    :   `${finalURL.value}topology/getGraphTopologyData`,
  getTableTopo    :   `${finalURL.value}topology/getTableTopologyData`,
  getStatusLog    :   `${finalURL.value}topology/getStatusLogGraph`,
  getAllTopoData  :   `${finalURL.value}topology/getAllTopologyData`,
  getSNMPDataByIP :   `${finalURL.value}topology/getSNMPDataByIP`,
  getAllOperaByIP :   `${finalURL.value}topology/getAllOperabilityByIP`,
  getAllOpLastDay :   `${finalURL.value}topology/getAllOperabilityLastDay`,

}