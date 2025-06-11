<template>
  <v-card :width="props.width" :max-width="props.maxWidth" :height="props.height" :max-height="props.maxHeight" :color="props.color" @click="goToProduct">
    <v-img :src="props.img" height="200" cover />

    <v-card-item>
      <v-card-title>{{ props.title }}</v-card-title>
      <v-card-subtitle> ราคา {{ props.price }} </v-card-subtitle>
    </v-card-item>

    <v-card-text class="multi-ellipsis">{{ props.text }}</v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  interface Props {
    id: string | number
    img?: string
    title?: string
    price?: number
    text?: string
    width?: string | number
    height?: string | number
    maxWidth?: string | number
    maxHeight?: string | number
    color?: string
  }
  interface Emits {
    goToProduct: [id: string | number]
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
.multi-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 60px;
  line-clamp: 3;
  box-orient: vertical;
}
</style>