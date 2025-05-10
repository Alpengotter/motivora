export interface User {
  id: number
  firstName: string
  lastName: string
  jobTitle: string | null
  clinics: string[]
  email: string
  lemons: number
  diamonds: number
  userRole: string
  isActive: boolean
}
