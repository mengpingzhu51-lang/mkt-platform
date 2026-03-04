<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import ActionToolbar from '../../components/platform/ActionToolbar.vue'
import DataTable from '../../components/platform/DataTable.vue'
import FilterBar, { type FilterForm } from '../../components/platform/FilterBar.vue'
import MetricCard from '../../components/platform/MetricCard.vue'
import TrendChart from '../../components/platform/TrendChart.vue'
import { fetchDashboardData } from '../../api/modules/dashboard'
import type { DashboardResponse } from '../../types/dashboard'

const router = useRouter()
const loading = ref(false)
const dashboard = ref<DashboardResponse | null>(null)

const filters = reactive<FilterForm>({
  group: '全部',
  owner: '全部',
  status: '全部'
})

const filteredTodos = computed(() => {
  if (!dashboard.value) return []
  return dashboard.value.todos.filter((item) => {
    const ownerMatch = filters.owner === '全部' || item.owner === filters.owner
    const statusMatch = filters.status === '全部' || item.status === filters.status
    return ownerMatch && statusMatch
  })
})

const quickEntries = computed(() => dashboard.value?.quickEntries ?? [])
const summary = computed(() => dashboard.value?.summary)

async function loadData() {
  loading.value = true
  try {
    dashboard.value = await fetchDashboardData()
  } finally {
    loading.value = false
  }
}

function onSearch() {
  ElMessage.success('筛选条件已应用')
}

function onReset() {
  filters.group = '全部'
  filters.owner = '全部'
  filters.status = '全部'
}

function openTask(id: string) {
  ElMessage.info(`任务 ${id} 详情将在后续迭代接入`)
}

function exportReport() {
  ElMessage.success('已导出 Mock 日报')
}

function dispatch() {
  ElMessage.success('分发流程已触发')
}

onMounted(() => {
  void loadData()
})
</script>

<template>
  <div v-loading="loading">
    <FilterBar v-model="filters" @search="onSearch" @reset="onReset" />
    <ActionToolbar :count="filteredTodos.length" @export-report="exportReport" @dispatch="dispatch" />

    <div class="metric-grid" v-if="summary">
      <MetricCard title="总策略数" :value="String(summary.totalStrategies)" delta="较昨日 +6" tone="brand" />
      <MetricCard title="运行中策略" :value="String(summary.runningStrategies)" delta="稳定运行中" tone="ok" />
      <MetricCard title="待处理人群包" :value="String(summary.pendingCrowdPacks)" delta="较昨日 -2" tone="warn" />
      <MetricCard title="本月收入" :value="`¥${summary.monthlyRevenue.toLocaleString()}`" delta="同比 +12.7%" tone="brand" />
      <MetricCard title="本月成本" :value="`¥${summary.monthlyCost.toLocaleString()}`" delta="环比 +4.2%" tone="ok" />
      <MetricCard title="今日触达量" :value="summary.todayTouches.toLocaleString()" delta="高峰 10:20-11:10" tone="warn" />
    </div>

    <div class="content-grid">
      <TrendChart :data="dashboard?.trends ?? []" />
      <section class="panel quick-entry">
        <h3>快捷入口</h3>
        <div class="entry-list">
          <button v-for="entry in quickEntries" :key="entry.id" @click="router.push(entry.route)">
            <span>{{ entry.title }}</span>
            <el-tag size="small">{{ entry.tag }}</el-tag>
          </button>
        </div>
      </section>
    </div>

    <DataTable :rows="filteredTodos" @open="openTask" />
  </div>
</template>

<style scoped>
.metric-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 14px;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 12px;
  margin-bottom: 14px;
}

.quick-entry {
  padding: 12px;
}

.quick-entry h3 {
  margin: 0 0 10px;
}

.entry-list {
  display: grid;
  gap: 10px;
}

.entry-list button {
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--panel-soft);
  padding: 10px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.entry-list button:hover {
  border-color: var(--brand);
}
</style>
