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

export const actions = {}

export const getters = {}
