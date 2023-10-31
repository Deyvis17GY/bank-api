export interface UserModel {
  userId?: number
  email: string
  password: string
  salt: string
  firstName?: string
  lastName?: string
}
