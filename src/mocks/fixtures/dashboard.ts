import type { DashboardResponse } from '../../types/dashboard'

export const dashboardFixture: DashboardResponse = {
  summary: {
    totalStrategies: 186,
    runningStrategies: 74,
    pendingCrowdPacks: 19,
    monthlyRevenue: 8382640,
    monthlyCost: 5612200,
    todayTouches: 240933
  },
  trends: [
    { date: '02-25', revenue: 632000, cost: 401300, touches: 189000 },
    { date: '02-26', revenue: 691200, cost: 443920, touches: 210134 },
    { date: '02-27', revenue: 708400, cost: 456720, touches: 214552 },
    { date: '02-28', revenue: 744110, cost: 491220, touches: 225194 },
    { date: '03-01', revenue: 779530, cost: 517230, touches: 234920 },
    { date: '03-02', revenue: 803210, cost: 531300, touches: 239281 },
    { date: '03-03', revenue: 831800, cost: 548920, touches: 240933 }
  ],
  todos: [
    { id: 'TD-9032', title: '速牛-省呗 AB 分流配置待审核', owner: '乔马玲', dueAt: '2026-03-04 17:30', status: '待处理' },
    { id: 'TD-9058', title: '渠道外呼报表字段缺失修复', owner: '尹少娟', dueAt: '2026-03-04 18:00', status: '进行中' },
    { id: 'TD-9063', title: '营销分月账单跑批失败回溯', owner: '邵垂海', dueAt: '2026-03-04 20:00', status: '阻塞' },
    { id: 'TD-9065', title: '模型PSI阈值超限告警复核', owner: '张磊', dueAt: '2026-03-04 21:00', status: '待处理' }
  ],
  quickEntries: [
    { id: 'QE-1', title: '投放策略', route: '/market/circlingCrowd/distAndCirc', tag: '代运营' },
    { id: 'QE-2', title: '模型管理', route: '/score/models', tag: '营销分' },
    { id: 'QE-3', title: '客户侧总账单', route: '/finance/incomeTotalBill', tag: '账单管理' },
    { id: 'QE-4', title: '模型PSI监控', route: '/monitor/modelPsi', tag: '监控中心' }
  ]
}
