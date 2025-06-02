import type { User } from '@/types/user'

export interface HistoryItem {
  id: number
  user: User | null;
  adminId: number
  date: string
  type: string
  comment: string
  orderId: number | null
  currency: string
  value: number
  clinic: {
    name: string
  } | null
}
