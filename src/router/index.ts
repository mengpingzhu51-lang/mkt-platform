import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import platformModules from './modules/platform'

const rootRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('../views/dashboard/DashboardView.vue'),
        meta: { title: '首页', moduleTitle: '首页', icon: 'House' }
      },
      ...platformModules
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/index'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: rootRoutes
})

export default router
