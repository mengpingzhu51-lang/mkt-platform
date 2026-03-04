<script setup lang="ts">
defineProps<{
  title: string
  value: string
  delta: string
  tone: 'brand' | 'ok' | 'warn'
}>()
</script>

<template>
  <article class="metric-card panel" :class="tone">
    <p class="metric-title">{{ title }}</p>
    <p class="metric-value">{{ value }}</p>
    <p class="metric-delta">{{ delta }}</p>
  </article>
</template>

<style scoped>
.metric-card {
  padding: 16px;
  min-height: 130px;
}
.metric-title {
  margin: 0;
  color: var(--text-soft);
}
.metric-value {
  margin: 8px 0;
  font-size: 30px;
  font-weight: 700;
}
.metric-delta {
  margin: 0;
  font-size: 13px;
}
.metric-card.brand .metric-value {
  color: var(--brand);
}
.metric-card.ok .metric-value {
  color: var(--ok);
}
.metric-card.warn .metric-value {
  color: var(--warn);
}
</style>
