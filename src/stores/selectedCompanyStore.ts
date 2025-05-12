import type { User } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Company } from '@/types/company'

export const useSelectedCompanyStore = defineStore('selectedCompany', () => {
  const selectedItems = ref<Company[]>([])

  return { selectedItems }
})
