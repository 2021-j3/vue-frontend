<template>
  <v-app dark>
    <VueNavigation></VueNavigation>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import VueNavigation from '@/components/VueNavigation'
export default {
  component: {
    VueNavigation,
  },
}
</script>
