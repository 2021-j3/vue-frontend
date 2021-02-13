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
  setInformation(state, information) {
    console.log('information', information)
    state.products.push(information)
  },
}

export const actions = {
  loadInformation(context, id) {
    console.log('id is', id)
    this.$api
      .get('/products/' + id)
      .then((data) => data.data)
      .then((data) => {
        console.log('data', data)
        context.commit('setInformation', data)
      })
      .catch((error) => {
        console.log('custom error handler for product page', error)
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
}
