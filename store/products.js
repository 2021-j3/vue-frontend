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
  // products: [],
  // defaultPagination: {
  //   page: 1,
  //   last_page: 1,
  // },
  initial_page: {
    items: [],
    page: 1,
    last_page: 1,
    total: 0,
  },
  current_page: {
    items: [],
    page: 1,
    last_page: 1,
    total: 0,
  },
  // 캐시 데이터
  cache: {
    lastQuery: {},
    lastPagination: {},
    items: [],
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
    state.current_page.last_page = pageData.last_page
    state.current_page.page = pageData.page
    // state.products = pageData.contents
    state.current_page.items = pageData.items
    state.current_page.total = pageData.total
    console.log('현재 페이지를 설정했습니다.', pageData, state.current_page)
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
    state.current_page = { ...state.initial_page }
  },
  __SET_CACHE_ITEMS(state, cacheProducts) {
    // state.cache.items = Object.assign(...{})
    state.cache.items = cacheProducts
  },
  __SET_CACHE_ITEMS_META_INFO(state, { query, bulkLoadPagination }) {
    console.log(
      'store/product.js | mutation/SET_CACHE_ITEMS_META_INFO : 메타정보를 받았습니다',
      state.cache,
      query,
      bulkLoadPagination
    )
    state.cache.lastQuery = query
    state.cache.lastPagination = bulkLoadPagination
    console.log(
      'store/product.js | mutation/SET_CACHE_ITEMS_META_INFO : 메타정보를 저장했습니다',
      state.cache
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
    console.log(
      'store/product.js | actions/setCondition : 새로운 필터 지정됨',
      newFilter
    )
    dispatch('findProducts', {
      query: { query, minPrice, maxPrice, categories, tags },
      pagination: { page, size, order, by },
    })
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
    commit('__CLEAR_PRODUCTS')
    console.log(
      'store/product.js | actions/updateCondition : 추가적인 필터를 적용함',
      updatedFilter,
      '현재 페이지',
      this.$router.currentRoute
    )
    this.$router.push({
      path: this.$router.currentRoute.path,
      query: updatedFilter,
    })
  },
  /**
   * 상품을 검색한다
   * @typedef query             { Object } 검색 쿼리
   * @Param query.query       { String } 검색어
   * @Param query.minPrice    { Number } 최소 가격
   * @Param query.maxPrice    { Number } 최대 가격
   * @Param query.categories  { Number[] } 카테고리 아이디 목록
   * @Param query.tags        { Number[] } 태그 아이디 목록
   * @Param pagination            { Object } 페이지 정보
   * @Param pagination.pages       { Number=1 } 페이지 번호
   * @Param pagination.size        { Number=10 } 페이지당 로딩 사이즈
   * @Param pagination.order       { String="product_id" } 정렬 방법
   * @Param pagination.by          { ('ASC'|'DES')='ASC' } 정렬 방향
   */
  findProducts(context, { query, pagination }) {
    const FUNC_NAME = 'store/product.js | action/findProduct :'
    console.log(FUNC_NAME, '매개변수', arguments)
    // 파라미터 기본값 부여
    if (!pagination.page || pagination.page < 1) pagination.page = 1
    if (!pagination.size) pagination.size = 10
    if (!pagination.order) pagination.order = 'ASC'
    if (!pagination.by) pagination.by = 'productId'

    // 벌크 로드 게산
    const bulkSize = 10
    const bulkLoadPagination = {
      page: parseInt((pagination.page - 1) / bulkSize) * bulkSize + 1,
      size: pagination.size * bulkSize,
      order: pagination.order,
      by: pagination.by,
    }
    // 캐시 데이터 로드 후 현재 페이지 지정
    return new Promise((resolve) => {
      if (
        JSON.stringify(query) ===
          JSON.stringify(context.state.cache.lastQuery) &&
        JSON.stringify(bulkLoadPagination) ===
          JSON.stringify(context.state.cache.lastPagination)
      )
        resolve(context.getters.__getCacheItems)
      else {
        console.log(FUNC_NAME, '캐시에 해당 데이터가 없습니다')
        console.table([query, context.state.cache.lastQuery])
        console.table([bulkLoadPagination, context.state.cache.lastPagination])
        console.log(FUNC_NAME, 'bulk 페이지 정보', query, bulkLoadPagination)
        this.$apis.getProductByQuery(query, bulkLoadPagination).then((data) => {
          const cachedProducts = Object.assign({ ...data })
          context.commit('__SET_CACHE_ITEMS', cachedProducts)
          console.log(
            FUNC_NAME,
            'finally수행됩니다:',
            query,
            bulkLoadPagination
          )
          context.commit('__SET_CACHE_ITEMS_META_INFO', {
            query,
            bulkLoadPagination,
          })
          resolve(cachedProducts)
        })
      }
    })
      .then((bulkData) => {
        context.commit('__SET_CURRENT_PAGE', {
          items: bulkData.contents.filter(
            (item, index) =>
              index >= (pagination.page - 1) * pagination.size &&
              index < pagination.page * pagination.size
          ),
          last_page: parseInt((bulkData.total - 1) / pagination.size) + 1,
          page: pagination.page,
          total: bulkData.total,
        })
        console.log(FUNC_NAME, 'cache에서 bulkData 에서 현재페이지 설정 완료')
      })
      .finally(() => {})
  },
  // loadBulkProduct(context, { query, pagination }) {
  // },
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
    dispatch('setCondition', newPageCondition)
  },
}

/**
 * 저장된 상품 캐시데이터를 페이지단위로 돌려준다
 * @Param pagination            { Object } 페이지 정보
 * @Param pagination.pages       { Number=1 } 페이지 번호
 * @Param pagination.size        { Number=10 } 페이지당 로딩 사이즈
 * @Param pagination.order       { String="product_id" } 정렬 방법
 * @Param pagination.by          { ('ASC'|'DES')='ASC' } 정렬 방향
 * @returns {{total: (number|{jsMemoryEstimate: number, jsMemoryRange: [number, number]}|number|*), contents, last_page: (*|number), current_page}}
 */
// returnPageData(pagination) {
//   return {
//     contents: cachedProducts.contents.filter(
//       (item, index) =>
//         index >= (pagination.page - 1) * pagination.size &&
//         index < pagination.page * pagination.size
//     ),
//     last_page: cachedProducts.last_page,
//     current_page: pagination.page,
//     total: cachedProducts.total,
//   },
// },

export const getters = {
  getProducts(state) {
    console.log(
      'store/product.js actions/getProducts:\n',
      state.current_page.page,
      state.current_page.items
    )
    return state.current_page.items
  },
  getQuery(state) {
    return state.currentFilter.query !== null ? state.currentFilter.query : ''
  },
  getOrderBy(state) {
    return state.currentFilter.order + '_' + state.currentFilter.by
  },
  getCurrentPage(state) {
    return state.current_page.page
  },
  getLastPage(state) {
    return state.current_page.last_page
  },
  __getCacheItems(state) {
    return state.cache.items
  },
}
