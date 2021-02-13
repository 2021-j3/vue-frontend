<template>
  <div class="product-card">
    <v-card class="mx-auto-my-12" @click="product.slug">
      <v-img height="250" :src="product.thumbnailPath"></v-img>
      <v-card-title>{{ product.title }}</v-card-title>
      <v-card-text>
        <div>
          {{ product.content }}
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      product_id: null,
      account: null,
      title: '문구같은걸 적으면 좋음',
      metaTitle: '',
      slug: '',
      sku: '',
      price: '',
      discountRate: '',
      thumbnailPath: '',
      imagePath: '',
      content: '',
      createdAt: null,
      updatedAt: null,
      startsAt: null,
      endsAt: null,
      categories: null,
      tags: null,
    },
  },
}
</script>

<style scoped></style>
