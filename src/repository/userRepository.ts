import { UserModel } from '../models/UserModel'
import { DBOperation } from './dbOperation'

export class UserRepository extends DBOperation {
  async registerUser({
    email,
    password,
    salt,
    firstName,
    lastName
  }: UserModel) {
    const query =
      'INSERT INTO users (email, password, salt, firstName, lastName) VALUES (?,?,?,?,?)'
    const values = [email, password, salt, firstName, lastName]

    const results = await this.executeQuery<UserModel[]>(query, values)

    return results?.[0]
  }

  async findAccount(email: string) {
    const query = 'SELECT * FROM users WHERE email = ?'
    const values = [email]

    const results = await this.executeQuery<UserModel[]>(query, values)

    return results?.[0]
  }
}
