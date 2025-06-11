
import { createPinia } from 'pinia'
import { useAuthStore } from '@/plugins/stores/auth'

import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

export { useAuthStore }
export default pinia