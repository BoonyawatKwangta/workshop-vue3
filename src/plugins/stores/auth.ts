import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {

  // States
  const _ssAcT = ref('')

  // Actions (ชั่วคราว ไม่ปลอดภัย)
  function setup (token: string) {
    _ssAcT.value = token
  }
  function clear () {
    _ssAcT.value = ''
  }

  return { _ssAcT, setup, clear }
}, {
  persist: {
    key: 'ss_rulyBxww23',
    storage: localStorage,
    pick: ['_ssAcT']
  }
})
