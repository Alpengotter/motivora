<script setup lang="ts">
import type { Wallet } from '@/types/wallet'
import { VaDivider } from 'vuestic-ui'
import { currencies } from '@/constants/currencies'
import Checkbox from 'primevue/checkbox';
import { useSelection } from '@/components/hooks/useSelection'

type CurrencyKey = keyof typeof currencies

const props = defineProps<{
  id: number
  title: string
  subtitle?: string
  description?: string
  wallet: Wallet[]
  walletAction?: () => void
}>()

const { isSelected } = useSelection({ id: props.id })
</script>

<template>
  <div class="card glass">
    <div class="section left">
      <Checkbox v-model="isSelected" binary size="large"/>
      <div class="info">
        <p class="primary-text">{{ title }}</p>
        <p class="secondary-text">{{ subtitle }}</p>
      </div>
    </div>
    <div class="section">
      <p class="secondary-text">{{ description }}</p>
    </div>
    <div class="section wallet" @click="walletAction">
      <div class="wallet-content" v-for="(item, i) in wallet" v-bind:key="item.currency">
        <p class="wallet-text">
          {{ item.value }}
          <img
            v-if="currencies[item.currency as CurrencyKey]"
            :src="currencies[item.currency as CurrencyKey].asset"
            alt="currency"
            width="18"
            height="18"
            style="margin-left: 4px"
          />
        </p>
        <va-divider
          vertical
          color="#3c3c3c4a"
          v-if="wallet.length > 1 && i < wallet.length - 1"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 30px;
  border-radius: 24px;
  margin-bottom: 10px;
}

.section {
  display: flex;

  .info {
    display: flex;
    flex-direction: column;
  }
}

.left {
  display: flex;
  align-items: center;
  gap: 18px;
}

.wallet {
  display: flex;
  flex-direction: row;
  padding: 0 12px;
  transition: 0.2s;
  cursor: pointer;

  &-content {
    display: flex;
    flex-direction: row;
    padding: 6px 0;
    transition: 0.2s;
    cursor: pointer;
  }

  &-text {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;

    color: var(--color-text);

    display: flex;
    align-items: center;
  }

  &:hover {
    background-color: #ffffff80;
    padding: 0 12px;
    border-radius: 99px;
    transition: 0.2s;
  }
}

:deep(.p-checkbox) {
  .p-checkbox-box {
    border-radius: 99px;
  }
}

:deep(.p-checkbox-checked) {
  .p-checkbox-box {
    background: #19A7E0;
    border-color: #19A7E0;
  }
}

</style>
