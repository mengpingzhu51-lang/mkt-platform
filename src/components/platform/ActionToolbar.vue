<script setup lang="ts">
defineProps<{
  count: number
}>()

const emit = defineEmits<{
  exportReport: []
  dispatch: []
}>()
</script>

<template>
  <section class="panel action-toolbar">
    <p class="muted">今日待处理 {{ count }} 条任务</p>
    <div>
      <el-button @click="emit('exportReport')">导出日报</el-button>
      <el-button type="primary" @click="emit('dispatch')">一键分发</el-button>
    </div>
  </section>
</template>

<style scoped>
.action-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  margin-bottom: 14px;
}
</style>
