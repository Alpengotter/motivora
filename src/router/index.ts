import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import EmployersView from '@/views/EmployersView.vue'
import StatisticsView from '@/views/StatisticsView.vue'
import ReportsView from '@/views/ReportsView.vue'
import OrdersView from '@/views/OrdersView.vue'
import { useAuthStore } from '@/stores/useAuthStore'
import CompaniesView from '@/views/CompaniesView.vue'
import SharedTable from '@/views/SharedTable.vue'
import Cookies from 'js-cookie'
import { omit } from 'lodash'

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
    {
      path: '/shared-table',
      name: 'shared-table',
      component: SharedTable,
      meta: { requiresAuth: false },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const userRoles = ['ADMIN']
  const authStore = useAuthStore()
  const sharedToken = to.query['token'];

  if (sharedToken && to.path === '/shared-table') {
    const existingToken = Cookies.get('token')

    if (!existingToken) {
      Cookies.set('token', sharedToken as string + '_shared', {
        expires: 7
      });
      authStore.setSharedToken(sharedToken as string)
    }

    return next({
      ...to,
      query: omit(to.query, 'token')
    })
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      return next({ name: 'login' })
    }

    if (to.meta.roles) {
      const hasRole = (to.meta.roles as Array<string>).some((role) => userRoles.includes(role))
      if (!hasRole) {
        return next({ name: '/' })
      }
    }
  }

  next()
})

export default router
