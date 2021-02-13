// product.vue 에서 사용하는 store

export const state = () => ({
  // 상태를 표현하는 변수
  products: [],
  dummyProduct: {
    product_id: null,
    account: null,
    title: '문구같은걸 적으면 좋음',
    metaTitle: '',
    slug: '',
    sku: '',
    price: '',
    discountRate: '',
    thumbnailPath: '',
    imagePath: '',
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
  setProduct(state, information) {
    console.log('store/product.js/mutations/setProductList:\n', information)
    state.products.push(information)
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
    console.log('store/product.js/actions/loadProduct:\n', 'query is', queries)
    const id = 1
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
}

export const getters = {
  // 계산된 속성을 반환하는 메소드
  // getStatus(state) { return '{status: ' + state.status + '}' }
  getProduct(state) {
    if (state.products.length > 0) return state.products[0]
    else return state.dummyProduct
  },
  getProductList(state) {
    if (state.products.length > 0) return state.products
    else return state.dummyProduct
  },
}
