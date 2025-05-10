<template>
  <div class="employers-view">
    <div class="header">
      <div class="title-container">
        <h1 class="title">Клиники</h1>
      </div>
      <div class="statistic-container">
        <StatisticItem
          title="Клиники"
          :count="companiesStore.statistic?.companies"
          icon="employer"
        />
        <StatisticItem title="Зубов" :count="companiesStore.statistic?.lemons" icon="lemons" />
      </div>
    </div>
    <div class="actions-wrapper">
      <Search placeholder="Поиск" v-model:model-value="searchQuery" />
    </div>

    <div class="employers-list" v-if="filteredCompanies.length">
      <CompanyCard
        v-for="company in filteredCompanies"
        :key="company.id"
        :company="company"
        :show-user-info="selectCompany"
      />
    </div>

    <div class="loading-spinner" v-else-if="companiesStore.loading">
      <Preloader :width="50" />
    </div>
    <div class="empty" v-else>
      <span> Список клиник не загружен. </span>
      <span>Обратитесь в поддержку.</span>
    </div>

    <!-- employer info modal -->
    <ModalView :show="isModalOpen" @close-modal="toggleModal" :user="selectedCompany">
      <template #content>
        <CompanyModalContent
          :company-id="selectedCompany!.id"
          :updateWallet="companiesStore.updateById"
          :close="toggleModal"
        />
      </template>
    </ModalView>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import CompanyCard from '@/components/companies/CompanyCard.vue'
import Search from '@/components/Search.vue'
import ModalView from '@/components/ModalView.vue'
import StatisticItem from '@/components/StatisticItem.vue'
import Preloader from '@/components/Preloader.vue'

import { useCompaniesStore } from '@/stores/companyStores'
import CompanyModalContent from '@/components/companies/CompanyModalContent.vue'
import type { Company } from '@/types/company'

const companiesStore = useCompaniesStore()

const searchQuery = ref('')

const isModalOpen = ref(false)

const isSelectMode = ref(false)
const selectedCompany = ref<Company | undefined>(undefined)

onMounted(async () => {
  console.log(selectedCompany.value)
  await companiesStore.fetch()
  await companiesStore.getStatistic()
})

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}

const selectCompany = (c: Company): void => {
  selectedCompany.value = c
  toggleModal()
}

const filteredCompanies = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()

  return companiesStore.data.filter((employee) => {
    return employee.title?.toLowerCase().includes(query)
  })
})
</script>

<style scoped>
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
</style>
