// cart

export const state = () => ({
  dummyCart: {
    cart_id: 0,
    session_id: 0,
    token: '',
    account: {
      // ... account
    },
    cart_items: [
      {
        title: 'dummy1',
        cart_item_id: 0,
        product_id: 1,
        cart_id: 1,
        thumbnailPath: '',
        sku: 0,
        price: 1502,
        discount_price: 200,
        quantity: 1,
        active: 1,
        content: '',
      },
      {
        title: 'dummy2',
        cart_item_id: 4,
        product_id: 2,
        cart_id: 1,
        thumbnailPath: '',
        sku: 0,
        price: 2500,
        discount_price: 500,
        quantity: 1,
        active: 1,
        content: '',
      },
    ],
    status: '',
    item_price_total: 0,
    item_discount: 0,
    tax: 0,
    shipping: 0,
    user_discount: 0,
    grand_total: 0,
    road_address: '',
  },
  cart: {
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
    if (cart === null) return
    state.cart = cart
    state.local_calculation.item_price_total = state.cart.item_price_total
    state.local_calculation.item_discount = state.cart.item_discount
    state.local_calculation.shipping = state.cart.shipping
  },
  SET_CART_ITEM_QUANTITY(state, { cartItemId, quantity }) {
    state.cart.cart_items = state.cart.cart_items.map((item) => {
      if (item.cart_item_id === cartItemId) item.quantity = quantity
      return item
    })
  },
  SET_SELECTED_CART_ITEMS(state, selectedList) {
    state.selected_cart_items = selectedList
  },
  DELETE_SELECTED_CART_ITEMS(state) {
    state.cart.cart_items = state.cart.cart_items.filter(
      (item, index) => !(index in state.selected_cart_items)
    )
    state.selected_cart_items = Object.assign({ ...[] })
  },
  TOGGLE_SELECTED_CART_ITEMS(state) {
    const FUNC_NAME = 'store/cart.js | mutations/TOGGLE_SELECTED_CART_ITEMS : '
    console.log(FUNC_NAME, '선택된 카트 아이템은=', state.selected_cart_items)
    if (state.selected_cart_items.length !== 0)
      state.selected_cart_items = Object.assign({ ...[] })
    else {
      console.log(
        FUNC_NAME,
        '카트 아이템즈의 타입은=',
        typeof state.cart.cart_items
      )
      state.selected_cart_items = state.cart.cart_items.map(
        (item) => item.cart_item_id
      )
    }
  },
  CALCULATE_PRICES(state) {
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
  },
}

export const actions = {
  fetchCart(context) {
    console.log(
      'store/cart.js actions/fetchCartFromServer:\nloggined:',
      this.$auth.loggedIn
    )
    if (this.$auth.loggedIn) {
      context.dispatch('fetchCartFromServer')
    }
  },

  fetchCartFromServer(context) {
    this.$apis
      .getMyCart()
      .then((data) => {
        console.log('store/cart.js actions/getCart:\n', data)
        context.commit('SET_CART', data)
        context.commit('TOGGLE_SELECTED_CART_ITEMS', data)
      })
      .catch((error) => {
        console.error('store/cart.js actions/getCart:\n', error)
      })
  },
  setCartItemQuantity(context, { cartItemId, quantity }) {
    context.commit('SET_CART_ITEM_QUANTITY', { cartItemId, quantity })
    context.commit('CALCULATE_PRICES')
  },
  setSelectedCartItem(context, selectedList) {
    context.commit('SET_SELECTED_CART_ITEMS', selectedList)
    context.commit('CALCULATE_PRICES')
  },
  deleteSelectedCartItems(context) {
    context.commit('DELETE_SELECTED_CART_ITEMS')
    context.commit('CALCULATE_PRICES')
  },
  toggleSelectedCartItems(context) {
    context.commit('TOGGLE_SELECTED_CART_ITEMS')
    context.commit('CALCULATE_PRICES')
  },
}

export const getters = {
  cart(state) {
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
