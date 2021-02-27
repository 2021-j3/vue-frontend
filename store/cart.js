// cart

export const state = () => ({
  // 상태를 표현하는 변수
  defaultCart: {
    cart_items: [],
    session_id: '',
    token: '',
    status: '',
    item_price_total: '',
  },
  localCart: {},
})

export const mutations = {
  // setCategoryList(state, CategoryList) {
  //   console.log(
  //     'store/CategoryList.js/mutations/setCategoryListList:\n',
  //     CategoryList
  //   )
}

export const actions = {
  fetchCart(context) {
    if (this.$auth.loggedIn) {
      context.dispatch('fetchCartFromServer')
    }
  },

  fetchCartFromServer(context, id) {
    console.log('store/product.js/actions/getProduct:\nid is', id)
    this.$api
      .get('/cart/my')
      .then((data) => data.data)
      .then((data) => {
        console.log('store/product.js/actions/getProduct:\n', data)
        context.commit('SET_PRODUCT', data)
      })
      .catch((error) => {
        console.error('store/product.js/actions/getProduct:\n', error)
      })
  },
}

export const getters = {}
