export interface DashboardSummary {
  totalStrategies: number
  runningStrategies: number
  pendingCrowdPacks: number
  monthlyRevenue: number
  monthlyCost: number
  todayTouches: number
}

export interface TrendPoint {
  date: string
  revenue: number
  cost: number
  touches: number
}

export interface TodoItem {
  id: string
  title: string
  owner: string
  dueAt: string
  status: '待处理' | '进行中' | '阻塞'
}

export interface QuickEntry {
  id: string
  title: string
  route: string
  tag: string
}

export interface DashboardResponse {
  summary: DashboardSummary
  trends: TrendPoint[]
  todos: TodoItem[]
  quickEntries: QuickEntry[]
}
