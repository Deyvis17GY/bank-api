import { connection } from '../utility/db'

export class DBOperation {
  async executeQuery<T>(query: string, values: unknown[]): Promise<T> {
    return new Promise((resolve, reject) => {
      connection.query(query, values, (error, result) => {
        if (error) {
          console.error('Error in database', error)

          reject(error)
        }

        resolve(result) as unknown as T
      })
    })
  }
}
