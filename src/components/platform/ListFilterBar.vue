<script setup lang="ts">
export interface ListFilterField {
  key: string
  label: string
  placeholder?: string
  maxlength?: number
  width?: number
}

const model = defineModel<Record<string, string>>({ required: true })

const props = withDefaults(
  defineProps<{
    fields: ListFilterField[]
  }>(),
  {}
)
</script>

<template>
  <section class="panel list-filter-bar">
    <el-form :model="model" inline>
      <el-form-item v-for="field in props.fields" :key="field.key" :label="field.label">
        <el-input
          v-model="model[field.key]"
          :placeholder="field.placeholder ?? `请输入${field.label}`"
          :maxlength="field.maxlength ?? 120"
          :style="{ width: `${field.width ?? 220}px` }"
          clearable
        />
      </el-form-item>
    </el-form>
  </section>
</template>

<style scoped>
.list-filter-bar {
  margin-bottom: 12px;
  padding: 12px 12px 0;
}
</style>
