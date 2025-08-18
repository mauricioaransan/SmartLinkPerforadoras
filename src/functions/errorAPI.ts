// import i18n from "../../i18n/i18n"

/**
 * Si la petición a la API falla o se demora más de 10s, enviará a consola un mensaje con el error
 * @param error Respuesta del AXIOS
 */
export function showConsoleError(error: any) {
  // Si no hay una ruta a la API (no esta definida)
  if (error.response) {
    console.error('no se ha encontrado la ruta a la API')
  }

  // Si la API tiene un error
  else if (error.request) {
    console.error('Error de la API o 10s sin recibir nada')
  }

  // Otros motivos
  else {
    console.error('otro Motivo: ', error)
  }
}
