<template>
  <v-app>
    <VueNavigation></VueNavigation>
    <v-main>
      <HeaderCommercial />
      <!--        서치 바-->
      <Header :key="loggedIn" :number-of-cart-items="numberOfCartItems" />
      <!--        서치 바 끝-->
      <nuxt class="mt-10" />
    </v-main>
  </v-app>
</template>

<script>
import VueNavigation from '@/components/VueNavigation'
import HeaderCommercial from '@/components/HeaderCommercial'
import Header from '@/components/Navigations/Header'

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
    numberOfCartItems() {
      return this.$store.getters['cart/numberOfCartItems']
    },
  },

  created() {
    this.$store.dispatch('cart/fetchCartFromServer', 0)
    console.log(
      'default.vue created:\n ' + 'cart/fetchCart currently DOES NOT CALLED'
    )
    this.$store.commit('cart/SET_CART', null)
    this.$store.commit('TOGGLE_SELECTED_CART_ITEMS', [])
  },
}
</script>
