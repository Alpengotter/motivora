<template>
  <div class="employer glass">
    <div class="info-container">
      <div class="info">
        <p class="primary-text">{{ company.name }}</p>
      </div>
    </div>

    <div class="department">
    </div>

    <div class="wallet" @click="showUserInfo(company)">
      <div class="wallet-lemons">
        <p class="wallet-text">{{ company.currency }} <img src="@/assets/tooth.png" alt="lemon" width="18" height="18" style="margin-left: 4px"/></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Company } from '@/types/company'

const props = defineProps<{
  company: Company;
  showUserInfo: (c: Company) => void;
}>();
</script>

<style scoped>
.employer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 30px;
  border-radius: 24px;
  margin-bottom: 10px;
}

.info-container {
  display: flex;
  align-items: center;
  gap: 18px;
}

.info {
  display: flex;
  flex-direction: column;
  width: 250px;
}

.department {}

.wallet {
  display: flex;
  flex-direction: row;
  padding: 6px 12px;
  transition: .2s;
  cursor: pointer;
}

.wallet:hover {
  background-color: #ffffff80;
  padding: 6px 12px;
  border-radius: 99px;
  transition: .2s;
}

.wallet-lemons,
.wallet-diamonds {
  display: flex;
  align-items: center;
  gap: 4px;
}

.wallet-text {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;

  color: var(--color-text);

  display: flex;
  align-items: center;
}

.divider {
  width: 1px;
  background-color: var(--vt-c-divider-light-1);
  margin: 0 10px;
}

/* custom input */

/* The container */
.container {
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
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
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
.container:hover input~.checkmark {
  background-color: #d4d4d4;
  transition: .2s;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked~.checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
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
