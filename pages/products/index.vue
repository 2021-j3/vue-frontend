<template>
  <div class="products">
    <v-layout row>
      <v-flex d-flex>
        <ProductCard
          v-for="(item, index) in products"
          :key="index"
          :title="item.title"
          :content="item.content"
          :slug="item.slug"
          :thumbnail-path="item.thumbnailPath"
          class="pa-2"
          col="6"
        ></ProductCard>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import ProductCard from '@/components/ProductCard'
export default {
  name: 'Products',
  component: {
    ProductCard,
  },
  computed: {
    products(state) {
      return this.$store.getters['product/getProductList']
    },
  },
  created() {
    const queries = this.$route.query
    console.log('pages/products/index.vue/created\n', queries)
    this.$store.dispatch('product/loadProductList', queries)
  },
}
</script>
