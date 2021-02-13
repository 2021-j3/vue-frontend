<template>
  <div class="product-card">
    <v-card class="mx-auto-my-12" :href="slugValue">
      <v-img height="150" width="150" :src="thumbnailPathValue"></v-img>
      <v-card-title>{{ titleValue }}</v-card-title>
      <v-card-text>
        <div>
          {{ contentValue }}
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
  },
  data() {
    return {
      slugValue: '',
      thumbnailPathValue: 'https://placeimg.com/150/150/any',
      titleValue: 'title',
      contentValue: 'content',
    }
  },
  created() {
    console.log('components/ProductCard.vue/created:\n', this.title)
    this.$data.slugValue = this.slug
    this.$data.thumbnailPatValueh = this.thumbnailPath
    this.$data.titleValue = this.title
    this.$data.contentValue = this.content
  },
}
</script>

<style scoped></style>
