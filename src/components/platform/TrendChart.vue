<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import type { TrendPoint } from '../../types/dashboard'

const props = defineProps<{
  data: TrendPoint[]
}>()

const chartEl = ref<HTMLDivElement>()
let chart: echarts.ECharts | null = null

function render() {
  if (!chartEl.value) return
  if (!chart) chart = echarts.init(chartEl.value)

  chart.setOption({
    tooltip: { trigger: 'axis' },
    legend: { data: ['收入', '成本', '触达量'] },
    grid: { left: 40, right: 20, top: 32, bottom: 30 },
    xAxis: { type: 'category', data: props.data.map((item) => item.date) },
    yAxis: [{ type: 'value' }, { type: 'value' }],
    series: [
      {
        name: '收入',
        type: 'line',
        smooth: true,
        data: props.data.map((item) => item.revenue),
        lineStyle: { color: '#2c5ef6' }
      },
      {
        name: '成本',
        type: 'line',
        smooth: true,
        data: props.data.map((item) => item.cost),
        lineStyle: { color: '#17b26a' }
      },
      {
        name: '触达量',
        type: 'bar',
        yAxisIndex: 1,
        data: props.data.map((item) => item.touches),
        itemStyle: { color: '#8ea8ff' }
      }
    ]
  })
}

onMounted(() => {
  render()
  window.addEventListener('resize', render)
})

watch(() => props.data, render, { deep: true })

onBeforeUnmount(() => {
  window.removeEventListener('resize', render)
  if (chart) chart.dispose()
})
</script>

<template>
  <section class="panel trend-chart">
    <h3>7日营收趋势</h3>
    <div ref="chartEl" class="chart"></div>
  </section>
</template>

<style scoped>
.trend-chart {
  padding: 12px;
}

h3 {
  margin: 0 0 10px;
}

.chart {
  height: 320px;
}
</style>
