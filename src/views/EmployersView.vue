<template>
  <div class="employers-view">
    <div class="header">
      <div class="title-container">
        <h1 class="title">Сотрудники</h1>
      </div>
      <div class="statistic-container">
        <StatisticItem title="Сотрудников" :count="userStore.employerStatistic?.users" icon="employer" />
        <StatisticItem title="Зубов" :count="userStore.employerStatistic?.lemons" icon="lemons" />
      </div>
    </div>
    <div class="actions-wrapper">
      <!-- search field -->
      <div class="filter-container">
        <Search placeholder="Поиск" v-model:model-value="searchQuery" />
        <MultiSelect v-model="filteredByCompany" :options="companiesStore.data" optionLabel="name" optionValue="id"
          showClear placeholder="Выберите компанию" class="select-company" />
      </div>


      <div class="actions">
        <Button appearance="secondary" @click="toggleHistoryModal">
          <img style="width: 14px; height: 14px; margin-right: 8px" src="@/assets/calendar.png" alt="calendar" />
          История
        </Button>
        <Button appearance="secondary" @click="toggleAddNewModal">+</Button>
      </div>
    </div>

    <!-- selected employers list -->
    <div class="employers-list selected" v-if="selectedEmployersStore.selectedItems.length">
      <div class="accordion" :style="{ height: `${selectedEmployersStore.selectedItems.length * 15 + 72}px` }">
        <ListItemView v-for="(employee, index) in selectedEmployersStore.selectedItems.sort()" :id="employee.id"
          :title="`${employee.lastName} ${employee.firstName}`" :subtitle="employee?.jobTitle || ''"
          :description="getDescription(employee)" :wallet="[{ value: employee.lemons, currency: 'tooth' }]"
          :wallet-action="() => selectEmployer(employee)" v-bind:key="employee.id + 1000" class="accordion-item"
          show-checkbox :style="{ top: `${index * 15}px` }" />
      </div>
      <div>
        <Button appearance="secondary" @click="toggleMultipleModal">Начислить выбранным</Button>
      </div>
    </div>

    <div class="employers-list" v-if="filteredEmployees.length">
      <ListItemView v-for="employee in filteredEmployees" :id="employee.id"
        :title="`${employee.lastName} ${employee.firstName}`" :subtitle="employee?.jobTitle || ''"
        :description="getDescription(employee)" :wallet="[{ value: employee.lemons, currency: 'tooth' }]" show-checkbox
        :wallet-action="() => selectEmployer(employee)" v-bind:key="employee.id" />
    </div>

    <div class="loading-spinner" v-else-if="userStore.loading">
      <Preloader :width="50" />
    </div>
    <div class="empty" v-else>
      <span> Список сотрудников не загружен. </span>
      <span>Обратитесь в поддержку.</span>
    </div>

    <Paginator v-model:first="first"
               v-model:rows="rows"
               :totalRecords="userStore.employerStatistic?.users"
               :rowsPerPageOptions="[10, 25, 50]">
    </Paginator>

    <!-- employer info modal -->
    <ModalView :show="isModalOpen" @close-modal="toggleModal" :user="selectedEmployer">
      <template #content>
        <EmployerModalContent :employerId="selectedEmployer!.id" :updateWallet="userStore.updateWallet"
          :close="toggleModal"
          :edit="toggleEditModal"
        />
      </template>
    </ModalView>

    <!-- new employer -->
    <ModalView :show="isModalAddNewOpen" @close-modal="toggleAddNewModal">
      <template #content>
        <NewEmployerContent :close="toggleAddNewModal" />
      </template>
    </ModalView>

    <!-- edit employer -->
    <ModalView :show="isModalEditOpen" @close-modal="toggleEditModal">
      <template #content>
        <EditEmployerContent :close="toggleEditModal" :employer-id="selectedEmployer!.id"/>
      </template>
    </ModalView>

    <!-- multiple accrual employers -->
    <ModalView :show="isModalMultipleOpen" @close-modal="toggleMultipleModal">
      <template #content>
        <EmployerMultipleAccrualModal :close="handleCloseMultipleAccrual" />
      </template>
    </ModalView>

    <ModalView :show="isModalHistoryOpen" @close-modal="toggleHistoryModal">
      <template #content>
        <HistoryModal />
      </template>
    </ModalView>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import { useUserStore } from '@/stores/userStores'
import Button from '@/components/Button.vue'
import Search from '@/components/Search.vue'
import ModalView from '@/components/ModalView.vue'
import StatisticItem from '@/components/StatisticItem.vue'
import EmployerModalContent from '@/components/EmployerModalContent.vue'
import NewEmployerContent from '@/components/NewEmployerContent.vue'
import Preloader from '@/components/Preloader.vue'
import MultiSelect from 'primevue/multiselect'
import Paginator from 'primevue/paginator';

import type { User } from '@/types/user'
import { useSelectedUsersStore } from '@/stores/selectedUsersStore'
import EmployerMultipleAccrualModal from '@/components/EmployerMultipleAccrualModal.vue'
import { useCompaniesStore } from '@/stores/companyStores'
import ListItemView from '@/components/ListItemView.vue'
import HistoryModal from '@/components/modals/HistoryModal.vue'
import _ from 'lodash'
import EditEmployerContent from '@/components/EditEmployerContent.vue'

const userStore = useUserStore()
const companiesStore = useCompaniesStore()
const selectedEmployersStore = useSelectedUsersStore()

const searchQuery = ref('')
const filteredByCompany = ref(null)

const isModalOpen = ref(false)
const isModalAddNewOpen = ref(false)
const isModalEditOpen = ref(false)
const isModalMultipleOpen = ref(false)
const isModalHistoryOpen = ref(false)

const isSelectMode = ref(false)
const selectedEmployer = ref<User | undefined>(undefined)

const first = ref(0);
const rows = ref(10);

onMounted(async () => {
  await loadMore()
  await companiesStore.fetch()
  await userStore.employersStat()
})

const getDescription = (u: User) => {
  if (u.clinics.length) {
    return u.clinics.join(', ')
  }

  return ''
}

const selectEmployer = (user: User): void => {
  selectedEmployer.value = user
  toggleModal()
}

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}

const toggleAddNewModal = () => {
  isModalAddNewOpen.value = !isModalAddNewOpen.value
}

const toggleEditModal = () => {
  isModalEditOpen.value = !isModalEditOpen.value
}

const toggleMultipleModal = () => {
  isModalMultipleOpen.value = !isModalMultipleOpen.value
}

const toggleHistoryModal = () => {
  isModalHistoryOpen.value = !isModalHistoryOpen.value
}

const handleCloseMultipleAccrual = () => {
  isModalMultipleOpen.value = !isModalMultipleOpen.value
  toggleSelectMode()
  clearSelection()
}

const clearSelection = () => {
  selectedEmployersStore.selectedItems = []
}

const loadMore = async () => {
  if (userStore.loading) return

  await userStore.searchEmployers({
    searchParameter: searchQuery.value,
    clinicIds: filteredByCompany.value || [],
    page: first.value / rows.value,
    size: rows.value,
    sort: ['lemons,desc']
  })
}

watch([first, rows, searchQuery, filteredByCompany], () => {
  loadMore()
});

watch([searchQuery, filteredByCompany], () => {
  first.value = 0
  loadMore()
});

const filteredEmployees = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()

  if (!query)
    return userStore.users.filter(
      (employee) => !selectedEmployersStore.selectedItems.includes(employee),
    )

  return userStore.users.filter((employee) => {
    const matchesQuery =
      employee.firstName?.toLowerCase().includes(query) ||
      employee.lastName?.toLowerCase().includes(query) ||
      employee.email?.toLowerCase().includes(query) ||
      employee.jobTitle?.toLowerCase().includes(query)

    const isSelected = selectedEmployersStore.selectedItems.includes(employee)

    return matchesQuery && !isSelected
  })
})

const toggleSelectMode = () => {
  isSelectMode.value = !isSelectMode.value
}
</script>

<style scoped>
.filter-container {
  display: flex;
  flex-direction: row;
  gap: 14px;
}

.select-company {
  border-radius: 99px;
  border: none;
  background-color: #ffffff90;
  box-shadow: none;
  padding: 8px 0px;
  font-size: 14px;

  width: 250px;
}

.header {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-bottom: 40px;
}

.title {
  color: var(--color-text);

  font-style: normal;
  font-weight: 300;
  font-size: 48px;
  line-height: 58px;
}

.title-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
}

.actions-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 27px;
}

.actions {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.employer-add {
  width: 32px;
  height: 32px;
}

.statistic-container {
  display: flex;
  flex-direction: row;
  gap: 40px;
  align-items: center;
}

.empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: var(--color-text);
  font-size: 24px;
  font-weight: 300;
  text-align: center;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}

.accordion {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
}

.accordion-item {
  position: absolute;
  width: 100%;
}

.selected {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.accordion-item:hover {
  z-index: 999;
  transition: 0.2s;
}
</style>
