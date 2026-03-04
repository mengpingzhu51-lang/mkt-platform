import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import { setupMockWorker } from './mocks/browser'

async function bootstrap() {
  await setupMockWorker()

  createApp(App).use(createPinia()).use(router).use(ElementPlus).mount('#app')
}

void bootstrap()
