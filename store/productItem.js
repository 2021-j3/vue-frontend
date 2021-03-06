// product.vue 에서 사용하는 store

export const state = () => ({
  dummyProduct: {
    product_id: null,
    account: null,
    title: '[연결 실패] 서버 연결 실패 했습니당]',
    metaTitle: '',
    slug: '#',
    sku: 'sku_number_1314',
    price: 48451,
    discount_price: 9,
    thumbnail_path: 'https://dummyimage.com/150x150/000/ffae.png',
    imagePath: 'https://dummyimage.com/800x2160/000/ffae.png',
    content: '',
    createdAt: null,
    updatedAt: null,
    startsAt: null,
    endsAt: null,
    categories: [],
    tags: [
      {
        category_id: 1945,
        content: '',
        meta_title: 'meta information',
        parent_id: null,
        slug: '/tags/1945',
        title: '연결실패 카테고리',
      },
      {
        category_id: 1234,
        content: '',
        meta_title: 'meta information',
        parent_id: null,
        slug: '/tags/1234',
        title: 'product가 없습니다',
      },
    ],
  },
  selectedItem: {
    product: {},
    quantity: 1,
  },
  dummyCategoryTree: [
    { category_id: 1, title: '카테고리' },
    { category_id: 2, title: '서브카테고리' },
  ],
})

export const mutations = {
  SET_PRODUCT_ITEM(state, product) {
    console.log('store/productItem.js | mutations/SET_PRODUCT_ITEM :', product)
    state.selectedItem.product = product
    state.selectedItem.quantity = 1
  },
  SET_SELECTED_QUANTITY(state, quantity) {
    state.selectedItem.quantity = quantity
  },
}

export const actions = {
  /**
   * 검색 결과를 불러오는 메소드
   * @param context
   * @param id
   */
  fetchProduct(context, id) {
    console.log('store/productItem.js | actions/fetchProductItem :id is', id)
    this.$apis
      .getProductById(id)
      .then((data) => {
        console.log(
          'store/productItem.js | actions/fetchProductItem : 데이터는',
          data
        )
        context.commit('SET_PRODUCT_ITEM', data)
      })
      .catch((error) => {
        console.error('store/product.js | actions/fetchProductItem :', error)
      })
  },
  /**
   * 현재 상품을 카트에 넣습니다
   * @param context
   */
  addToCart(context) {
    const item = context.state.selectedItem
    console.log(
      'store/productItem.js | actions/addToCart : 상품을 장바구니에 추가합니다=',
      item
    )
    context.dispatch('cart/addItemToCart', item, { root: true })
  },
}

export const getters = {
  // 계산된 속성을 반환하는 메소드
  // getStatus(state) { return '{status: ' + state.status + '}' }
  getProduct(state) {
    console.log(
      'store/productItem.js | actions/getProductItem :',
      state.selectedItem.product
    )
    if (
      state.selectedItem.product !== undefined &&
      state.selectedItem.product !== null
    )
      return state.selectedItem.product
    return state.dummyProduct
  },
  getFinalPrice(state) {
    const FUNC_NAME = 'store/productItem.js | actions/getDiscountedPrice :'
    console.log(
      FUNC_NAME,
      '가격',
      state.selectedItem.product.price,
      '할인',
      state.selectedItem.product.discountPrice
    )
    return (
      state.selectedItem.product.price -
      state.selectedItem.product.discount_price
    )
  },
  getTotalPrice(state, getters) {
    if (
      state.selectedItem.product !== undefined &&
      state.selectedItem.product !== null
    )
      return state.selectedItem.quantity * getters.getFinalPrice
    console.warn(
      'store/productItems | getters/getTotalPrice : TODO: 인터넷 연결이 끊어졌습니다 페이지를 생성해야 합니다 '
    )
    return state.selectedItem.quantity * state.dummyProduct.price
  },
  getSelectedQuantity(state) {
    return state.selectedItem.quantity
  },
  getCategoryTree(state) {
    return state.dummyCategoryTree.map((v) => {
      return { text: v.title, href: 'categories/' + v.category_id }
    })
  },
}
