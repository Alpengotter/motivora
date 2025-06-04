<template>
  <div class="employers-view">
    <div class="header">
      <div class="title-container">
        <h1 class="title">Клиники</h1>
      </div>
      <div class="statistic-container">
        <StatisticItem
          title="Клиник"
          :count="companiesStore.statistic?.users"
          icon="employer"
        />
        <StatisticItem title="Мотикоинов" :count="companiesStore.statistic?.lemons" icon="lemons" />
      </div>
    </div>
    <div class="actions-wrapper">
      <Search placeholder="Поиск" v-model:model-value="searchQuery" />
    </div>

    <div class="employers-list" v-if="filteredCompanies.length">
      <ListItemView
        v-for="company in filteredCompanies"
        v-bind:key="company.id"
        :id="company.id"
        :title="company.name"
        :wallet="[{value: company.currency, currency: 'tooth'}]"
        :wallet-action="() => selectCompany(company)"
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
    <ModalView :show="isModalOpen" @close-modal="toggleModal">
      <template #content>
        <CompanyModalContent :employerId="selectedCompany!.id" :updateWallet="companiesStore.updateById"
                              :close="toggleModal" />
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
import ListItemView from '@/components/ListItemView.vue'

import { useCompaniesStore } from '@/stores/companyStores'
import type { Company } from '@/types/company'
import EmployerModalContent from '@/components/EmployerModalContent.vue'
import CompanyModalContent from '@/components/companies/CompanyModalContent.vue'

const companiesStore = useCompaniesStore()

const searchQuery = ref('')

const isModalOpen = ref(false)

const selectedCompany = ref<Company | undefined>(undefined)

onMounted(async () => {
  await companiesStore.fetch()
  await companiesStore.getStatistic()
})

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}

const selectCompany = (c: Company): void => {
  console.log(c)
  selectedCompany.value = c
  toggleModal()
}

const filteredCompanies = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()

  return companiesStore.data.filter((c) => {
    return c.name?.toLowerCase().includes(query)
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
