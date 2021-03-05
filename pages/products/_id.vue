<template>
  <!-- 1. view 이름을 클래스로 하는 최외곽 div 를 선언합니다-->
  <div class="product_item">
    <v-row>
      <v-col cols="10" offset="1">
        <v-breadcrumbs :items="categoryTree" divider="-"></v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="5" offset="1">
        <v-img
          v-if="!!product.thumbnail_path"
          :src="product.thumbnail_path"
        ></v-img>
        <v-img v-else src="https://placeimg.com/150/150/any"></v-img>
      </v-col>
      <v-col :cols="5">
        <!-- 카테고리, sku -->
        <div class="d-flex justify-space-between">
          <span class="product-tags">
            <v-chip v-for="(tag, index) in product.tags" :key="index" small>
              {{ tag.title }}
            </v-chip>
          </span>
          <span class="product-sku">{{ product.sku }}</span>
        </div>
        <!-- 제품 이름 -->
        <h1 class="product-name mt-3">{{ product.title }}</h1>
        <!-- 가격 -->
        <div v-if="product.discount_price !== 0" class="mt-4">
          <span class="product-price display-1">{{ discountedPrice }} 원</span>
          <span
            class="product-original-price text-decoration-line-through text--disabled"
          >
            {{ product.price }} 원
          </span>
        </div>
        <div v-else class="mt-4">
          <span class="product-price display-1">{{ product.price }} 원</span>
        </div>
        <!-- 설명 -->
        <div class="description mt-4">
          {{ product.content }}
        </div>
        <!-- 선택지 -->
        <v-layout class="options mt-4" justify-end>
          <v-row>
            <v-col cols="5" offset="4">
              <minus-plus
                :number="selectedQuantity"
                @update="onQuantityChanged"
              ></minus-plus>
            </v-col>
            <v-col cols="3">{{ totalPrice }} 원</v-col>
          </v-row>
        </v-layout>
        <!-- 장바구니, 구매 -->
        <v-layout justify-space-between>
          <v-spacer></v-spacer>
          <v-btn class="ma-1" x-large outlined @click="addItemToCart"
            >장바구니</v-btn
          >
          <v-btn class="ma-1" x-large color="indigo">바로구매</v-btn>
        </v-layout>
      </v-col>
      <v-col :cols="1"></v-col>
    </v-row>
    <v-row>
      <v-col cols="10" offset="1">
        <v-img :src="product.image_path"></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'ProductsId',
  // 로그인 불필요
  auth: false,
  computed: {
    product() {
      console.log(
        'pages/product-item.vue | computed/product/get() : 현재 상품=',
        this.$store.getters['productItem/getProduct']
      )
      return this.$store.getters['productItem/getProduct']
    },
    discountedPrice() {
      return this.$store.getters['productItem/getDiscountedPrice']
    },
    totalPrice() {
      return this.$store.getters['productItem/getTotalPrice']
    },
    selectedQuantity: {
      get() {
        return this.$store.getters['productItem/getSelectedQuantity']
      },
    },
    categoryTree() {
      return this.$store.getters['productItem/getCategoryTree']
    },
  },
  created() {
    // 최초 실행됨
    console.log(
      'products/_id.vue created:\n프로덕트 아이템뷰 생성됨 id =',
      this.$route.params.id
    )
    this.$store.dispatch('productItem/fetchProduct', this.$route.params.id)
  },
  methods: {
    onQuantityChanged(value) {
      this.$store.commit('productItem/SET_SELECTED_QUANTITY', value)
    },
    addItemToCart() {
      this.$store.dispatch('productItem/addToCart')
    },
  },
}
</script>

<style scoped></style>
