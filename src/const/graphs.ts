/**
 * BAR #1
 */

const BAR_DATA = {
  labels: ['Juan', 'Ana', 'Carlos', 'Maria', 'IA-Node'],
  datasets: [
    {
      label: 'Tiempo',
      backgroundColor: 'rgb(255,179,0)',
      borderColor: '#FFFFFF',
      data: [2.5, 3.1, 1.8, 2.9, 1.2],
    },
  ],
}

const BAR_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: 'rgb(255,179,0)',
      },
    },
    title: {
      display: true,
      color: 'rgb(255,255,255)',
      text: 'Tiempo promedio por tarea (horas)',
      align: 'start',
      padding: { bottom: 20, top: 0 },
    },
  },
  scales: {
    x: {
      color: '#000000',
      grid: {
        drawTicks: false,
        color: 'white',
      },
    },
    y: {
      grid: {
        color: 'white',
        borderColor: 'grey',
        tickColor: 'white',
      },
    },
  },
}

/**
 * BAR #2
 */

const BAR_DATA2 = {
  labels: ['Nodo 1', 'Nodo 2', 'Nodo 3', 'Nodo 4', 'Nodo 5'],
  datasets: [
    {
      backgroundColor: '#A259E6',
      borderColor: '#FFFFFF',
      data: [7, 5, 9, 4, 6],
    },
  ],
}

const BAR_OPTIONS2 = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
}

/**
 * PIE
 */

const PIE_DATA = {
  labels: ['Activas', 'Terminadas', 'Inactivas'],
  datasets: [
    {
      backgroundColor: ['rgba(136,132,216,1)', 'rgba(130,202,157,1)', 'rgba(255,198,88,1)'],
      data: [10, 20, 50],
    },
  ],
}

const PIE_OPTIONS: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: 'white',
      },
    },
    title: {
      display: true,
      color: 'rgb(255,255,255)',
      text: 'Estado de Tareas',
      align: 'start',
      padding: { bottom: 20, top: 0 },
    },
  },
}

/**
 * DONNUT
 */

const DOUGHNUT_DATA = {
  labels: ['Antenas', 'IA', 'Nodos'],
  datasets: [
    {
      backgroundColor: ['rgba(255,179,0,1)', 'rgba(95,208,211,1)', 'rgba(162,89,230,1)'],
      data: [24500, 9700, 15300],
    },
  ],
}

const DOUGHNUT_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      color: 'rgb(255,255,255)',
      text: 'Distribución de Recursos',
      align: 'start',
      padding: { bottom: 20, top: 0 },
    },
    legend: {
      display: false,
    },
  },
}
const DOUGHNUT_DATA2 = {
  labels: ['Riesgo', 'Restante'],
  datasets: [
    {
      backgroundColor: ['#ef4444', '#3f3f46'],
      data: [78, 22],
    },
  ],
}

const DOUGHNUT_OPTIONS2 = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '80%',
  radius: '60%',
  plugins: {
    title: {
      display: true,
      color: 'rgb(255,255,255)',
      text: 'Nivel de Riesgo',
      align: 'center',
      padding: { bottom: 20, top: 0 },
    },
    legend: {
      display: false,
    },
  },
}

/**
 * LINE
 */

const LINEAR_DATA = {
  labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
  datasets: [
    {
      backgroundColor: 'rgba(255,198,88,1)',
      data: [120, 210, 180, 250, 200, 170, 220],
    },
  ],
}

const LINEAR_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      position: 'bottom',
    },
    title: {
      display: true,
      color: 'white',
      text: 'Actividad semanal IA',
      align: 'start',
      padding: { bottom: 20, top: 0 },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
}

/**
 * LINE
 */

const LINEAR_DATA2 = {
  labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
  datasets: [
    {
      backgroundColor: 'rgba(255,198,88,1)',
      data: [3, 5, 2, 7, 6, 4, 2],
      borderColor: '#FF4D4F',
      fill: true,
      tension: 0.4,
    },
  ],
}

const LINEAR_OPTIONS2 = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      position: 'bottom',
    },
    title: {
      display: true,
      color: 'white',
      text: 'Prediccion de Errores (IA)',
      align: 'start',
      padding: { bottom: 20, top: 0 },
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#ffffff', // 👉 Texto inferior (labels del eje x)
      },
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        color: '#ffffff', // 👉 Texto inferior (labels del eje x)
      },
      grid: {
        display: false,
      },
    },
  },
}

export default {
  BAR_DATA,
  BAR_OPTIONS,
  BAR_DATA2,
  BAR_OPTIONS2,
  PIE_DATA,
  PIE_OPTIONS,
  DOUGHNUT_DATA,
  DOUGHNUT_OPTIONS,
  DOUGHNUT_DATA2,
  DOUGHNUT_OPTIONS2,
  LINEAR_DATA,
  LINEAR_OPTIONS,
  LINEAR_DATA2,
  LINEAR_OPTIONS2,
}
