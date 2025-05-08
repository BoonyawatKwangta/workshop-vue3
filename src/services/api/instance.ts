import axios from 'axios'

export const instance = axios.create({
  // baseURL: https://fakestoreapi.com/
  baseURL: `${import.meta.env.VITE_APP_BASE_URL}/`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})