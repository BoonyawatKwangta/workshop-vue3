<template>
  <v-card
    class="mx-auto"
    max-width="344"
    @click="goToProduct"
  >
    <v-img
      :src="props.img"
      height="200px"
      cover
    ></v-img>

    <v-card-title>{{ props.title }}</v-card-title>

    <v-card-subtitle>
      ราคา {{ props.price }}
    </v-card-subtitle>

    <v-card-text>
      {{ props.text }}
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  interface Props {
    id?: string
    img?: string
    title?: string
    price?: number
    text?: string
  }
  interface Emits {
    goToProduct: [id: string]
  }

  const props = withDefaults(defineProps<Props>(), {
    img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
    title: 'Title',
    price: 0,
    text: 'Text'
  })
  const emits = defineEmits<Emits>()

  function goToProduct() {
    emits('goToProduct', props.id)
  }
</script>

<style scoped>
</style>