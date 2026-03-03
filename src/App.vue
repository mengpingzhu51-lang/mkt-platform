<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

type ReconcileStatus = '未对账' | '部分对账' | '已对账'
type MailStatus = '成功' | '失败'
type BillType = '月账单' | '月详单'

interface BillItem {
  id: number
  billMonth: string
  customerFullName: string
  customerShortName: string
  owner: string
  shippedAmount: number
  adjustedAmount: number
  reconciledAmount: number
  status: ReconcileStatus
  recipientEmail: string
  ccEmails: string
}

interface MailRecord {
  id: string
  billType: BillType
  sendTime: string
  sendStatus: MailStatus
  recipientEmail: string
  ccEmail: string
  operator: string
}

const filters = reactive({
  monthRange: ['2025-11', '2025-11'],
  customer: '',
  owner: '',
  statuses: ['未对账', '部分对账'] as ReconcileStatus[]
})

const customerOptions = ['分期乐', '数禾', '橙子', '极融', '火山融']
const ownerOptions = ['尹少娟', '邵垂海', '张磊', '乔马玲', '吴伟志']

const billRows = ref<BillItem[]>([
  {
    id: 1,
    billMonth: '2025-11',
    customerFullName: '分期乐',
    customerShortName: '分期乐',
    owner: '尹少娟',
    shippedAmount: 275000,
    adjustedAmount: 0,
    reconciledAmount: 275000,
    status: '未对账',
    recipientEmail: 'finance@fenqile.com',
    ccEmails: 'audit@fenqile.com; owner@fenqile.com'
  },
  {
    id: 2,
    billMonth: '2025-11',
    customerFullName: '数禾科技有限公司',
    customerShortName: '数禾',
    owner: '邵垂海',
    shippedAmount: 260000,
    adjustedAmount: 0,
    reconciledAmount: 260000,
    status: '未对账',
    recipientEmail: 'billing@shuhe.com',
    ccEmails: 'finance@shuhe.com'
  },
  {
    id: 3,
    billMonth: '2025-11',
    customerFullName: '橙子数字科技有限公司',
    customerShortName: '橙子',
    owner: '张磊',
    shippedAmount: 260000,
    adjustedAmount: 0,
    reconciledAmount: 260000,
    status: '未对账',
    recipientEmail: 'bill@orangepay.com',
    ccEmails: 'operator@orangepay.com'
  },
  {
    id: 4,
    billMonth: '2025-11',
    customerFullName: '极融信息服务有限公司',
    customerShortName: '极融',
    owner: '乔马玲',
    shippedAmount: 200000,
    adjustedAmount: 0,
    reconciledAmount: 200000,
    status: '未对账',
    recipientEmail: 'accounts@jirong.com',
    ccEmails: 'ops@jirong.com'
  },
  {
    id: 5,
    billMonth: '2025-11',
    customerFullName: '火山融科技有限公司',
    customerShortName: '火山融',
    owner: '吴伟志',
    shippedAmount: 200000,
    adjustedAmount: 0,
    reconciledAmount: 200000,
    status: '未对账',
    recipientEmail: 'finance@volcash.com',
    ccEmails: 'cfo@volcash.com'
  }
])

const selectedRows = ref<BillItem[]>([])
const mailRecordMap = ref<Record<number, MailRecord[]>>({
  1: [
    {
      id: '1-1',
      billType: '月账单',
      sendTime: '2025-11-30 17:05:43',
      sendStatus: '成功',
      recipientEmail: 'finance@fenqile.com',
      ccEmail: 'audit@fenqile.com; owner@fenqile.com',
      operator: '尹少娟'
    }
  ]
})

const dialogVisible = ref(false)
const activeBill = ref<BillItem | null>(null)

const filteredRows = computed(() => {
  return billRows.value.filter((row) => {
    const matchedCustomer = filters.customer
      ? row.customerFullName.includes(filters.customer) || row.customerShortName.includes(filters.customer)
      : true
    const matchedOwner = filters.owner ? row.owner === filters.owner : true
    const matchedStatus = filters.statuses.length > 0 ? filters.statuses.includes(row.status) : true

    return matchedCustomer && matchedOwner && matchedStatus
  })
})

const totalAmount = computed(() =>
  billRows.value.reduce((sum, row) => sum + row.shippedAmount + row.adjustedAmount, 0)
)
const reconciledTotal = computed(() =>
  billRows.value.reduce((sum, row) => (row.status === '已对账' ? sum + row.reconciledAmount : sum), 0)
)
const unreconciledTotal = computed(() => totalAmount.value - reconciledTotal.value)

const activeMailRecords = computed(() => {
  if (!activeBill.value) return []
  return mailRecordMap.value[activeBill.value.id] ?? []
})

const amountFormatter = (value: number) => `¥${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

const getStatusType = (status: ReconcileStatus) => {
  if (status === '已对账') return 'success'
  if (status === '部分对账') return 'warning'
  return 'info'
}

const getMailStatusType = (status: MailStatus) => (status === '成功' ? 'success' : 'danger')

const onSelectionChange = (rows: BillItem[]) => {
  selectedRows.value = rows
}

const onSendMail = () => {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请先选择要发送邮件的账单记录')
    return
  }

  const sendAt = new Date().toLocaleString('zh-CN', { hour12: false })
  selectedRows.value.forEach((bill, index) => {
    const previous = mailRecordMap.value[bill.id] ?? []
    const newRecords: MailRecord[] = [
      {
        id: `${bill.id}-${Date.now()}-month`,
        billType: '月账单',
        sendTime: sendAt,
        sendStatus: index % 4 === 0 ? '失败' : '成功',
        recipientEmail: bill.recipientEmail,
        ccEmail: bill.ccEmails,
        operator: bill.owner
      },
      {
        id: `${bill.id}-${Date.now()}-detail`,
        billType: '月详单',
        sendTime: sendAt,
        sendStatus: '成功',
        recipientEmail: bill.recipientEmail,
        ccEmail: bill.ccEmails,
        operator: bill.owner
      }
    ]
    mailRecordMap.value[bill.id] = [...newRecords, ...previous]
  })

  ElMessage.success(`已触发 ${selectedRows.value.length} 条账单的邮件发送`)
}

const openMailRecord = (row: BillItem) => {
  activeBill.value = row
  dialogVisible.value = true
}

const onReconcile = (row: BillItem) => {
  row.status = '已对账'
  ElMessage.success(`已完成 ${row.customerShortName} 对账`)
}
</script>

<template>
  <div class="bill-page">
    <el-card shadow="never" class="filter-card">
      <el-form :inline="true" class="query-form">
        <el-form-item label="账单月">
          <el-date-picker
            v-model="filters.monthRange"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            value-format="YYYY-MM"
          />
        </el-form-item>
        <el-form-item label="客户">
          <el-select v-model="filters.customer" clearable placeholder="全部客户" style="width: 180px">
            <el-option v-for="item in customerOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="客户负责人">
          <el-select v-model="filters.owner" clearable placeholder="全部负责人" style="width: 180px">
            <el-option v-for="item in ownerOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="对账状态">
          <el-select
            v-model="filters.statuses"
            multiple
            collapse-tags
            collapse-tags-tooltip
            clearable
            placeholder="全部状态"
            style="width: 220px"
          >
            <el-option label="未对账" value="未对账" />
            <el-option label="部分对账" value="部分对账" />
            <el-option label="已对账" value="已对账" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>

    <div class="summary-grid">
      <el-card class="summary-card total" shadow="hover">
        <p class="summary-title">总金额</p>
        <p class="summary-value">{{ amountFormatter(totalAmount) }}</p>
      </el-card>
      <el-card class="summary-card reconciled" shadow="hover">
        <p class="summary-title">已对账总金额</p>
        <p class="summary-value">{{ amountFormatter(reconciledTotal) }}</p>
      </el-card>
      <el-card class="summary-card pending" shadow="hover">
        <p class="summary-title">未对账总金额</p>
        <p class="summary-value">{{ amountFormatter(unreconciledTotal) }}</p>
      </el-card>
    </div>

    <el-card shadow="never">
      <div class="toolbar">
        <p class="selected-text">已选择 {{ selectedRows.length }} 条记录</p>
        <div class="toolbar-right">
          <el-button type="success" plain>导出列表</el-button>
          <el-button type="primary" plain>导出账单</el-button>
          <el-button type="warning" :disabled="selectedRows.length === 0" @click="onSendMail">
            邮件发送
          </el-button>
        </div>
      </div>

      <el-table :data="filteredRows" border stripe @selection-change="onSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="billMonth" label="账单月" width="110" />
        <el-table-column prop="customerFullName" label="客户全称" min-width="170" />
        <el-table-column prop="customerShortName" label="客户简称" width="120" />
        <el-table-column prop="owner" label="客户负责人" width="120" />
        <el-table-column label="出账总金额(元)" width="145" align="right">
          <template #default="{ row }">{{ amountFormatter(row.shippedAmount) }}</template>
        </el-table-column>
        <el-table-column label="调整总金额(元)" width="145" align="right">
          <template #default="{ row }">{{ amountFormatter(row.adjustedAmount) }}</template>
        </el-table-column>
        <el-table-column label="对账总金额(元)" width="145" align="right">
          <template #default="{ row }">{{ amountFormatter(row.reconciledAmount) }}</template>
        </el-table-column>
        <el-table-column label="对账状态" width="115">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)" effect="light">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300" fixed="right">
          <template #default="{ row }">
            <el-space wrap>
              <el-button size="small" text type="primary">账单详情</el-button>
              <el-button size="small" text type="success" @click="onReconcile(row)">对账</el-button>
              <el-button size="small" text type="warning" @click="openMailRecord(row)">邮件记录</el-button>
            </el-space>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="邮件记录" width="880px">
      <div v-if="activeBill" class="mail-meta">
        <el-descriptions :column="3" border>
          <el-descriptions-item label="客户全称">{{ activeBill.customerFullName }}</el-descriptions-item>
          <el-descriptions-item label="客户简称">{{ activeBill.customerShortName }}</el-descriptions-item>
          <el-descriptions-item label="账单月">{{ activeBill.billMonth }}</el-descriptions-item>
        </el-descriptions>
      </div>

      <el-table :data="activeMailRecords" border stripe>
        <el-table-column prop="billType" label="账单类型" width="120" />
        <el-table-column prop="sendTime" label="发送时间" width="180" />
        <el-table-column label="发送状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getMailStatusType(row.sendStatus)" effect="light">{{ row.sendStatus }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="recipientEmail" label="收件邮箱" min-width="180" />
        <el-table-column prop="ccEmail" label="抄送邮箱" min-width="180" />
        <el-table-column prop="operator" label="操作人" width="90" />
      </el-table>
    </el-dialog>
  </div>
</template>
