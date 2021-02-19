<template>
  <!-- 1. view 이름을 클래스로 하는 최외곽 div 를 선언합니다-->
  <div class="product_item">
    <p>
      <span>상품이름: {{ product.title }}</span>
    </p>
    <p>
      <span>상품코드: {{ product.sku }}</span>
    </p>
    <p>
      <span>상품가격{{ product.price }}</span>
    </p>
    <p>
      <span>할인비율{{ product.discountRate }}%</span>
    </p>
    <p>
      <span>썸네일{{ product.thumbnailPath }}</span>
    </p>
    <p></p>
    <p>
      <span>콘텐츠{{ product.content }}</span>
    </p>
    <p>
      <span>생성일{{ product.createdAt }}</span>
    </p>
    <p>
      <span>갱신일{{ product.updatedAt }}</span>
    </p>
    <p>
      <span>판매시작{{ product.startsAt }}</span>
    </p>
    <p>
      <span>판매종료{{ product.endsAt }}</span>
    </p>
    <p>
      카테고리<span
        v-for="category in product.categories"
        :key="category.category_id"
        >{{ category.title }}</span
      >
    </p>
    <p>
      태그<span v-for="(tag, index) in product.tags" :key="index">{{
        tag.title
      }}</span>
    </p>
    <v-row>
      <v-col cols="6">
        <img :src="product.imagePath" alt="product description" />
      </v-col>
      <v-col cols="6"> </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'ProductsId',
  computed: {
    product() {
      return this.$store.getters['product/getProduct']
    },
  },
  created() {
    // 최초 실행됨
    this.$store.dispatch('product/fetchProduct', this.$route.params.id)
  },
}
</script>

<style scoped></style>
