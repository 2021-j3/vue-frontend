<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    @submit.prevent="submitHandler"
  >
    <v-text-field
      v-model="formData.email"
      :rules="emailRules"
      label="이메일"
      required
    ></v-text-field>

    <v-text-field
      v-model="formData.password"
      :rules="requiredRules"
      label="패스워드"
      type="password"
      required
    ></v-text-field>

    <v-btn :disabled="!valid" type="submit"> 로그인 </v-btn>
    <v-btn :disabled="!valid" :to="{ path: '/auth/register' }">
      회원가입
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'LoginForm',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    onsubmit: { type: Function },
  },
  data: () => ({
    valid: true,
    requiredRules: [(v) => !!v || '필수 입력항목입니다'],
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    formData: {
      email: '',
      password: '',
    },
  }),

  methods: {
    submitHandler(event) {
      this.onsubmit({ ...this.formData })
    },
  },
}
</script>

<style scoped></style>
