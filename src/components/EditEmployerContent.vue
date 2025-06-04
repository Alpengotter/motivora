<template>
  <div class="wrapper">
    <header>
      <h2 class="fullname">Редактирование сотрудника</h2>
    </header>
    <main>
      <input v-model.trim="surname" type="text" class="input" placeholder="Фамилия">
      <input v-model.trim="firstName" type="text" class="input" placeholder="Имя">
      <input v-model.trim="email" type="email" class="input" placeholder="Почта">
      <input v-model.trim="department" type="text" class="input" placeholder="Должность">
      <MultiSelect v-model="companies" :options="companyStore.data" optionLabel="name" optionValue="id" placeholder="Выберите компанию" class="input"/>
    </main>
    <footer>
      <Button appearance="primary" class="create-button">
        <span class="button-title" @click="handleSubmit">Сохранить</span></Button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue';
import { useUserStore } from '@/stores/userStores';
import { onMounted, ref } from 'vue';
import MultiSelect from 'primevue/multiselect';
import { useCompaniesStore } from '@/stores/companyStores';
import type { UserResponse } from '@/types/user'

const userStore = useUserStore();
const companyStore = useCompaniesStore();

const surname = ref('');
const firstName = ref('');
const email = ref('');
const department = ref<string | null>('');
const companies = ref<number[]>([]);

const props = defineProps<{
  employerId: number;
  close: () => void;
}>()

const employer = userStore.getUserById(props.employerId)

onMounted(() => {
  if (employer) {
    const clinicIds: number[] = (employer.clinics || [])
      .map(clinic => companyStore.getByNameState(clinic as string))
      .filter(c => c !== null)
      .map(clinic => clinic.id);

    surname.value = employer.lastName || '';
    firstName.value = employer.firstName || '';
    email.value = employer.email || '';
    department.value = employer.jobTitle || '';
    companies.value = clinicIds;
  }
})

const handleSubmit = async () => {
  console.log('submit')
  const u: UserResponse = {
    ...employer,
    firstName: firstName.value || employer!.firstName,
    lastName: surname.value || employer!.lastName,
    email: email.value || employer!.email,
    clinics: companies.value || [],
    jobTitle: department.value || employer!.jobTitle,
  }

  try {
    await userStore.updateEmployer(u);

    props.close();

  } catch (error) {
    console.error('Failed to create user:', error);
  }
};
</script>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
  padding: 45px 0;
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

.actions {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  margin-bottom: 1rem;
  justify-content: center
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

.create-button {
  font-size: 16px;
  padding: 8px 16px;
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
  background-color: rgba(0, 0, 0, .1);
  padding: 8px 16px;
  font-size: 14px;

  width: 350px;
}

.submit {
  width: 40px;
  height: 40px;
  border-radius: 99px;
  padding: 0;
  font-size: 14px;
}

.change-value {
  font-size: 24px;
}

.error-message {
  color: #fd4137;
  font-size: small;
}
</style>
