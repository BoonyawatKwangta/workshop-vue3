<template>
  <v-carousel height="calc(100vh - 64px)" hide-delimiters>
    <v-carousel-item v-for="carousel in carousels" :key="carousel.id" :src="carousel.src" cover />
  </v-carousel>
  <v-container class="py-6">
    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
        <product-card 
          :id="product.id"
          :img="product.image"
          :title="product.title"
          :price="product.price"
          :text="product.description"
          height="354"
          @goToProduct="goToProduct"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import ProductCard from '@/components/cards/ProductCard.vue'
  import productApi from '@/services/api/features/product.ts'
  import { type Product } from '@/models/product'

  const router = useRouter()
  const carousels = ref([
    { id: 1, src: 'https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg' },
    { id: 2, src: 'https://images.pexels.com/photos/17474932/pexels-photo-17474932.jpeg' },
    { id: 3, src: 'https://images.pexels.com/photos/2923595/pexels-photo-2923595.jpeg' }
  ])

  function goToProduct (id: string | number) {
    router.push({
      name: 'ProductPage',
      params: { id }
    })
  }

  const products = ref<Product[]>()
  async function getProducts () {
    const response = await productApi.getAll<Product[]>()
    products.value = response
  }

  onMounted(() => {
    // ยิง API Get Products
    getProducts()
  })
</script>

<style lang="scss" scoped>
</style>
