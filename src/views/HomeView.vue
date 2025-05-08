<template>
  <v-carousel>
    <v-carousel-item
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      cover
    ></v-carousel-item>

    <v-carousel-item
      src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
      cover
    ></v-carousel-item>

    <v-carousel-item
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      cover
    ></v-carousel-item>
  </v-carousel>
  <v-container>
    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="4" lg="3">
        <product-card 
          :id="product.id"
          :img="product.image"
          :title="product.title"
          :price="product.price"
          @goToProduct="goToProduct"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import ProductCard from '@/components/cards/ProductCard.vue'
  import productApi from '@/services/api/features/product.ts'

  const router = useRouter()

  function goToProduct (id: string) {
    router.push({
      name: 'ProductView',
      params: { id }
    })
    console.log('id', id)
  }

  const products = ref([])
  async function getProducts () {
    const response = await productApi.getAll()
    products.value = response
    console.log(response)
  }

  onMounted(() => {
    // ยิง API Get Products
    getProducts()
  })
</script>

<style lang="scss" scoped>
</style>
