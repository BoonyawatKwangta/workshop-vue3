<template>
  <p> Product {{ route.params.id }}</P>
  <v-img :src="product.image" /> 
</template>

<script setup lang="ts">
  import productApi from '@/services/api/features/product.ts'

  const route = useRoute()

  const product = ref([])
  async function getProduct () {
    const response = await productApi.getById(route.params.id)
    product.value = response
    console.log('5555', response)
  }

  onMounted(() => {
    // ยิง API Get Product by ID
    getProduct()
  })
</script>

<style scoped>
</style>