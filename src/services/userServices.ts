import type { USER } from '@/types/User'
import axios from 'axios'
import { ref } from 'vue'
import { showConsoleError } from '@/functions/errorAPI'
import { APIS_USER } from '../const/apis'
const TIMEOUT = { timeout: 10000 }

/**
 * Para ingresar un USUARIO a la página web
 * @param userLogin Objeto de USUARIO
 * @returns El estado de la petición y el array de objetos / array vacío (Si no hay)
 */
export async function loginUser(userLogin: USER) {
  const { email, password } = userLogin
  const param = {
    email,
    password,
  }

  const statusAxios = ref()
  await axios
    .post(APIS_USER.userLogin, param, TIMEOUT)
    .then((user) => {
       statusAxios.value = { status: 200, data: user.data }
    })
    .catch(function (error) {
      statusAxios.value = { status: 400, data: [] }
      showConsoleError(error)
    })

  return statusAxios.value
}

/**
 * Captura todos los USUARIOS
 * @returns El estado de la petición y el array de objetos / array vacío (Si no hay)
 */
export async function getAllUsers() {
  const statusAxios = ref()
  await axios
    .get(APIS_USER.getAllUser)
    .then((user) => {
      statusAxios.value = { status: 200, data: user.data }
    })
    .catch(function (error) {
      statusAxios.value = { status: 400 }
      showConsoleError(error)
    })
  return statusAxios.value
}

/**
 * Agrega un USUARIO nuevo en la DB
 * @param user Objeto de USUARIO
 * @returns El estado de la petición y el array de objetos / array vacío (Si no hay)
 */
export async function finalAddUser(user: USER) {
  const { name, role, password, email, status } = user
  const param = {
    name,
    role,
    password,
    email,
    status,
  }
 
  /**
   * Estado de la Petición AXIOS
   */
  const statusAxios = ref()
  
  await axios
    .post(APIS_USER.addUser, param, TIMEOUT)
    .then(()=>{
        statusAxios.value = { status: 200 }
    })
    .catch(function (error) {
      statusAxios.value = { status: 400 }
      showConsoleError(error)
    })
    return statusAxios.value
}

/**
 * Modifica un USUARIO en la DB
 * @param user Objeto de USUARIO
 * @returns El estado de la petición y el array de objetos / array vacío (Si no hay)
 */
export async function finalChangeUser(user: USER) {
  const { id, name, role, password, email, status } = user
  const param = {
    id,
    name,
    role,
    password,
    email,
    status,
  }
  
  /**
   * Estado de la Petición AXIOS
   */
  const statusAxios = ref()
  
  await axios
    .post(APIS_USER.changeUser, param, TIMEOUT)
    .then(()=>{
        statusAxios.value = { status: 200 }
    })
    .catch(function (error) {
      statusAxios.value = { status: 400 }
      showConsoleError(error)
    })
    return statusAxios.value
}

/**
 * Elimina un USUARIO en la DB
 * @param user Objeto de USUARIO
 * @returns El estado de la petición y el array de objetos / array vacío (Si no hay)
 */
export async function finalDeleteUser(user: USER) {
  const { id } = user
  const param = {
    id,
  }
  
  /**
   * Estado de la Petición AXIOS
   */
  const statusAxios = ref()
  
  await axios
    .post(APIS_USER.deleteUser, param, TIMEOUT)
    .then(()=>{
      statusAxios.value = { status: 200 }
    })
    .catch(function (error) {
      statusAxios.value = { status: 400 }
      showConsoleError(error)
    })
    return statusAxios.value
}

/**
 * Agrega / Cambia la contraseña del USUARIO en la DB
 * @param user Objeto de USUARIO
 * @returns El estado de la petición y el array de objetos / array vacío (Si no hay)
 */
export async function changePassUser(user: USER) {
  const { id, password } = user
  const param = {
    id,
    password,
  }
  
  /**
   * Estado de la Petición AXIOS
   */
  const statusAxios = ref()
  
  await axios
    .post(APIS_USER.changePassUser, param, TIMEOUT)
    .then(()=>{
      statusAxios.value = { status: 200 }
    })
    .catch(function (error) {
      statusAxios.value = { status: 400 }
      showConsoleError(error)
    })
    return statusAxios.value
}
