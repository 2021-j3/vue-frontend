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
          v-if="!!product.thumbnailPath"
          src="https://placeimg.com/150/150/any"
        ></v-img>
        <v-img v-else src="product.thumbnailPath"></v-img>
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
        <div class="mt-4">
          <span class="product-price display-1">{{ product.price }}원</span>
          <span
            class="product-original-price text-decoration-line-through text--disabled"
          >
            {{ product.price }}원
          </span>
        </div>
        <!-- 설명 -->
        <div class="description mt-4">
          {{ product.content }}
        </div>
        <!-- 선택지 -->
        <v-layout class="options mt-4" justify-end>
          <v-flex xs2>
            <v-text-field
              v-model="selectedQuantity"
              outlined
              hide-details
              class="expand ma-0 pa-0"
              dense
              type="number"
              width="1"
              min="1"
            ></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs3 align-self-center
            ><span>{{ totalPrice }} 원</span>
          </v-flex>
        </v-layout>
        <!-- 장바구니, 구매 -->
        <v-layout justify-space-between>
          <v-spacer></v-spacer>
          <v-btn class="ma-1" x-large outlined>장바구니</v-btn>
          <v-btn class="ma-1" x-large color="indigo">바로구매</v-btn>
        </v-layout>
      </v-col>
      <v-col :cols="1"></v-col>
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
      return this.$store.getters['product/getProduct']
    },
    totalPrice() {
      return this.$store.getters['product/getTotalPrice']
    },
    selectedQuantity: {
      get() {
        return this.$store.getters['product/getSelectedQuantity']
      },
      set(value) {
        this.$store.commit('product/SET_SELECTED_QUANTITY', value)
      },
    },
    categoryTree() {
      return this.$store.getters['product/getCategoryTree']
    },
  },
  created() {
    // 최초 실행됨
    this.$store.dispatch('product/fetchProduct', this.$route.params.id)
  },
}
</script>

<style scoped></style>
