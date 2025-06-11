<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <div class="text-center">
          <v-icon :size="mdAndUp ? 180 : 64" icon="mdi-alert-circle-outline" color="error" />
          <p class="text-h4 text-md-h1 mb-4"> 404 </p>
          <p class="text-h6 text-md-h4 mb-4"> ไม่พบหน้านี้ </p>
          <v-btn color="primary" @click="goHome" text="กลับสู่หน้าแรก" variant="flat" :size="mdAndUp ? 'large' : 'small'" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  const router = useRouter()
  const { mdAndUp } = useDisplay()
  function goHome () {
    router.push({ name: 'HomeView' })
  }
</script>

<style scoped>
</style>