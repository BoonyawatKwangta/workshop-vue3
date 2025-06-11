<template>
  <v-container class="fill-height">
    <v-card class="mx-auto align-self-center" width="280" rounded="lg">
      <v-card-item class="pt-4 px-4 pb-0">
        <v-card-title class="text-center"> Login </v-card-title>
      </v-card-item>
  
      <v-card-text class="pa-4">
        <v-form ref="form">
          <v-row no-gutters>
            <v-col class="pb-0" cols="12">
              <v-text-field
                v-model="username"
                :rules="usernameRules"
                label="Username"
                variant="outlined"
                density="compact"
                hide-details="auto"
              />
            </v-col>
            <v-col class="pt-4 pb-0" cols="12">
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Password"
                variant="outlined"
                type="password"
                density="compact"
                hide-details="auto"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      
      <v-divider class="mx-4 mb-4" />

      <v-card-actions class="pt-0 px-4 pb-4">
        <v-btn color="deep-purple-lighten-2" text="Login" block border @click="login" />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  import authApi from '@/services/api/features/auth.ts'

  interface LoginBody {
    username: string
    password: string
  }
  interface LoginResponse {
    token: string
  }

  const username = ref('')
  const password = ref('')
  const form = useTemplateRef('form')
  const authStore = useAuthStore()
  const usernameRules = ref([
    (v: string) => !!v || 'Name is required'
  ])
  const passwordRules = ref([
    (v: string) => !!v || 'Name is required'
  ])

  async function login () {
    try {
      const { valid } = await form!.value!.validate()
      if (valid) {
        const body = { username: username.value, password: password.value }
        const response = await authApi.login<LoginBody, LoginResponse>(body)
        authStore.setup(response.token)
      }
    } catch (error) {
      alert(error)
    }
  }
</script>

<style lang="scss" scoped>
</style>
