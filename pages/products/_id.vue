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
    <p>
      <span>이미지{{ product.imagePath }}</span>
    </p>
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
      태그<span v-for="tag in product.tags" :key="tag.tag_id">{{
        tag.title
      }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Id',
  computed: {
    product(state) {
      return this.$store.getters['product/getProduct']
    },
  },
  mounted() {
    // 최초 실행됨
    this.$store.dispatch('product/loadInformation', this.$route.params.id)
  },
}
</script>

<style scoped></style>
