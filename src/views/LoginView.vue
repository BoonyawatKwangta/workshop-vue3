<template>
  <v-card
    class="mx-auto my-12"
    max-width="374"
  >
    <v-card-item>
      <v-card-title class="text-center"> Login </v-card-title>
    </v-card-item>

    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="username"
          :rules="usernameRules"
          label="Outlined"
          variant="outlined"
        />
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Outlined"
          variant="outlined"
          type="password"
        />
      </v-form>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-actions>
      <v-btn
        color="deep-purple-lighten-2"
        text="Login"
        block
        border
        @click="login"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
  import authApi from '@/services/api/features/auth.ts'

  interface LoginBody {
    username: string
    password: string
  }
  interface LoginRes {
    token: string
  }

  const username = ref('')
  const password = ref('')
  const form = useTemplateRef('form')
  const usernameRules = ref([
    v => !!v || 'Name is required'
  ])
  const passwordRules = ref([
    v => !!v || 'Name is required'
  ])

  async function login () {
    try {
      const { valid } = await form!.value!.validate()
      if (valid) {
        const body = { username: username.value, password: password.value }
        const response = await authApi.login<LoginBody, LoginRes>(body)
        // ไม่ปลอดภัย ต้องเข้ารหัส
        localStorage.setItem('auth_token', response.token)
      }
    } catch (error) {
      alert(error)
    }
  }
</script>

<style lang="scss" scoped>
</style>
