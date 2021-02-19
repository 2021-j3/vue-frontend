// product.vue 에서 사용하는 store

export const state = () => ({
  products: [],
  dummyProduct: {
    product_id: null,
    account: null,
    title: '서버 연결 실패',
    metaTitle: '',
    slug: '#',
    sku: '',
    price: '',
    discountRate: '',
    thumbnailPath: '',
    imagePath: 'https://dummyimage.com/800x2160/000/ffae.png',
    content: '',
    createdAt: null,
    updatedAt: null,
    startsAt: null,
    endsAt: null,
    categories: null,
    tags: null,
  },
})

export const mutations = {
  SET_PRODUCT(state, product) {
    console.log('store/product.js/mutations/SET_PRODUCTS:\n', product)
    state.products = []
    state.products.push(product)
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
    console.log('store/product.js/actions/getProduct:\n', state.products)
    if (state.products.length > 0) return state.products[0]
    else return state.dummyProduct
  },
}
