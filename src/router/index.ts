import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import EmployersView from '@/views/EmployersView.vue'
import StatisticsView from '@/views/StatisticsView.vue'
import ReportsView from '@/views/ReportsView.vue'
import OrdersView from '@/views/OrdersView.vue'
import { useAuthStore } from '@/stores/useAuthStore'
import CompaniesView from '@/views/CompaniesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'employers',
      component: EmployersView,
      meta: { requiresAuth: false, roles: ['ADMIN'] },
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrdersView,
      meta: { requiresAuth: false, roles: ['ADMIN'] },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false, roles: ['ADMIN'] },
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: StatisticsView,
      meta: { requiresAuth: false, roles: ['ADMIN'] },
    },
    {
      path: '/reports',
      name: 'reports',
      component: ReportsView,
      meta: { requiresAuth: false, roles: ['ADMIN'] },
    },
    {
      path: '/companies',
      name: 'companies',
      component: CompaniesView,
      meta: { requiresAuth: false, roles: ['ADMIN'] },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const userRoles = ['ADMIN']
  const authStore = useAuthStore()

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      return next({ name: 'login' })
    }

    if (to.meta.roles) {
      // Если для страницы заданы роли, проверяем доступ
      const hasRole = (to.meta.roles as Array<string>).some((role) => userRoles.includes(role))
      if (!hasRole) {
        return next({ name: 'home' })
      }
    }
  }

  next()
})

export default router
