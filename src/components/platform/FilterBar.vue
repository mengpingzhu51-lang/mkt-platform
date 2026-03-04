<script setup lang="ts">
export interface FilterForm {
  group: string
  owner: string
  status: string
}

const model = defineModel<FilterForm>({ required: true })

const emit = defineEmits<{
  search: []
  reset: []
}>()

const groups = ['全部', '代运营', '营销分', '账单管理', '监控中心']
const owners = ['全部', '尹少娟', '邵垂海', '张磊', '乔马玲', '吴伟志']
const statuses = ['全部', '运行中', '待处理', '阻塞']
</script>

<template>
  <section class="panel filter-bar">
    <el-form inline>
      <el-form-item label="模块">
        <el-select v-model="model.group" style="width: 160px">
          <el-option v-for="item in groups" :key="item" :value="item" :label="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="负责人">
        <el-select v-model="model.owner" style="width: 160px">
          <el-option v-for="item in owners" :key="item" :value="item" :label="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="model.status" style="width: 150px">
          <el-option v-for="item in statuses" :key="item" :value="item" :label="item" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="emit('search')">筛选</el-button>
        <el-button @click="emit('reset')">重置</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<style scoped>
.filter-bar {
  padding: 12px 14px;
  margin-bottom: 14px;
}
</style>
