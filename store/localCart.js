export const state = () => {
  return {
    localCart: {
      cart_id: 0,
      session_id: 0,
      token: '',
      account: {
        // ... account
      },
      cart_items: [],
      status: '',
      item_price_total: 0,
      item_discount: 0,
      tax: 0,
      shipping: 0,
      user_discount: 0,
      grand_total: 0,
      road_address: '',
    },
  }
}

export const mutations = {
  DELETE_SELECTED_LOCAL_CART_ITEMS(state, selectedCartItems) {
    state.localCart.cart_items = state.localCart.cart_items.filter(
      (item, index) => !(index in selectedCartItems)
    )
    console.log(
      'store/localCart.js | mutations/ADD_ITEM_TO_LOCAL_CART',
      '로컬 카트에 아이템 삭제됨=',
      state.localCart.cart_items
    )
  },
  ADD_ITEM_TO_LOCAL_CART(state, item) {
    state.localCart.cart_items.push(item)
    console.log(
      'store/localCart.js | mutations/ADD_ITEM_TO_LOCAL_CART',
      '로컬 카트에 아이템 추가됨=',
      state.localCart.cart_items
    )
  },
}

export const actions = {
  addToCart(context, cartItem) {
    // 상품이 아직 서버에 등록되지 않았음을 음수로 표시했습니다
    cartItem.cart_item_id = parseInt(Math.random() * 10000) * -1
    console.warn(
      'store/localCart.js | actions/addToCart "TODO: 서버에 아직 등록되지 않은 아이템은 id가 음수입니다 이를 사용하여 서버에 등록하고 삭제하는 기능을 구현해야 합니다"',
      cartItem
    )
    context.commit('ADD_ITEM_TO_LOCAL_CART', cartItem)
    // context.commit('cart/ADD_ITEM_TO_CART', cartItem, { root: true })
  },
  deleteSelectedCartItems(context, selectedCartItems) {
    return new Promise((resolve) => {
      context.commit('DELETE_SELECTED_LOCAL_CART_ITEMS', selectedCartItems)
      context.commit('cart/DELETE_SELECTED_CART_ITEMS', null, { root: true })
    })
  },
}
export const getters = {
  token(state) {
    return state.token
  },
  localCart(state) {
    return state.localCart
  },
}
