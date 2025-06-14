import vuetify from './vuetify'
import router from './router'
import store from './stores'
import { type App } from 'vue'

export const registerPlugins = (app: App): void => {
  app.use(vuetify)
  app.use(router)
  app.use(store)
}

