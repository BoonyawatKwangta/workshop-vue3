<template>
  <v-container class="fill-height">
    <template v-if="product">
      <v-row>
        <v-col cols="4">
          <div class="d-flex justify-center">
            <v-img :src="product.image" width="300" height="300" />
          </div>
        </v-col>
        <v-col>
          <div class="text-h6">
            <p>
              <span class="font-weight-bold mr-3">ชื่อสินค้า: </span>
              <span>{{ product.title }}</span>
            </p>
            <p>
              <span class="font-weight-bold mr-3">ราคา: </span>
              <span>{{ product.price }}</span>
            </p>
            <v-btn class="my-4">
              <v-icon start> mdi-cart-outline </v-icon>
              <span> เพิ่มเข้าตะกร้า </span>
            </v-btn>
            <p>
              <span class="font-weight-bold mr-3">รายละเอียด: </span>
              <span>{{ product.description }}</span>
            </p>
          </div>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script setup lang="ts">
  import productApi from '@/services/api/features/product.ts'
  import { type Product } from '@/models/product'

  const route = useRoute()

  const product = ref<Product | null>(null)
  async function getProduct () {
    const response = await productApi.getById<Product>(route.params.id as string)
    product.value = response
  }

  onMounted(() => {
    // ยิง API Get Product by ID
    getProduct()
  })
</script>

<style scoped>
</style>