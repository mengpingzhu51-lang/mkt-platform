<script setup lang="ts">
import type { TodoItem } from '../../types/dashboard'

defineProps<{
  rows: TodoItem[]
}>()

const emit = defineEmits<{
  open: [id: string]
}>()

function tagType(status: TodoItem['status']) {
  if (status === '进行中') return 'warning'
  if (status === '阻塞') return 'danger'
  return 'info'
}
</script>

<template>
  <section class="panel data-table">
    <div class="table-head">
      <h3>关键待办</h3>
    </div>
    <el-table :data="rows" stripe border>
      <el-table-column prop="id" label="任务ID" width="110" />
      <el-table-column prop="title" label="任务标题" min-width="260" />
      <el-table-column prop="owner" label="负责人" width="110" />
      <el-table-column prop="dueAt" label="截止时间" width="170" />
      <el-table-column label="状态" width="110">
        <template #default="{ row }">
          <el-tag :type="tagType(row.status)">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link @click="emit('open', row.id)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<style scoped>
.data-table {
  padding: 12px;
}

.table-head h3 {
  margin: 0 0 12px;
}
</style>
