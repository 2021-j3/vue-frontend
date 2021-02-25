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
    default_address: '',
  },
})

export const mutations = {
  // setCategoryList(state, CategoryList) {
  //   console.log(
  //     'store/CategoryList.js/mutations/setCategoryListList:\n',
  //     CategoryList
  //   )
}

export const actions = {
  createAccount(context, form) {
    this.$api
      .post('/accounts', form)
      .then((data) => data.data)
      .then((data) => {
        console.log('store/accounts.js actions/createAccount:\n', data)
        this.$router.push('/cart')
      })
      .catch((error) => {
        console.error('store/accounts.js actions/createAccount:\n', error)
      })
  },
}

export const getters = {}
