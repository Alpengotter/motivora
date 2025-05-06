<template>
  <div class="employers-view">
    <div class="header">
      <div class="title-container">
        <h1 class="title">Компании</h1>
      </div>
      <div class="statistic-container">
        <StatisticItem title="Компаний" :count="companiesStore.statistic?.companies" icon="employer" />
        <StatisticItem title="Зубов" :count="companiesStore.statistic?.lemons || 0" icon="lemons" />
      </div>
    </div>
    <div class="actions-wrapper">
      <!-- search field -->
      <Search placeholder="Поиск" v-model:model-value="searchQuery" />
      <div class="actions">
        <!-- запускает выбор сотрудников -->
        <Button appearance="secondary" @click="toggleSelectMode" v-if="!isSelectMode">Выбрать</Button>
        <Button appearance="secondary" @click="toggleSelectMode(); clearSelection();" v-else>Отмена</Button>

        <Button appearance="secondary" v-if="false">Выбрать все</Button>

        <Button appearance="secondary" @click="toggleAddNewModal">+</Button>
      </div>
    </div>

    <!-- selected employers list -->
    <div class="employers-list selected" v-if="selectedCompanyStore.selectedItems.length">
      <div class="accordion" :style="{ height: `${selectedCompanyStore.selectedItems.length * 15 + 72}px` }">
        <CompanyCard class="accordion-item" v-for="(company, index) in selectedCompanyStore.selectedItems.sort()"
          :key="company.id + 1000" :company="company" :show-company-info="selectedCompany" :selectMode="true"
          :style="{ top: `${index * 15}px` }" />
      </div>
      <div><Button appearance="secondary" @click="toggleMultipleModal">Начислить выбранным</Button> </div>
    </div>

    <div class="employers-list" v-if="paginatedEmployees.length">
      <CompanyCard v-for="company in paginatedEmployees" :key="company.id" :company="company"
        :show-company-info="selectedCompany" :selectMode="isSelectMode" />
      <div v-if="hasMore" v-lazy-load="loadMore">
        <div class="loading-spinner">
          <Preloader :width="50" />
        </div>
      </div>
    </div>

    <div class="loading-spinner" v-else-if="companiesStore.loading">
      <Preloader :width="50" />
    </div>
    <div class="empty" v-else>
      <span>
        Список сотрудников не загружен.
      </span>
      <span>Обратитесь в поддержку.</span>
    </div>

<!--     employer info modal -->
<!--    <ModalView :show="isModalOpen" @close-modal="toggleModal" :user="selectedCompany">-->
<!--      <template #content>-->
<!--        <CompanyModalContent :employerId="selectedCompany!.id" :updateWallet="companiesStore.updateById"-->
<!--          :close="toggleModal" />-->
<!--      </template>-->
<!--    </ModalView>-->

    <!-- new employer -->
<!--    <ModalView :show="isModalAddNewOpen" @close-modal="toggleAddNewModal">-->
<!--      <template #content>-->
<!--        <NewEmployerContent :close="toggleAddNewModal" />-->
<!--      </template>-->
<!--    </ModalView>-->

    <!-- multiple accrual employers -->
<!--    <ModalView :show="isModalMultipleOpen" @close-modal="toggleMultipleModal">-->
<!--      <template #content>-->
<!--        <CompanyMultipleAccrualModal :close="handleCloseMultipleAccrual" />-->
<!--      </template>-->
<!--    </ModalView>-->

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import Button from '@/components/Button.vue';
import Search from '@/components/Search.vue';
import ModalView from '@/components/ModalView.vue';
import StatisticItem from '@/components/StatisticItem.vue';
import NewEmployerContent from '@/components/NewEmployerContent.vue';
import Preloader from '@/components/Preloader.vue';

import { useCompaniesStore } from '@/stores/companyStores'
import { useSelectedCompanyStore } from '@/stores/selectedCompanyStore'
import CompanyCard from '@/components/companies/CompanyCard.vue'
import CompanyModalContent from '@/components/companies/CompanyModalContent.vue'
import CompanyMultipleAccrualModal from '@/components/companies/CompanyMultipleAccrualModal.vue'
import type { Company } from '@/types/company'

const companiesStore = useCompaniesStore();
const selectedCompanyStore = useSelectedCompanyStore();

const searchQuery = ref("");

const isModalOpen = ref(false);
const isModalAddNewOpen = ref(false);
const isModalMultipleOpen = ref(false);

const isSelectMode = ref(false);
const selectedCompany = ref<Company | undefined>(undefined);

const currentPage = ref(1);
const itemsPerPage = 25;
const hasMore = ref(true);

onMounted(async () => {
  console.log(selectedCompany.value);
  await companiesStore.fetch();
  await companiesStore.getStatistic();
});

const selectCompany = (company: Company): void => {
  selectedCompany.value = company;
  toggleModal();
}

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const toggleAddNewModal = () => {
  isModalAddNewOpen.value = !isModalAddNewOpen.value;
}

const toggleMultipleModal = () => {
  isModalMultipleOpen.value = !isModalMultipleOpen.value;
}

const handleCloseMultipleAccrual = () => {
  isModalMultipleOpen.value = !isModalMultipleOpen.value;
  toggleSelectMode();
  clearSelection();
}

const clearSelection = () => {
  selectedCompanyStore.selectedItems = [];
}

const paginatedEmployees = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredCompanies.value.slice(0, end);
});

const loadMore = () => {
  if (currentPage.value * itemsPerPage < filteredCompanies.value.length) {
    currentPage.value++;
  }
  hasMore.value = (currentPage.value * itemsPerPage < filteredCompanies.value.length);
}

const filteredCompanies = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();

  if (!query) return companiesStore.data.filter(c => !selectedCompanyStore.selectedItems.includes(c));

  return companiesStore.data.filter((c) => {
    const matchesQuery =
      c.title?.toLowerCase().includes(query);

    const isSelected = selectedCompanyStore.selectedItems.includes(c);

    return matchesQuery && !isSelected;
  });
});

const toggleSelectMode = () => {
  isSelectMode.value = !isSelectMode.value;
}

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
  align-items: center
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
  transition: .2s;
}
</style>
