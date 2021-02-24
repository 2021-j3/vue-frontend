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
  name: 'Login',
  methods: {
    onsubmit(value) {
      console.log('click login')
      this.$auth.loginWith('local', { data: value }).then((response) => {
        console.log('then login')
        // this.$auth.setUser(response.data)
        this.$axios.setToken(response.data.token)
        console.log('login', response)
      })
    },
  },
}
</script>

<style scoped></style>
