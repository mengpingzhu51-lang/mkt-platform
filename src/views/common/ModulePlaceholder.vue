<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const title = computed(() => String(route.meta.title ?? '模块页面'))
const moduleTitle = computed(() => String(route.meta.moduleTitle ?? '平台模块'))
const branchTitle = computed(() => String(route.meta.branchTitle ?? '功能分组'))
const parentBranchTitle = computed(() => route.meta.parentBranchTitle as string | undefined)
const pageType = computed(() => String(route.meta.pageType ?? '列表'))
const actions = computed(() =>
  Array.isArray(route.meta.actions) ? (route.meta.actions as string[]) : ['筛选', '导出']
)

function onAction(action: string) {
  ElMessage.info(`${title.value} - ${action} 将在下一轮接入真实逻辑`)
}
</script>

<template>
  <section class="panel placeholder-page">
    <header class="placeholder-header">
      <div>
        <p class="path-line">
          {{ moduleTitle }}
          <span>/</span>
          <template v-if="parentBranchTitle">
            <span>{{ parentBranchTitle }}</span>
            <span>/</span>
          </template>
          <span>{{ branchTitle }}</span>
        </p>
        <h2>{{ title }}</h2>
      </div>
      <el-tag>{{ pageType }}</el-tag>
    </header>

    <div class="action-row">
      <el-button v-for="action in actions" :key="action" @click="onAction(action)">
        {{ action }}
      </el-button>
    </div>

    <section class="mock-layout">
      <div class="mock-filter panel">
        <p class="label">筛选区域</p>
        <div class="chips">
          <el-tag effect="plain">时间范围</el-tag>
          <el-tag effect="plain">状态</el-tag>
          <el-tag effect="plain">负责人</el-tag>
          <el-tag effect="plain">产品线</el-tag>
        </div>
      </div>

      <div class="mock-body panel">
        <p class="label">业务内容区域</p>
        <el-empty description="已对齐路由与层级，等待接入该页面真实功能组件" />
      </div>
    </section>
  </section>
</template>

<style scoped>
.placeholder-page {
  padding: 14px;
}

.placeholder-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.path-line {
  margin: 0 0 8px;
  color: var(--text-soft);
  font-size: 12px;
}

h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.path-line span {
  margin: 0 6px;
}

.action-row {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

.mock-layout {
  display: grid;
  gap: 12px;
}

.mock-filter,
.mock-body {
  padding: 10px 12px;
  background: #fff;
}

.label {
  margin: 0 0 10px;
  color: var(--text-soft);
  font-size: 12px;
}

.chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
