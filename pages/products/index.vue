<template>
  <div class="products">
    <v-row>
      <v-col cols="1" class="ma-0 pa-0"> </v-col>
      <v-col cols="10">
        <v-layout row>
          <v-btn-toggle v-model="orderBy" color="yellow" group>
            <v-btn value="ASC_price">낮은 가격순</v-btn>
            <v-btn value="DES_price">높은 가격순</v-btn>
            <v-btn value="DES_purchased">판매량순</v-btn>
            <v-btn value="DES_createdAt">최신순</v-btn>
          </v-btn-toggle>
        </v-layout>
        <v-layout row>
          <ProductCard
            v-for="item in products"
            :key="item.product_id"
            :title="item.title"
            :content="item.content"
            :slug="item.slug"
            :thumbnail-path="item.thumbnail_path"
            :price="item.price"
            :discount-price="item.discount_price"
            class="pa-2"
            col="2"
          ></ProductCard>
        </v-layout>
        <v-row justify="center">
          <v-col cols="10">
            <v-container class="max-width">
              <v-pagination
                v-model="page"
                class="my-4"
                :length="lastPage"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
  </div>
</template>
<script>
import ProductCard from '@/components/ProductCard'
export default {
  name: 'Products',
  // 로그인 불필요
  auth: false,
  component: {
    ProductCard,
  },
  computed: {
    products() {
      const items = this.$store.getters['products/getProducts']
      console.log('products.vue | products.get():\n제품:', items)
      return items
    },
    orderBy: {
      get() {
        return this.$store.getters['products/getOrderBy']
      },
      set(value) {
        const orderBy = value.split('_')
        this.$store.dispatch('products/updateCondition', {
          page: 0,
          order: orderBy[0],
          by: orderBy[1],
        })
      },
    },
    page: {
      get() {
        return this.$store.getters['products/getCurrentPage']
      },
      set(value) {
        this.$store.dispatch('products/setPage', value)
      },
    },
    lastPage() {
      console.log(
        'products.vue | computed/lastPage/get() : 마지막 페이지는=',
        this.$store.getters['products/getLastPage']
      )
      const lastPageNum = this.$store.getters['products/getLastPage']
      return lastPageNum
    },
  },
  watch: {
    $route(to, from) {
      console.log('products.vue | updated : 쿼리=', to.query)
      this.setAllConditions()
    },
  },
  created() {
    console.log('products.vue | created : 쿼리=', this.$route.query)
    this.setAllConditions()
  },
  methods: {
    setAllConditions() {
      this.$store.dispatch('products/setCondition', {
        query: this.$route.query.query,
        minPrice: this.$route.query.minPrice,
        maxPrice: this.$route.query.maxPrice,
        categories: this.$route.query.categories,
        tags: this.$route.query.tags,
        page: this.$route.query.page,
        size: this.$route.query.size,
        order: this.$route.query.order,
        by: this.$route.query.by,
      })
    },
    updateMinPrice(minPrice) {
      this.$store.dispatch('products/updateCondition', { minPrice })
    },
    updateMaxPrice(maxPrice) {
      this.$store.dispatch('products/updateCondition', { maxPrice })
    },
    updateCategories(categories) {
      this.$store.dispatch('products/updateCondition', { categories })
    },
    updateTags(tags) {
      this.$store.dispatch('products/updateCondition', { tags })
    },
    updatePage(page) {
      this.$store.dispatch('products/updateCondition', { page })
    },
    updateSize(size) {
      this.$store.dispatch('products/updateCondition', { size })
    },
  },
}
</script>
