// cart

export const state = () => ({
  cart: {
    cart_id: -1,
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
  selected_cart_items: [],
  local_calculation: {
    item_price_total: 0,
    item_discount: 0,
    shipping: 0,
  },
})

export const mutations = {
  SET_CART(state, cart) {
    // state.cart = cart
    const FUNC_NAME = 'store/cart.js | mutations/SET_CART : '
    console.log(FUNC_NAME, '새로운 카트의 내용은=', cart)
    // state.cart = Object.assign({ ...state.dummyCart })
    state.cart = cart
    state.local_calculation.item_price_total = state.cart.item_price_total
    state.local_calculation.item_discount = state.cart.item_discount
    state.local_calculation.shipping = state.cart.shipping
  },
  __SET_CART_ITEM_QUANTITY(state, { cartItemId, quantity }) {
    state.cart.cart_items = state.cart.cart_items.map((item) => {
      if (item.cart_item_id === cartItemId) item.quantity = quantity
      return item
    })
  },
  __SET_SELECTED_CART_ITEMS(state, selectedList) {
    state.selected_cart_items = selectedList
  },
  __TOGGLE_SELECTED_CART_ITEMS(state) {
    const FUNC_NAME =
      'store/cart.js | mutations/__TOGGLE_SELECTED_CART_ITEMS : '
    console.log(FUNC_NAME, '선택된 카트 아이템은=', state.selected_cart_items)
    if (state.selected_cart_items.length !== 0) state.selected_cart_items = []
    else {
      console.log(
        FUNC_NAME,
        '카트 아이템즈의 타입은=',
        typeof state.cart.cart_items
      )
      state.selected_cart_items = state.cart.cart_items.map(
        (item, index) => index
      )
      console.log('선택결과', state.selected_cart_items)
    }
  },
  __CALCULATE_PRICES(state) {
    const selected = state.cart.cart_items.filter(
      (item, index) => index in state.selected_cart_items
    )
    state.local_calculation.item_price_total = 0
    state.local_calculation.item_discount = 0
    selected.map((item) => {
      state.local_calculation.item_price_total += item.price * item.quantity
      state.local_calculation.item_discount +=
        item.discount_price * item.quantity
      return null
    })
    console.log(
      'store/cart.js | mutations/__CALCULATE_PRICES : 로컬에서 계산됨=',
      JSON.stringify(state.local_calculation)
    )
  },
  // 로컬 카트에서 호출됨
  ADD_ITEM_TO_CART(state, item) {
    state.cart.cart_items.push(item)
  },
  // 로컬 카트에서 호출됨
  DELETE_SELECTED_CART_ITEMS(state) {
    state.cart.cart_items = state.cart.cart_items.filter(
      (item, index) => !(index in state.selected_cart_items)
    )
    state.selected_cart_items = []
  },
}

export const actions = {
  fetchCart(context) {
    console.log(
      'store/cart.js | actions/fetchCart : 로그인 상태=',
      this.$auth.loggedIn
    )
    if (this.$auth.loggedIn) {
      context.dispatch('__fetchCartFromServer')
    } else {
      context.dispatch('__fetchLocalCart')
    }
  },

  __fetchCartFromServer(context) {
    this.$apis
      .getMyCart()
      .then((data) => {
        console.log('store/cart.js actions/getCart:\n', data)
        context.commit('SET_CART', data)
        context.commit('__TOGGLE_SELECTED_CART_ITEMS')
      })
      .catch((error) => {
        console.error('store/cart.js actions/getCart:\n', error)
      })
  },
  __fetchLocalCart(context) {
    const localCart = context.rootGetters['localCart/localCart']
    console.log(
      'store/cart.js | actions/__fetchLocalCart : 로컬 카트 불러옴=',
      localCart
    )
    context.commit('SET_CART', localCart)
    context.commit('__TOGGLE_SELECTED_CART_ITEMS')
  },
  setCartItemQuantity(context, { cartItemId, quantity }) {
    context.commit('__SET_CART_ITEM_QUANTITY', { cartItemId, quantity })
    context.commit('__CALCULATE_PRICES')
  },
  setSelectedCartItem(context, selectedList) {
    context.commit('__SET_SELECTED_CART_ITEMS', selectedList)
    context.commit('__CALCULATE_PRICES')
  },
  deleteSelectedCartItems(context) {
    if (!this.$auth.loggedIn) {
      context
        .dispatch(
          'localCart/deleteSelectedCartItems',
          context.state.selected_cart_items,
          { root: true }
        )
        .then(() => {
          context.commit('__CALCULATE_PRICES')
        })
    } else {
      context.commit('DELETE_SELECTED_CART_ITEMS')
      context.commit('__CALCULATE_PRICES')
    }
  },
  toggleSelectedCartItems(context) {
    context.commit('__TOGGLE_SELECTED_CART_ITEMS')
    context.commit('__CALCULATE_PRICES')
  },
  /**
   * 카트에 상뭎믕 담는다
   * @param context
   * @param item { Object }
   * @Param item.product_id { Number }
   * @Param item.title { String }
   * @Param item.thumbnail_path { String }
   * @Param item.price { Number }
   * @Param item.discount_price { Number }
   * @Param item.quantity { Number }
   * * */
  addItemToCart({ dispatch, commit, state }, item) {
    // 간소화된 상품->카트아이템 로직
    console.warn(
      'store/cart | actions/addItemToCart : FIXME: 간소화된 카트아이템 객체를 사용하고 있습니다.'
    )
    const cartItem = Object.assign({ ...item.product })
    cartItem.quantity = item.quantity
    console.log('store/cart | actions/addItemToCart : 새로운 아이템=', cartItem)
    if (!this.$auth.loggedIn) {
      console.log(
        'store/cart.js | actions/addItemToCart : ',
        '로그인 안됨, 로컬 카트에 추가=',
        cartItem
      )
      dispatch('localCart/addToCart', cartItem, {
        root: true,
      })
    } else if (state.cart.cart_id !== -1) {
      this.$apis.addItemToCart(state.cart.cart_id, item)
    } else {
      console.error(
        'store/cart.js | actions/addItemToCart : 로그인 되었으나, cart가 없습니다',
        'TODO 카트가 없는 경우 카트를 만들 수 있게 해주어야 합니다'
      )
    }
  },
}

export const getters = {
  cart(state) {
    console.log('store/cart.js | getters/cart : 현재카트=', state.cart)
    return state.cart
  },
  numberOfCartItems(state) {
    return state.cart.cart_items.length
  },
  selectedCartItems(state) {
    return state.selected_cart_items
  },
  noItemsSelected(state) {
    return state.selected_cart_items.length === 0
  },
  allItemsSelected(state) {
    return state.selected_cart_items.length === state.cart.cart_items.length
  },
  item_price_total(state) {
    return state.local_calculation.item_price_total
  },
  item_discount(state) {
    return state.local_calculation.item_discount
  },
  shipping(state) {
    return state.local_calculation.shipping
  },
  final_price(state) {
    return (
      state.local_calculation.item_price_total -
      state.local_calculation.item_discount
    )
  },
  shippingAddress(state) {
    console.log(
      'store/cart.js | getters/shippingAddress : TODO: 주소필드를 조합하여 하나의 주소로 만들어서 돌려줘야 합니다'
    )
    return state.cart.road_address
  },
}
