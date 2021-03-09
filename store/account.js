// account

export const state = () => ({
  // 상태를 표현하는 변수
  account: {
    email: '',
    first_name: '',
    last_name: '',
    gender: '',
    birthday: '',
    phone_number: '',
    account_type: '',
  },
})

export const mutations = {
  SET_ACCOUNT(state, item) {
    state.account = Object.assign({ ...item })
  },
  SET_EMAIL(state, value) {
    state.account.email = value
  },
  SET_PASSWORD(state, value) {
    state.account.password = value
  },
  SET_NEW_PASSWORD(state, value) {
    state.account.new_password = value
  },
  SET_LAST_NAME(state, value) {
    state.account.last_name = value
  },
  SET_FIRST_NAME(state, value) {
    state.account.first_name = value
  },
  SET_ACCOUNT_TYPE(state, value) {
    state.account.account_type = value
  },
  SET_PHONE_NUMBER(state, value) {
    state.account.phone_number = value
  },
  SET_GENDER(state, value) {
    state.account.gender = value
  },
  SET_BIRTHDAY(state, value) {
    state.account.birthday = value
  },
}

export const actions = {
  createAccount(context, form) {
    this.$api
      .post('/accounts', form)
      .then((data) => {
        console.log('store/accounts.js | actions/createAccount : ', data)
        this.$apis.fetchCart()
        this.$router.push('/auth/login')
      })
      .catch((error) => {
        console.error('store/accounts.js | actions/createAccount :', error)
      })
  },
  fetchAccount(context) {
    this.$apis.getMyAccount().then((data) => {
      context.commit('SET_ACCOUNT', data)
    })
  },
}

export const getters = {
  getEmail(state) {
    return state.account.email
  },
  getPassword(state) {
    return state.account.password
  },
  getNewPassword(state) {
    return state.account.new_password
  },
  getLastName(state) {
    return state.account.last_name
  },
  getFirstName(state) {
    return state.account.first_name
  },
  getAccountType(state) {
    return state.account.account_type
  },
  getPhoneNumber(state) {
    return state.account.phone_number
  },
  getGender(state) {
    return state.account.gender
  },
  getBirthday(state) {
    return state.account.birthday
  },
  getAccount(state) {
    return state.account
  },
}
