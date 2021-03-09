<!--<template>-->
<!--  <v-form :value="valid" lazy-validation @submit.prevent="submitHandler">-->
<!--    <v-text-field-->
<!--      :value="email"-->
<!--      :rules="emailRules"-->
<!--      label="* 이메일"-->
<!--      required-->
<!--      @input="$emit('update:email', $event.target.value)"-->
<!--    ></v-text-field>-->

<!--    <v-text-field-->
<!--      :value="password"-->
<!--      :rules="requiredRules"-->
<!--      label="* 패스워드"-->
<!--      type="password"-->
<!--      required-->
<!--      @input="$emit('update:password', $event.target.value)"-->
<!--    ></v-text-field>-->

<!--    <v-text-field-->
<!--      :value="new_password"-->
<!--      :rules="requiredRules"-->
<!--      label="새로운 패스워드"-->
<!--      type="password"-->
<!--      required-->
<!--      @input="$emit('update:new_password', $event.target.value)"-->
<!--    ></v-text-field>-->

<!--    <v-text-field-->
<!--      :value="last_name"-->
<!--      :rules="requiredRules"-->
<!--      :counter="10"-->
<!--      label="* 성"-->
<!--      required-->
<!--      @input="$emit('update:last_name', $event.target.value)"-->
<!--    ></v-text-field>-->

<!--    <v-text-field-->
<!--      :value="first_name"-->
<!--      :rules="requiredRules"-->
<!--      :counter="10"-->
<!--      label="* 이름"-->
<!--      required-->
<!--      @input="$emit('update:first_name', $event.target.value)"-->
<!--    ></v-text-field>-->

<!--    <v-select-->
<!--      :value="account_type"-->
<!--      :items="accountTypeOptions"-->
<!--      :rules="requiredRules"-->
<!--      label="* 어카운트 타입"-->
<!--      required-->
<!--      @input="$emit('update:account_type', $event.target.value)"-->
<!--    ></v-select>-->

<!--    <v-text-field-->
<!--      :value="phone_number"-->
<!--      :rules="requiredRules"-->
<!--      :counter="10"-->
<!--      label="*휴대폰 번호"-->
<!--      required-->
<!--      @input="$emit('update:phone_number', $event.target.value)"-->
<!--    ></v-text-field>-->

<!--    <v-select-->
<!--      :value="gender"-->
<!--      :items="genderOptions"-->
<!--      label="성별"-->
<!--      @input="$emit('update:gender', $event.target.value)"-->
<!--    >-->
<!--    </v-select>-->

<!--    <v-text-field-->
<!--      :value="birthday"-->
<!--      :counter="10"-->
<!--      label="생일"-->
<!--      @input="$emit('update:birthday', $event.target.value)"-->
<!--    >-->
<!--    </v-text-field>-->

<!--    <v-btn v-btn :disabled="!valid" class="mr-4" type="submit"> 갱신</v-btn>-->
<!--  </v-form>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'AccountUpdateForm',-->
<!--  props: {-->
<!--    // eslint-disable-next-line vue/require-default-prop-->
<!--    onsubmit: { type: Function },-->
<!--    email: { type: String },-->
<!--    password: { type: String },-->
<!--    new_password: { type: String },-->
<!--    last_name: { type: String },-->
<!--    first_name: { type: String },-->
<!--    account_type: { type: String },-->
<!--    phone_number: { type: String },-->
<!--    gender: { type: String },-->
<!--    birthday: { type: String },-->
<!--  },-->
<!--  data: () => ({-->
<!--    valid: true,-->
<!--    requiredRules: [(v) => !!v || '필수 입력항목입니다'],-->
<!--    emailRules: [-->
<!--      (v) => !!v || 'E-mail is required',-->
<!--      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',-->
<!--    ],-->
<!--    accountTypeOptions: ['USER', 'SELLER'],-->
<!--    genderOptions: ['MALE', 'FEMALE'],-->
<!--  }),-->

<!--  methods: {-->
<!--    submitHandler(event) {-->
<!--      console.log('버튼 눌렀어영 ')-->
<!--      // this.onsubmit({ ...this.formData })-->
<!--    },-->
<!--  },-->
<!--}-->
<!--</script>-->

<!--<style scoped></style>-->
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

    <v-btn :disabled="!valid" class="mr-4" type="submit"> 등록 </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'AccountUpdateForm',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    onsubmit: { type: Function },
    curData: {
      type: Object,
      default: () => {
        return {
          email: '',
          password: '',
          new_password: '',
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
    formData: {},
  }),
  created() {
    this.formData = Object.assign({ ...this.$props.curData })
  },

  methods: {
    submitHandler(event) {
      this.onsubmit({ ...this.formData })
    },
  },
}
</script>

<style scoped></style>
