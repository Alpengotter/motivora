<template>
  <div class="menu glass"  v-if="isAuthenticated && !isShared">
    <nav>
<!--      <RouterLink to="/" class="nav-item" active-class="active">Заказы</RouterLink>-->
      <RouterLink to="/" class="nav-item" active-class="active">Сотрудники</RouterLink>
      <RouterLink to="/companies" class="nav-item" active-class="active">Клиники</RouterLink>
      <RouterLink to="/statistics" class="nav-item" active-class="active">Статистика</RouterLink>
      <RouterLink to="/reports" class="nav-item" active-class="active">Отчеты</RouterLink>
      <RouterLink to="/shared-table" class="nav-item" active-class="active">Таблица</RouterLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { isAuthenticated, isShared } = storeToRefs(authStore)
</script>


<style scoped>
.menu {
  display: flex;
  border-radius: 999px;
  padding: 6px;
}

nav {
  display: flex;
}

.nav-item {
  padding: 8px 16px;
  color: var(--color-text);
  border-radius: 999px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
}

.active {
  background-color: var(--vt-c-primary);
  color: var(--vt-c-white);
}
</style>
