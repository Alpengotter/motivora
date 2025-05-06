export interface User {
  id: number
  firstName: string
  lastName: string
  jobTitle: string | null
  companyId: number
  email: string
  lemons: number
  diamonds: number
  userRole: string
  isActive: boolean
}
