<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import * as echarts from "echarts";

interface Props {
  value: number;
}
const props = defineProps<Props>();

const chartRef = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts | null = null;

onMounted(() => {
  if (chartRef.value) {
    chart = echarts.init(chartRef.value);
    setOption();
  }
});

// Actualizar cuando cambie value
watch(() => props.value, () => setOption());

function setOption() {
  if (!chart) return;
  chart.setOption({
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.7, "red"],     // 0–70
              [0.85, "yellow"], // 70–85
              [1, "green"],     // 85–100
            ],
          },
        },
        pointer: {
          show: true,
          width: 3,
          length: "70%",
        },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        detail: { show: false },
        data: [{ value: props.value }],
      },
    ],
  });
}
</script>

<template>
  <!-- El tamaño lo controlas con estilos -->
  <div ref="chartRef" style="width: 120px; height: 50px;" />
</template>