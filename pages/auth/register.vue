<template>
  <div class="register">
    <v-row>
      <v-col cols="10" offset="1">
        <v-card color="cyan">
          <v-card-title>회원가입</v-card-title>
          <register-form :onsubmit="onsubmit" class="pa-5"></register-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Register',
  // 로그인 불필요
  auth: false,
  data: () => ({}),

  methods: {
    onsubmit(value) {
      console.log(value)
      this.$store.dispatch('account/createAccount', value)
    },
  },
}
</script>

<style scoped></style>
