<template>
  <div class="login">
    <v-row>
      <v-col cols="4" offset="4">
        <v-card color="cyan">
          <v-card-title>로그인</v-card-title>
          <login-form :onsubmit="onsubmit" class="pa-5"></login-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'AuthLogin',
  methods: {
    onsubmit(value) {
      // const array = new Uint32Array(10)
      // this.$store.commit('myAuth/SET_TOKEN_NAME', this.window.crypto)
      console.log('click login')
      // this.$store.dispatch('myAuth/login', value)
      this.$store.dispatch('token/login', value)
    },
  },
}
</script>

<style scoped></style>
