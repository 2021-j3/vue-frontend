<template>
  <div class="products">
    <v-layout row wrap>
      <v-flex v-for="p in products" md6> </v-flex>
      <ProductCard :product="p"></ProductCard>
    </v-layout>
    <!--    <product-card></product-card>-->
  </div>
</template>
<script>
import ProductCard from '@/components/ProductCard'
export default {
  name: 'Product',
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
