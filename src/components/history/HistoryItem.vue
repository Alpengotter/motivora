<template>
  <div class="history-item">
    <div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%; align-items: center">
      <div class="user-info">
        <p class="user-fullname primary-text" v-if="title">{{ title }}</p>
        <p class="user-email secondary-text" v-if="subtitle">{{ subtitle }}</p>
      </div>
      <div style="display: flex; flex-direction: row; gap: 10px">
        <p class="history-sum primary-text" v-if="historyItem.currency === 'lemons'">
          {{ value }} <img src="@/assets/tooth.png" alt="lemon" width="18" height="18"/>
        </p>
        <p class="history-sum primary-text" v-if="historyItem.currency === 'diamonds'">
          {{ value }} <img src="@/assets/gem.png" alt="lemon" width="18" height="18"/>
        </p>
        <Button
          v-if="!employer"
          appearance="secondary"
          class="history-sum primary-text"
          @click="deleteHistoryById(historyItem.id)">
          <ReturnIcon />
        </Button>
      </div>
    </div>
    <p class="history-comment secondary-text">{{ comment }}</p>

  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/userStores';
import type { HistoryItem } from '@/types/historyItem';
import type { User } from '@/types/user';
import { onMounted, ref } from 'vue';
import { useCompaniesStore } from '@/stores/companyStores'
//@ts-ignore
import ReturnIcon from '@/assets/icons/return.svg?component';
import Button from '@/components/Button.vue';

const userStore = useUserStore();
const companyStore = useCompaniesStore()
const title = ref<string>();
const subtitle = ref<string>();
const comment = ref<string>();
const value = ref<number>();

onMounted(async () => {
  if (props.historyItem.user) {
    title.value = `${props.historyItem.user.lastName} ${props.historyItem.user.firstName}`;
    comment.value = `${props.historyItem.comment}`;
    value.value = props.historyItem.value;
  }
  if (props.historyItem.clinic) {
    title.value = `${props.historyItem.clinic.name}`;
    comment.value = `${props.historyItem.comment}`;
    value.value = props.historyItem.value;
  }
})

const props = defineProps<{
  employer?: User;
  historyItem: HistoryItem;
  deleteHistoryById: (id: number) => Promise<void>;
}>();
</script>
<style scoped>
.history-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 4px;
}

.history-sum {
  display: flex;
  align-items: center;
}

.history-sum img {
  margin-left: 8px;
}

.user-info {
  display: flex;
  flex-direction: row;
}

.history-comment {
  text-overflow: ellipsis;
}
</style>
