<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    @submit.prevent="submitHandler"
  >

    <v-select
      v-model="formData.rate"
      :items="rateOptions"
      :rules="requiredRules"
      label="* 어카운트 타입"
      required
    ></v-select>

    <v-text-field
      v-model="formData.title"
      :rules="requiredRules"
      label="제목"
      required
    ></v-text-field>

    <v-text-field
      v-model="formData.content"
      :rules="requiredRules"
      label="내용"
      type="content"
      required
    ></v-text-field>

    <v-btn :disabled="!valid" type="submit"> 로그인</v-btn>
    <v-btn :disabled="!valid" :to="{ path: '/auth/register' }">
      회원가입
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'CreateReview',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    onsubmit: { type: Function },
  },
  data: () => ({
    valid: true,
    requiredRules: [(v) => !!v || '필수 입력항목입니다'],
    rateOptions: ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'],
    formData: {
      rate: '',
      title: '',
      content: '',
    },
  }),

  methods: {
    submitHandler(event) {
      const result = { ...this.formData }
      result.rate = result.rate.length
      this.onsubmit(result)
    },
  },
}
</script>

<style scoped></style>
