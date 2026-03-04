<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <section class="panel empty-state">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <el-tag type="info">Mock Module</el-tag>
  </section>
</template>

<style scoped>
.empty-state {
  padding: 40px 20px;
  text-align: center;
}

h2 {
  margin: 0 0 8px;
}

p {
  margin: 0 0 12px;
  color: var(--text-soft);
}
</style>
