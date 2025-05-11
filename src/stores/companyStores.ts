// stores/userStore.ts
import { defineStore } from 'pinia'
import { type User } from '@/types/user'
import { makeRequest } from '@/utils/makeRequest'
import type { Company } from '@/types/company'

interface CompaniesState {
  data: Company[]
  loading: boolean
  error: string | null
  selected: User | null
  statistic: CompanyStatistic | null
}

interface CompanyStatistic {
  users: number
  lemons: number
  diamonds: number
}

export const useCompaniesStore = defineStore('companies', {
  state: (): CompaniesState => ({
    data: [],
    loading: false,
    error: null,
    selected: null,
    statistic: null,
  }),

  getters: {
    // Get all users
    gelAllState: (state) => state.data,
    // Получить компанию по ID
    getByIdState: (state) => {
      return (id: number) => {
        return state.data.find((c) => c.id === id) || null
      }
    },
  },

  actions: {
    async fetch(offset = 0, limit = 200) {
      this.loading = true
      this.error = null
      try {
        this.data = await makeRequest<Company[]>(
          `clinics/find-by-name`,
          'get',
        )
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch companies'
      } finally {
        this.loading = false
      }
    },

    async search(searchParameter: string) {
      this.loading = true
      this.error = null
      try {
        this.data = await makeRequest<Company[]>(
          `clinics/find-by-param?searchParameter=${searchParameter}`,
          'get',
        )
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to search users'
      } finally {
        this.loading = false
      }
    },

    async getStatistic() {
      this.loading = true
      this.error = null

      try {
        this.statistic = await makeRequest<CompanyStatistic>(`clinics/get-all-stat`, 'get')
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch stat'
      } finally {
        this.loading = false
      }
    },

    async updateById(id: number, wallet: { currency: number;  comment: string }) {
      this.loading = true
      this.error = null

      try {
        const response = await makeRequest<Company>(`clinics/currency/${id}`, 'put', {
          currency: wallet.currency,
          comment: wallet.comment,
        })

        if (response && response.id) {
          const userId = response.id
          const index = this.data.findIndex((c: Company) => c.id === userId)
          if (index !== -1) {
            this.data[index] = { ...this.data[index], ...response }
          }
        }

        await this.fetch()
        await this.getStatistic()

        return response
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to update wallet'
      } finally {
        this.loading = false
      }
    },

    async getById(id: number) {
      this.loading = true
      this.error = null

      try {
        return await makeRequest<Company>(`clinics/${id}`, 'get')
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to get user '
      } finally {
        this.loading = false
      }
    },

    async deactivateById(id: number) {
      this.loading = true
      this.error = null

      try {
        const response = await makeRequest<Company>(`clinics/status/${id}`, 'put', {
          isActive: false,
        })

        await this.fetch()
        await this.getStatistic()

        return response
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to deactivate employer '
      } finally {
        this.loading = false
      }
    },

    async add(user: Omit<User, 'id' | 'isActive'>) {
      this.loading = true
      this.error = null

      try {
        const response = await makeRequest<Company>(`clinics`, 'post', user)

        await this.fetch()
        await this.getStatistic()

        return response
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to create employer '
      } finally {
        this.loading = false
      }
    },

    async multipleAccrual({
      userIds,
      currency,
      count,
      comment,
    }: {
      userIds: number[]
      currency: string
      count: number
      comment: string
    }) {
      this.loading = true
      this.error = null

      try {
        const response = await makeRequest<Company>(`clinics/multiple-currency`, 'put', {
          userIds,
          currency,
          count,
          comment,
        })

        await this.fetch()
        await this.getStatistic()

        return response
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to update employers '
      } finally {
        this.loading = false
      }
    },
  },
})
