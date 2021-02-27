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
      label="* 이메일"
      required
    ></v-text-field>

    <v-text-field
      v-model="formData.password"
      :rules="requiredRules"
      label="* 패스워드"
      type="password"
      required
    ></v-text-field>

    <v-text-field
      v-model="formData.last_name"
      :rules="requiredRules"
      :counter="10"
      label="* 성"
      required
    ></v-text-field>

    <v-text-field
      v-model="formData.first_name"
      :rules="requiredRules"
      :counter="10"
      label="* 이름"
      required
    ></v-text-field>

    <v-select
      v-model="formData.account_type"
      :items="accountTypeOptions"
      :rules="requiredRules"
      label="* 어카운트 타입"
      required
    ></v-select>

    <v-text-field
      v-model="formData.phone_number"
      :rules="requiredRules"
      :counter="10"
      label="*휴대폰 번호"
      required
    ></v-text-field>

    <v-select
      v-model="formData.gender"
      :items="genderOptions"
      label="성별"
    ></v-select>

    <v-text-field
      v-model="formData.birthday"
      :counter="10"
      label="생일"
    ></v-text-field>

    <v-btn :disabled="!valid" class="mr-4" type="submit"> 등록</v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'RegisterForm',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    onsubmit: { type: Function },
    formData: {
      type: Object,
      default() {
        return {
          email: '',
          password: '',
          last_name: '',
          first_name: '',
          account_type: null,
          phone_number: null,
          gender: null,
          birthday: null,
        }
      },
    },
  },
  data: () => ({
    valid: true,
    requiredRules: [(v) => !!v || '필수 입력항목입니다'],
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    accountTypeOptions: ['USER', 'SELLER'],
    genderOptions: ['MALE', 'FEMALE'],
  }),

  methods: {
    submitHandler(event) {
      this.onsubmit({ ...this.formData })
    },
  },
}
</script>

<style scoped></style>
