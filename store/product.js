// product.vue 에서 사용하는 store

export const state = () => ({
  // 상태를 표현하는 변수
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
  setProduct(state, product) {
    console.log('store/product.js/mutations/setProductList:\n', product)
    state.products = []
    state.products.push(product)
  },
  setProductList(state, products) {
    console.log('store/product.js/mutations/setProductList:\n', products)
    state.products = []
    for (const i in products) {
      console.log('product list is ', products[i])
      state.products.push(products[i])
    }
  },
}

export const actions = {
  loadProduct(context, id) {
    console.log('store/product.js/actions/loadProduct:\nid is', id)
    this.$api
      .get('/products/' + id)
      .then((data) => data.data)
      .then((data) => {
        console.log('store/product.js/actions/loadProduct:\n', data)
        context.commit('setProduct', data)
      })
      .catch((error) => {
        console.error('store/product.js/actions/loadProduct:\n', error)
      })
  },
  loadProductList(context, queries) {
    console.log(
      'store/product.js/actions/loadProductList:\n',
      'query is',
      queries
    )
    this.$api
      .get('/products')
      .then((data) => data.data)
      .then((data) => {
        console.log('store/product.js/actions/loadProductList:\n', data)
        context.commit('setProductList', data)
      })
      .catch((error) => {
        console.error('store/product.js/actions/loadProductList:\n', error)
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
  getProductList(state) {
    console.log('store/product.js/actions/getProductList:\n', state.products)
    return state.products
  },
}
