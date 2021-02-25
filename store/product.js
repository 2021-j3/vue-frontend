// product.vue 에서 사용하는 store

export const state = () => ({
  products: [],
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
  selected: {
    quantity: 1,
  },
  dummyCategoryTree: [
    { category_id: 1, title: '카테고리' },
    { category_id: 2, title: '서브카테고리' },
  ],
})

export const mutations = {
  SET_PRODUCT(state, product) {
    console.log('store/product.js/mutations/SET_PRODUCTS:\n', product)
    state.products = []
    state.products.push(product)
  },
  SET_SELECTED_QUANTITY(state, quantity) {
    state.selected.quantity = quantity
  },
}

export const actions = {
  /**
   * 검색 결과를 불러오는 메소드
   * @param context
   * @param id
   */
  fetchProduct(context, id) {
    console.log('store/product.js/actions/getProduct:\nid is', id)
    this.$api
      .get('/products/' + id)
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

export const getters = {
  // 계산된 속성을 반환하는 메소드
  // getStatus(state) { return '{status: ' + state.status + '}' }
  getProduct(state) {
    console.log('store/product.js actions/getProduct:\n', state.products[0])
    if (state.products[0] !== undefined && state.products[0] !== null)
      return state.products[0]
    console.log('good')
    return state.dummyProduct
  },
  getDiscountedPrice(state) {
    return state.products.price - state.products.discount_price
  },
  getTotalPrice(state) {
    if (state.products[0] !== undefined && state.products[0] !== null)
      return state.selected.quantity * state.products[0].price
    console.log('good')
    return state.selected.quantity * state.dummyProduct.price
  },
  getSelectedQuantity(state) {
    return state.selected.quantity
  },
  getCategoryTree(state) {
    return state.dummyCategoryTree.map((v) => {
      return { text: v.title, href: 'categories/' + v.category_id }
    })
  },
}
