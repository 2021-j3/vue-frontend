// product.vue 에서 사용하는 store

export const state = () => ({
  defaultFilter: {
    query: null,
    minPrice: null,
    maxPrice: null,
    categories: null,
    tags: null,
    page: 1,
    size: 10,
    order: 'ASC',
    by: 'price',
  },
  currentFilter: {
    // 기본적인 검색 조건
    query: null, // string
    minPrice: null, // Number
    maxPrice: null, // Number
    categories: null, // Array
    tags: null, // Array
    // 페이지
    page: 1, // Number
    size: 10, // Number
    order: 'ASC', // ASC, DES
    by: 'price', // productId, title, price, createdAt
  },
  products: [],
  defaultPagination: {
    page: 1,
    last_page: 1,
  },
  pagination: {
    page: 1,
    last_page: 1,
  },
})

export const mutations = {
  /** 2021-02-19 penguin
   * 화면상으로 보이는 page 를 지정
   * @param state
   * @param page
   * @constructor
   */
  __SET_CURRENT_PAGE(state, pageData) {
    state.pagination.last_page = pageData.last_page
    state.pagination.page = pageData.current_page
    state.products = pageData.contents
    console.log('현재 페이지를 설정했습니다.', pageData, state.pagination)
  },
  /**
   * vue 업데이트 시 리스트에 다른 id를 부여하기 위해 사용
   * @param state
   * @private
   */
  __CLEAR_PRODUCTS(state) {
    console.log(
      'store/product.js mutations/__CLEAR_PRODUCTS:\n 상품을 모두 삭제'
    )
    state.products = Object.assign([])
    state.pagination = { ...state.defaultPagination }
  },
  /**
   * 새로운 조건으로 상품 목록을 가져옴
   * @param state
   * @param resultSet
   * @private
   */
  __APPEND_PRODUCTS(state, resultSet) {
    console.log('result is', resultSet.contents)
    state.products = resultSet.contents
    // let cnt = 0
    // let chunkIndex = state.products.length
    // state.products.push([])
    // for (const i in resultSet.contents) {
    //   if (i - cnt < state.pages.itemsPerPage) {
    //     state.products[chunkIndex].push(resultSet.contents[i])
    //   } else {
    //     cnt += state.pages.itemsPerPage
    //     chunkIndex += 1
    //     state.products[chunkIndex] = Object.assign([])
    //     state.products[chunkIndex].push(resultSet.contents[i])
    //   }
    // }
    // state.pages.currentMaxPage = chunkIndex
    // state.pages.lastPage = parseInt(resultSet.total / state.pages.itemsPerPage)
    // console.log(
    //   'store/product.js mutations/__APPEND_PRODUCTS:',
    //   '\nrequest:',
    //   arguments[1],
    //   '\nresult: ',
    //   state.pages
    // )
  },
  /**
   * dispatch 에서 생성한 조건을 store 에 저장함
   * @param state
   * @param query
   * @param minPrice
   * @param maxPrice
   * @param categories
   * @param tags
   * @param page
   * @param size
   * @param order
   * @param by
   * @private
   */
  __SET_CONDITIONS(
    state,
    { query, minPrice, maxPrice, categories, tags, page, size, order, by }
  ) {
    Object.entries(state.defaultFilter).forEach(([k, v]) => {
      state.currentFilter[k] =
        arguments[1][k] !== undefined ? arguments[1][k] : v
    })
    console.log(
      'store/product.js mutations/__SET_CONDITIONS:',
      '\nrequest:',
      arguments[1],
      '\nresult',
      state.currentFilter
    )
  },
}

export const actions = {
  setCondition(
    { state, commit, dispatch },
    { query, minPrice, maxPrice, categories, tags, page, size, order, by }
  ) {
    const newFilter = {}
    Object.entries(arguments[1]).forEach(([k, v]) => {
      newFilter[k] = v === undefined ? state.defaultFilter[k] : v
    })
    console.log('새로운 컨디션', newFilter)
    commit('__CLEAR_PRODUCTS')
    this.$router.push({ name: 'products', query: newFilter })
  },
  updateCondition(
    { state, commit, dispatch },
    { query, minPrice, maxPrice, categories, tags, page, size, order, by }
  ) {
    const updatedFilter = {}
    Object.entries(state.currentFilter).forEach(([k, v]) => {
      console.log(k, v)
      updatedFilter[k] =
        arguments[1][k] === undefined ? state.currentFilter[k] : arguments[1][k]
    })
    console.log('새로운 필터', updatedFilter)
    commit('__CLEAR_PRODUCTS')
    this.$router.push({ name: 'products', query: updatedFilter })
  },
  findProducts(
    context,
    { query, minPrice, maxPrice, categories, tags, page, size, order, by }
  ) {
    // const selectedPage = arguments[1].page === undefined ? 1 : arguments[1].page
    // arguments[1].size = // bulk loading size
    //   context.state.pages.visiblePages * context.state.pages.itemsPerPage
    // arguments[1].page = // bulk loading page
    //   parseInt((selectedPage - 1) / context.state.pages.visiblePages) + 1

    // const params = getRequestParam(arguments[1])
    this.$apis
      .getProductByQuery(
        { query, minPrice, maxPrice, categories, tags },
        { page, size, order, by }
      )
      // this.$api
      //   .get('/products?' + params)
      .then((data) => {
        // 페이지 복구
        console.log('여기 data 받았당', data, arguments[1])
        // arguments[1].page = selectedPage
        context.commit('__SET_CURRENT_PAGE', data)
        context.commit('__SET_CONDITIONS', arguments[1])
      })
      .catch((error) => {
        console.error('store/product.js actions/findProducts:\n', error)
      })
  },
  /** 2021-02-19 penguin
   * 화면상으로 보이는 page 를 지정
   * @param context
   * @param page
   * @constructor
   */
  setPage({ state, commit, dispatch }, page) {
    console.log(
      'store/product.js actions/setPage\n: 마우스 클릭에 의해 페이지 설정됨',
      arguments[1]
    )
    const newPageCondition = { ...state.currentFilter }
    newPageCondition.page = page
    dispatch('findProducts', newPageCondition).then(() => {
      commit('__SET_CURRENT_PAGE', page)
    })
  },
}

export const getters = {
  getProducts(state) {
    console.log(
      'store/product.js actions/getProducts:\n',
      state.pagination.page,
      state.products
    )
    return state.products
  },
  getQuery(state) {
    return state.currentFilter.query !== null ? state.currentFilter.query : ''
  },
  getOrderBy(state) {
    return state.currentFilter.order + '_' + state.currentFilter.by
  },
  getCurrentPage(state) {
    return state.pagination.page
  },
  getLastPage(state) {
    return state.pagination.last_page
  },
}
