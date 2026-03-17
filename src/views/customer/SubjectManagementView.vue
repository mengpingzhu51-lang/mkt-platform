<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { createSubject, fetchSubjectList, updateSubject } from '../../api/modules/subject'
import ListFilterBar, { type ListFilterField } from '../../components/platform/ListFilterBar.vue'
import type { SubjectItem } from '../../types/subject'

type DialogMode = 'create' | 'edit'

const loading = ref(false)
const submitting = ref(false)
const dialogVisible = ref(false)
const dialogMode = ref<DialogMode>('create')
const subjectList = ref<SubjectItem[]>([])
const filterModel = reactive({
  subjectKeyword: ''
})
const filterFields: ListFilterField[] = [
  {
    key: 'subjectKeyword',
    label: '主体',
    placeholder: '请输入主体编码/主体简称/主体全称',
    maxlength: 120,
    width: 360
  }
]
const editingCode = ref('')
const formRef = ref<FormInstance>()
const formModel = reactive({
  subjectCode: '',
  subjectShortName: '',
  subjectFullName: ''
})

const dialogTitle = computed(() => (dialogMode.value === 'create' ? '新增主体' : '编辑主体'))
const isCreateMode = computed(() => dialogMode.value === 'create')
const filteredSubjectList = computed(() => {
  const keyword = normalize(filterModel.subjectKeyword).toLowerCase()

  return subjectList.value.filter((item) => {
    if (!keyword) return true
    return (
      item.subjectCode.toLowerCase().includes(keyword) ||
      item.subjectShortName.toLowerCase().includes(keyword) ||
      item.subjectFullName.toLowerCase().includes(keyword)
    )
  })
})

function normalize(value: string) {
  return value.trim()
}

function hasDuplicate(field: 'subjectCode' | 'subjectShortName' | 'subjectFullName', value: string) {
  const normalized = normalize(value)
  return subjectList.value.some((item) => {
    if (dialogMode.value === 'edit' && item.subjectCode === editingCode.value) return false
    return item[field] === normalized
  })
}

const rules: FormRules = {
  subjectCode: [
    { required: true, message: '请输入主体编码', trigger: 'blur' },
    {
      validator: (_rule, value, callback) => {
        if (!isCreateMode.value) return callback()
        if (hasDuplicate('subjectCode', String(value ?? ''))) {
          return callback(new Error('主体编码必须唯一'))
        }
        callback()
      },
      trigger: 'blur'
    }
  ],
  subjectShortName: [
    { required: true, message: '请输入主体简称', trigger: 'blur' },
    {
      validator: (_rule, value, callback) => {
        if (hasDuplicate('subjectShortName', String(value ?? ''))) {
          return callback(new Error('主体简称必须唯一'))
        }
        callback()
      },
      trigger: 'blur'
    }
  ],
  subjectFullName: [
    { required: true, message: '请输入主体全称', trigger: 'blur' },
    {
      validator: (_rule, value, callback) => {
        if (hasDuplicate('subjectFullName', String(value ?? ''))) {
          return callback(new Error('主体全称必须唯一'))
        }
        callback()
      },
      trigger: 'blur'
    }
  ]
}

function resetForm() {
  formModel.subjectCode = ''
  formModel.subjectShortName = ''
  formModel.subjectFullName = ''
  editingCode.value = ''
}

async function loadSubjects() {
  loading.value = true
  try {
    subjectList.value = await fetchSubjectList()
  } finally {
    loading.value = false
  }
}

function openCreateDialog() {
  dialogMode.value = 'create'
  dialogVisible.value = true
  resetForm()
  void nextTick(() => formRef.value?.clearValidate())
}

function openEditDialog(row: SubjectItem) {
  dialogMode.value = 'edit'
  dialogVisible.value = true
  formModel.subjectCode = row.subjectCode
  formModel.subjectShortName = row.subjectShortName
  formModel.subjectFullName = row.subjectFullName
  editingCode.value = row.subjectCode
  void nextTick(() => formRef.value?.clearValidate())
}

function closeDialog() {
  dialogVisible.value = false
  resetForm()
  formRef.value?.clearValidate()
}

function getErrorMessage(error: unknown) {
  const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message
  return message ?? '请求失败，请稍后重试'
}

async function submitForm() {
  if (!formRef.value) return
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  const payload = {
    subjectCode: normalize(formModel.subjectCode),
    subjectShortName: normalize(formModel.subjectShortName),
    subjectFullName: normalize(formModel.subjectFullName)
  }

  submitting.value = true
  try {
    if (dialogMode.value === 'create') {
      await createSubject(payload)
      ElMessage.success('新增主体成功')
    } else {
      await updateSubject(payload)
      ElMessage.success('编辑主体成功')
    }
    closeDialog()
    await loadSubjects()
  } catch (error) {
    ElMessage.error(getErrorMessage(error))
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  void loadSubjects()
})
</script>

<template>
  <section class="panel subject-page" v-loading="loading">
    <header class="subject-header">
      <h2>主体管理</h2>
      <el-button type="primary" @click="openCreateDialog">新增</el-button>
    </header>

    <ListFilterBar v-model="filterModel" :fields="filterFields" />

    <el-table :data="filteredSubjectList" border>
      <el-table-column prop="subjectCode" label="主体编码" min-width="140" />
      <el-table-column prop="subjectShortName" label="主体简称" min-width="160" />
      <el-table-column prop="subjectFullName" label="主体全称" min-width="260" />
      <el-table-column prop="updatedBy" label="更新人" min-width="120" />
      <el-table-column prop="updatedAt" label="更新日期" min-width="140" />
      <el-table-column label="操作" width="120" fixed="right">
        <template #default="{ row }">
          <el-button link type="primary" @click="openEditDialog(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="520px" @close="closeDialog">
      <el-form ref="formRef" :model="formModel" :rules="rules" label-width="96px" status-icon>
        <el-form-item label="主体编码" prop="subjectCode">
          <el-input
            v-model="formModel.subjectCode"
            :disabled="!isCreateMode"
            placeholder="请输入主体编码"
            maxlength="20"
          />
        </el-form-item>
        <el-form-item label="主体简称" prop="subjectShortName">
          <el-input v-model="formModel.subjectShortName" placeholder="请输入主体简称" maxlength="40" />
        </el-form-item>
        <el-form-item label="主体全称" prop="subjectFullName">
          <el-input v-model="formModel.subjectFullName" placeholder="请输入主体全称" maxlength="120" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" :loading="submitting" @click="submitForm">确定</el-button>
      </template>
    </el-dialog>
  </section>
</template>

<style scoped>
.subject-page {
  padding: 14px;
}

.subject-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}
</style>
