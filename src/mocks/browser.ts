import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

const worker = setupWorker(...handlers)

export async function setupMockWorker() {
  if (!import.meta.env.DEV) return
  await worker.start({
    onUnhandledRequest: 'bypass'
  })
}
