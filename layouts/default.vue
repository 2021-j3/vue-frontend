<template>
  <v-app>
    <VueNavigation></VueNavigation>
    <v-main>
      <HeaderCommercial />
      <!--        서치 바-->
      <Header :key="loggedIn" />
      <!--        서치 바 끝-->
      <nuxt class="mt-10" />
    </v-main>
  </v-app>
</template>

<script>
import VueNavigation from '@/components/VueNavigation'
import HeaderCommercial from '@/components/HeaderCommercial'
import Header from '@/components/Header'

export default {
  name: 'Default',
  component: {
    HeaderCommercial,
    VueNavigation,
    Header,
  },
  computed: {
    loggedIn() {
      return this.$auth.loggedIn
    },
  },
}
</script>
