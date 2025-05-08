import { instance } from '../instance'
import { handleApiError } from '../helpers'

export default {
  async getAll<T>(): Promise<T[]> {
    try {
      const response = await instance.get<T[]>('/products')
      return response.data
    } catch (err) {
      handleApiError(err, 'getAll')
    }
  },
  async getById<T>(id: string): Promise<T[]> {
    try {
      const response = await instance.get<T[]>(`/products/${id}`)
      return response.data
    } catch (err) {
      handleApiError(err, 'getById')
    }
  },
}