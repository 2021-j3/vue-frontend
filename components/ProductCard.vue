<template>
  <div class="product-card">
    <v-card class="mx-auto-my-12" :to="this.$props.slug">
      <v-img height="150" width="150" :src="this.$props.thumbnailPath"></v-img>
      <v-card-title class="py-1">{{ this.$props.title }}</v-card-title>
      <v-card-text class="pb-2">
        <div v-if="discountPrice !== 0" class="product-price">
          <p class="mb-1">
            - {{ discountPercent }} %
            <span
              class="product-original-price text-decoration-line-through text--disabled"
            >
              {{ this.$props.price }}원
            </span>
          </p>
          <h2 class="product-price">{{ priceAfterDiscount }}원</h2>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    slug: { type: String, default: '' },
    thumbnailPath: { type: String, default: '' },
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    price: { type: Number, default: 0 },
    discountPrice: { type: Number, default: 0 },
  },
  computed: {
    discountPercent() {
      return parseInt((this.$props.discountPrice / this.$props.price) * 100)
    },
    priceAfterDiscount() {
      return this.$props.price - this.$props.discountPrice
    },
  },
  created() {
    console.log(this.$props)
  },
}
</script>

<style scoped></style>
