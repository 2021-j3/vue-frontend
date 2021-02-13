<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="callApi">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
export default {
  components: {
    Logo,
    VuetifyLogo,
  },
  methods: {
    callApi() {
      console.log(this.$axios)
      this.$api.get('accounts/1').then((response) => {
        console.log(response)
      })
    },
  },
}
</script>
