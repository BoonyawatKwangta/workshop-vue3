import { instance } from '../instance'
import { handleApiError } from '../helpers'

export default {
  async login<TBody, TRes>(body: TBody): Promise<TRes> {
    try {
      const response = await instance.post<TRes>('auth/login', body)
      return response.data
    } catch (err) {
      handleApiError(err, 'login')
    }
  }
}