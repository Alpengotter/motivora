<template>
  <div class="actions-wrapper">
    <div class="nominations">
      <VaSelect
        v-model="nominations"
        :options="NOMINATIONS_PERSONAL"
        searchable
        clearable
        highlight-matched-text
        placeholder="Выберите номинацию"
        style="width: 100%; background-color: rgba(0, 0, 0, 0.1); height: 40px"
      >
        <template #option="{ option, selectOption }">
          <div class="nominations-item" @click.prevent="selectOption(option)">
            <!-- @vue-ignore -->
            {{ option?.text }}
          </div>
        </template>
      </VaSelect>
    </div>
    <div class="actions">
      <div class="switch">
        <div v-for="(currency, index) in currencies" :key="index"
          :class="{ 'switch-item': true, active: activeCurrencyIndex === index }" @click="setActiveCurrency(index)">
          <span>{{ currency }}</span>
        </div>
      </div>
      <div class="switch">
        <div v-for="(operation, index) in operations" :key="index"
          :class="{ 'switch-item': true, active: activeOperationIndex === index }" @click="setActiveOperation(index)">
          <span>{{ operation }}</span>
        </div>
      </div>
      <input class="input" type="number" placeholder="0" v-model="inputValue">
      <input class="input" type="text" placeholder="Комментарий" v-model="commentValue">
    </div>
    <div>
      <Button appearance="primary" class="submit" @click="handleSubmit" :disabled="!inputValue"
        :class="{ 'disabled': !inputValue }">
        Начислить
      </Button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Button from '@/components/Button.vue';
import { NOMINATIONS_PERSONAL } from '@/constants/nominations'
import { VaSelect } from 'vuestic-ui'
import type { Nomination } from '@/types/nomination'

const props = defineProps<{
  currencies: string[];
  operations: string[];
}>();

const emit = defineEmits(['submit']);

const activeOperationIndex = ref(0);
const activeCurrencyIndex = ref(0);
const inputValue = ref<number | null>(null);
const commentValue = ref<string>('');
const isNotify = ref<boolean>(false);
const nominations = ref<Nomination | null>(null)

watch(nominations, () => {
  inputValue.value = nominations.value?.value || 0;
})

const setActiveCurrency = (index: number) => {
  activeCurrencyIndex.value = index;
};

const setActiveOperation = (index: number) => {
  activeOperationIndex.value = index;
};

const handleSubmit = () => {
  emit('submit', {
    currency: props.currencies[activeCurrencyIndex.value],
    operation: props.operations[activeOperationIndex.value],
    value: inputValue.value,
    comment: `${nominations.value?.text || ''} ${commentValue.value || ''}`,
    isNotify: isNotify.value,
  });
  inputValue.value = null;
};
</script>

<style scoped>
.valueInput {
  width: 100px;
}
.nominations {
  display: flex;
  width: 100%;
  margin-bottom: 16px;
}

.nominations-item {
  white-space: nowrap;
  padding: 8px;
}

.nominations-content {
  width: 100%;
  white-space: nowrap;
}
.actions-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.actions {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.switch {
  display: flex;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 99px;
}

.switch-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 99px;
  margin: 4px;
  cursor: pointer;
}

.switch-item span {
  font-size: 14px;
}

.switch-item.active {
  background-color: var(--vt-c-white);
}

.input {
  border-radius: 99px;
  border: none;
  background-color: rgba(0, 0, 0, .1);
  padding: 8px 16px;
  font-size: 14px;
}

.submit {
  height: 40px;
  border-radius: 99px;
  padding: 0 16px;
  font-size: 14px;
}

.submit.disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.comment-container {
  display: flex;
  gap: 0.5rem;
}

.checkbox-wrapper {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

/* custom input */

/* The container */
.checkbox-container {
  display: flex;
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 25px;
  height: 25px;
}

/* Hide the browser's default checkbox */
.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkbox-checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #fff;
  border-radius: 99px;
  transition: .2s;
}

/* On mouse-over, add a grey background color */
.checkbox-container:hover input~.checkmark {
  background-color: #d4d4d4;
  transition: .2s;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkbox-checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.checkbox-container input:checked~.checkbox-checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.checkbox-container .checkbox-checkmark:after {
  left: 10px;
  top: 6px;
  width: 5px;
  height: 10px;
  border: solid black;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
