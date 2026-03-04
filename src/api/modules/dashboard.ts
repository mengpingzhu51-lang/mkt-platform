import http from '../http'
import type { DashboardResponse } from '../../types/dashboard'

export function fetchDashboardData() {
  return http.get<never, DashboardResponse>('/show/dashboard/overview')
}
