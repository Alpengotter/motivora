<template>
  <div v-if="companyStore.loading" class="preloader">
    <Preloader :width="50" />
  </div>
  <div class="wrapper" v-if="employer && !companyStore.loading">
    <header>
      <h2 class="fullname">{{ employer.name }}</h2>
      <!--      <span class="email">{{ employer?.email }}</span>-->
    </header>
    <main>
      <div class="wallet">
        <p>
          <img
            src="@/assets/tooth.png"
            alt="lemon"
            width="30"
            height="30"
            style="margin-right: 4px"
          /><span>{{ employer?.currency }}</span>
          <span
            v-if="activeCurrencyIndex === 0 && inputValue"
            class="change-value"
            :class="{ add: activeOperationIndex === 0, remove: activeOperationIndex === 1 }"
          >
            <span v-if="activeOperationIndex === 0">+</span>
            <span v-else>-</span>{{ inputValue }}
          </span>
        </p>
      </div>

      <div class="nominations">
        <VaSelect
          v-model="nominations"
          :options="NOMINATIONS_TEAM"
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

      <div class="actions-wrapper">
        <div class="actions">
          <div class="switch">
            <div
              v-for="(currency, index) in currencies"
              :key="index"
              :class="{ 'switch-item': true, active: activeCurrencyIndex === index }"
              @click="setActiveCurrency(index)"
            >
              <span>{{ currency }}</span>
            </div>
          </div>
          <div class="switch">
            <div
              v-for="(operation, index) in operations"
              :key="index"
              :class="{ 'switch-item': true, active: activeOperationIndex === index }"
              @click="setActiveOperation(index)"
            >
              <span>{{ operation }}</span>
            </div>
          </div>
          <input class="input balance" type="text" placeholder="0" v-model="inputValue" />
          <input class="input" type="text" placeholder="Комментарий" v-model="commentValue" />

          <Button
            appearance="primary"
            class="submit"
            @click="handleSubmit(employer)"
            :disabled="!inputValue"
            :class="{ disabled: !inputValue }"
          >
            Начислить
          </Button>
        </div>

        <div class="comment-container"></div>
      </div>

      <div class="history">
        <p class="history-title">Последние операции</p>
        <div class="history-list">
          <HistoryComponent :company="employer" />
        </div>
      </div>
    </main>
    <footer>
      <Button appearance="attention" class="deactivate">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 1C4.1 1 1 4.1 1 8C1 11.9 4.1 15 8 15C11.9 15 15 11.9 15 8C15 4.1 11.9 1 8 1ZM8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2C11.3 2 14 4.7 14 8C14 11.3 11.3 14 8 14Z"
            fill="white"
          />
          <path
            d="M10.7 11.5L8 8.8L5.3 11.5L4.5 10.7L7.2 8L4.5 5.3L5.3 4.5L8 7.2L10.7 4.5L11.5 5.3L8.8 8L11.5 10.7L10.7 11.5Z"
            fill="white"
          />
        </svg>

        <span class="button-title" >Деактивировать</span></Button
      >
    </footer>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue'
import { onMounted, ref, watch } from 'vue'
import Preloader from '@/components/Preloader.vue'
import HistoryComponent from '@/components/history/HistoryComponent.vue'
import { VaSelect } from 'vuestic-ui'
import { NOMINATIONS_TEAM } from '@/constants/nominations'
import type { Nomination } from '@/types/nomination'
import type { Company } from '@/types/company'
import { useCompaniesStore } from '@/stores/companyStores'

const companyStore = useCompaniesStore()

const operations = ['+', '-']
const currencies = ['🦷']

const activeOperationIndex = ref(0)
const activeCurrencyIndex = ref(0)
const inputValue = ref<number>(0)
const employer = ref<Company | undefined>(undefined)

const commentValue = ref<string>('')
const nominations = ref<Nomination | null>(null)

watch(nominations, () => {
  inputValue.value = nominations.value?.value || 0
})

onMounted(async () => {
  try {
    employer.value = await companyStore.getById(props.employerId)
  } catch (error) {
    console.error('Error fetching company:', error)
  }
})

const refresh = async () => {
  try {
    employer.value = await companyStore.getById(props.employerId)
  } catch (error) {
    console.error('Error fetching company:', error)
  }
}

const handleSubmit = async (employer: Company | undefined) => {
  if (!employer) return
  let lemons = employer.currency || 0
  // let diamonds = employer.diamonds || 0


  if (inputValue.value) {
    if (activeOperationIndex.value === 0) {
      lemons += inputValue.value
    } else {
      lemons -= inputValue.value
    }
  }

  if (lemons < 0) {
    lemons = 0
  }

  // if (diamonds < 0) {
  //   diamonds = 0
  // }

  try {
    await props.updateWallet(employer.id, {
      currency: lemons,
      comment: `${nominations.value?.text || ''} ${commentValue.value || ''}`,
    })
    await refresh()

    inputValue.value = 0
    commentValue.value = ''
  } catch (error) {
    console.error('Error updating wallet:', error)
  }
}

const setActiveOperation = (index: number) => {
  activeOperationIndex.value = activeOperationIndex.value === index ? 0 : index
}

const setActiveCurrency = (index: number) => {
  activeCurrencyIndex.value = activeCurrencyIndex.value === index ? 0 : index
}


const props = defineProps<{
  employerId: number
  close: () => void
  updateWallet: (
    id: number,
    wallet: {
      currency: number
      comment: string
    },
  ) => Promise<Company | undefined>
}>()
</script>

<style scoped lang="scss">
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

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

main {
  display: flex;
  flex-direction: column;
  flex: 1;
}

footer {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 28px;
  width: 100%;
}

.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.fullname {
  font-style: normal;
  font-weight: 400;
  font-size: 26px;
  line-height: 30px;
}

.email {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;

  color: var(--color-secondary-text);
}

.wallet {
  display: flex;
  justify-content: space-around;

  padding: 45px 0;
}

.wallet p {
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 46px;
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

.history {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  flex-grow: 1;
}

.history-title {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  text-align: center;

  padding: 32px 0;
}

.deactivate {
  font-size: 16px;
}

.history-list {
  flex-grow: 1;
}

.history-empty p {
  color: var(--color-secondary-text);
  text-align: center;
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
  background-color: rgba(0, 0, 0, 0.1);
  padding: 8px 16px;
  font-size: 14px;
}

.balance {
  width: 80px;
}

.submit {
  height: 40px;
  border-radius: 99px;
  padding: 0 16px;
  font-size: 14px;
}

.change-value {
  font-size: 24px;
}

.add {
  color: green;
}

.remove {
  color: #ff746c;
}

.button-title {
  margin-left: 6px;
}

.preloader {
  display: flex;
  justify-content: center;
  align-items: center;
}

.disabled {
  background-color: rgba(0, 0, 0, 0.1);
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
  transition: 0.2s;
}

/* On mouse-over, add a grey background color */
.checkbox-container:hover input ~ .checkmark {
  background-color: #d4d4d4;
  transition: 0.2s;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkbox-checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.checkbox-container input:checked ~ .checkbox-checkmark:after {
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
