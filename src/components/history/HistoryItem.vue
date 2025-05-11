<template>
  <div class="history-item">
    <div class="user-info">
      <p class="user-fullname primary-text" v-if="title">{{ title }}</p>
      <p class="user-email secondary-text" v-if="subtitle">{{ subtitle }}</p>
    </div>
    <p class="history-comment secondary-text">{{ comment }}</p>
    <p class="history-sum primary-text" v-if="historyItem.currency === 'lemons'">
      {{ value }} <img src="@/assets/tooth.png" alt="lemon" width="18" height="18"/>
    </p>
    <p class="history-sum primary-text" v-if="historyItem.currency === 'diamonds'">
      {{ value }} <img src="@/assets/gem.png" alt="lemon" width="18" height="18"/>
    </p>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/userStores';
import type { HistoryItem } from '@/types/historyItem';
import type { User } from '@/types/user';
import { onMounted, ref } from 'vue';
import { useCompaniesStore } from '@/stores/companyStores'

const userStore = useUserStore();
const companyStore = useCompaniesStore()
const title = ref<string>();
const subtitle = ref<string>();
const comment = ref<string>();
const value = ref<number>();

onMounted(async () => {
  if (props.historyItem.userId) {
    const employer = userStore.getUserById(props.historyItem.userId) || undefined;
    if (employer) {
      title.value = `${employer.lastName} ${employer.firstName}`;
      subtitle.value = `${employer.email || ''}`;
      comment.value = `${props.historyItem.comment}`;
      value.value = props.historyItem.value;
    }

  }
  if (props.historyItem.clinicId) {
    const company = companyStore.getByIdState(props.historyItem.clinicId) || undefined;
    if (company) {
      title.value = `${company.name}`;
      comment.value = `${props.historyItem.comment}`;
      value.value = props.historyItem.value;
    }
  }
})

const props = defineProps<{
  employer?: User;
  historyItem: HistoryItem;
}>();
</script>
<style scoped>
.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 10px 0;
}

.history-sum {
  display: flex;
  align-items: center;
}

.history-sum img {
  margin-left: 8px;
}
</style>
