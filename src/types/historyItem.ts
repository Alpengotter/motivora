export interface HistoryItem {
  id: number
  userId: number | null
  adminId: number
  date: string
  type: string
  comment: string
  orderId: number | null
  currency: string
  value: number
  clinicId: number | null
}
