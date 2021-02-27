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
}

export const actions = {
  createAccount(context, form) {
    this.$api
      .post('/accounts', form)
      .then((data) => {
        console.log('store/accounts.js actions/createAccount:\n', data)
        this.$router.push('/auth/login')
      })
      .catch((error) => {
        console.error('store/accounts.js actions/createAccount:\n', error)
      })
  },
  fetchAccount(context) {
    this.$api.get('/account/my').then((data) => {
      context.commit('SET_ACCOUNT', data)
    })
  },
  // deleteAccount(context, form){
  //   this.$api.delete('/accounts/my', form).then(()=>{
  //     this.$router.push('/')
  //   })
  // },
}

export const getters = {
  account(state) {
    return state.account
  },
}
