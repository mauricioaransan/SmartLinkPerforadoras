// import type { TABLE_ERR_MAG } from '@/types/Tables'



const HEADERS_TABLE_ERR_MANAGMENT: any = [
  { key: 'codigo', title: 'Codigo', align: 'center' },
  { key: 'descripcion', title: 'Descripcion', align: 'center' },
  { key: 'frecuencia', title: 'Frecuencia', align: 'center' },
  { key: 'critico', title: 'Critico', align: 'center' },
]
const ITEMS_TABLE_ERR_MANAGMENT: any[] = [
  { codigo: 'E101', descripcion: 'Fallo de comunicacion', frecuencia: 12, critico: 'si' },
  { codigo: 'E205', descripcion: 'Sobrecalentamiento', frecuencia: 8, critico: 'si' },
  { codigo: 'N404', descripcion: 'Nodo no encontrado', frecuencia: 5, critico: 'no' },
  { codigo: 'A500', descripcion: 'Antena desconocida', frecuencia: 3, critico: 'no' },
]


export default {
  HEADERS_TABLE_ERR_MANAGMENT,
  ITEMS_TABLE_ERR_MANAGMENT,
}
