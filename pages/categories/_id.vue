<template>
  <div class="category_item mt-4">
    <v-row>
      <v-col cols="10" offset="1">
        <v-breadcrumbs :items="categories" divider="-"></v-breadcrumbs>
      </v-col>
    </v-row>
    <products />
  </div>
</template>
<script>
import Products from '@/pages/products'

export default {
  name: 'CategoriesId',
  // 로그인 불필요
  auth: false,
  components: { Products },
  computed: {
    selectedCategory() {
      return this.$store.getters['category/getCategory']
    },
    categories() {
      return this.$store.getters['categories/getCategoryTree']
    },
  },
  created() {},
}
</script>

<style scoped></style>
