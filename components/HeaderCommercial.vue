<template>
  <div class="header">
    <v-card :color="commercial.color" :href="commercial.href">
      <v-img
        v-if="commercial.image"
        :src="commercial.image"
        height="100"
        contain
      ></v-img>
      <v-textarea v-else :label="commercial.text" height="100"></v-textarea>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'HeaderCommercial',
  data() {
    return {
      commercial: {
        image: 'https://dummyimage.com/1500x200/db7033/00ffae.png',
        text: '광고광고광고',
        href: '#',
        color: 'orange',
      },
    }
  },
}
</script>

<style scoped></style>
