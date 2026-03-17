import { dashboardHandlers } from './dashboard'
import { subjectHandlers } from './subject'

export const handlers = [...dashboardHandlers, ...subjectHandlers]
