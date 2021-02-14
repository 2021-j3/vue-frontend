<template>
  <v-app dark>
    <VueNavigation></VueNavigation>
    <v-main>
      <HeaderCommercial />
      <!--        서치 바-->
      <Header />
      <!--        서치 바 끝-->
      <v-container>
        <nuxt />
      </v-container>
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
}
</script>
