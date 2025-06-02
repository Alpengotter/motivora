<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { NOMINATIONS_PERSONAL } from '@/constants/nominations'
import { useHistoryStores } from '@/stores/historyStores'
import { onMounted, ref } from 'vue'
import { FilterMatchMode } from '@primevue/core/api';
import { transformData } from '@/utils/transformData'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const historyStore = useHistoryStores()

const currentDate = new Date();
const year = currentDate.getFullYear();

// Начало года: 1 января текущего года
const startDate = new Date(year, 0, 1); // Месяц 0 — январь

// Конец года: 31 декабря текущего года
const endDate = new Date(year, 11, 31); // Месяц 11 — декабрь

// format date to 'DD.MM.YYYY'
const format = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

const filters = ref({
  fullName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  clinics: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

const expandedRows = ref({});

onMounted(async () => {
  await historyStore.fetchHistory({
    dateFrom: format(startDate),
    dateTo: format(endDate),
    searchParam: '',
  });
})

const getFilteredNominations = (user: any) => {
  return NOMINATIONS_PERSONAL
    .map((nomination, index) => ({
      text: nomination.text,
      value: user.nominations[index] || 0
    }))
    .filter(nomination => nomination.value > 0);
};

</script>

<template>
  <main>
    <section>
      <DataTable
        style="background-color: transparent"
        tableStyle="min-width: 50rem"
        :value="transformData(historyStore.getAllHistory)"
        dataKey="id"
        v-model:expandedRows="expandedRows"
        v-model:filters="filters"
        filterDisplay="row"
        :globalFilterFields="['name', 'country.name', 'representative.name', 'status']"
        paginator
        :rows="15"
        sortField="summary"
        :sortOrder="-1"
        removableSort>
        <Column expander/>
        <Column field="fullName" header="ФИО"  sortable :showFilterMenu="false">
          <template #body="{ data }">
            {{ data.fullName }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Поиск по ФИО" />
          </template>
        </Column>
        <Column field="clinics" header="Клиника"  sortable :showFilterMenu="false">
          <template #body="{ data }">
            {{ data.clinics }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Поиск по клинике" />
          </template>
        </Column>
        <Column field="summary" header="Итого" sortable></Column>

        <template #expansion="slotProps">
          <div class="p-4">
            <DataTable
              :value="getFilteredNominations(slotProps.data)"
            >
              <Column field="text" header="Номинация">
                <template #body="{ data }">
                  {{ data.text }}
                </template>
              </Column>
              <Column field="value" header="Начислено">
                <template #body="{ data }">
                  {{ data.value }}
                </template>
              </Column>
            </DataTable>
          </div>
        </template>
      </DataTable>
    </section>
  </main>
</template>

<style>
:root {

}
</style>
