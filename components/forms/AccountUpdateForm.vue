<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    @submit.prevent="submitHandler"
  >
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="* 이메일"
      required
      @input="$emit('update:email', $event)"
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="requiredRules"
      label="* 패스워드"
      type="password"
      required
    ></v-text-field>

    <!--    <v-text-field-->
    <!--      v-model="new_password"-->
    <!--      :rules="requiredRules"-->
    <!--      label="새로운 패스워드"-->
    <!--      type="password"-->
    <!--      required-->
    <!--    ></v-text-field>-->

    <v-text-field
      v-model="last_name"
      :rules="requiredRules"
      :counter="10"
      label="* 성"
      required
    ></v-text-field>

    <v-text-field
      v-model="first_name"
      :rules="requiredRules"
      :counter="10"
      label="* 이름"
      required
    ></v-text-field>

    <v-select
      v-model="account_type"
      :items="accountTypeOptions"
      :rules="requiredRules"
      label="* 어카운트 타입"
      required
    ></v-select>

    <v-text-field
      v-model="phone_number"
      :rules="requiredRules"
      :counter="10"
      label="*휴대폰 번호"
      required
    ></v-text-field>

    <v-select v-model="gender" :items="genderOptions" label="성별"></v-select>

    <v-text-field v-model="birthday" :counter="10" label="생일"></v-text-field>

    <v-btn :disabled="!valid" class="mr-4" type="submit">갱신</v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'AccountUpdateForm',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    onsubmit: { type: Function },
  },
  sync: [
    'email',
    'password',
    'new_password',
    'last_name',
    'first_name',
    'account_type',
    'phone_number',
    'gender',
    'birthday',
  ],
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
