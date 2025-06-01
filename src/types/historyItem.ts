export interface HistoryItem {
  id: number
  user: {
    firstName: string,
    lastName: string,
    surname: string
  } | null;
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
