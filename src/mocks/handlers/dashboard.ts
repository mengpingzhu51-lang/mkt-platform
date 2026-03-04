import { http, HttpResponse } from 'msw'
import { dashboardFixture } from '../fixtures/dashboard'

export const dashboardHandlers = [
  http.get('/marketing/show/dashboard/overview', () => {
    return HttpResponse.json(dashboardFixture)
  })
]
