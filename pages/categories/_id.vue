<template>
  <div class="category_item mt-4">
    <div class="categories">
      <ul v-for="(item, index) in selectedCategory" :key="index">
        <li>{{ item.title }}</li>
      </ul>
    </div>
    <products />
  </div>
</template>
<script>
import Products from '@/pages/products'

export default {
  name: 'CategoriesId',
  components: { Products },
  computed: {
    selectedCategory() {
      return this.$store.getters['category/getCategory']
    },
  },
  created() {},
}
</script>

<style scoped></style>
