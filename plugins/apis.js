export default function ({ $axios, redirect, store }, inject) {
  const api = $axios.create({
    // baseURL: 'http:localhost:20000/api',
    baseURL: '/api',
    headers: {
      common: {
        Accept: 'application/json',
      },
    },
  })

  // request 를 처리하는 interceptors
  api.interceptors.request.use(
    (request) => {
      // 로그인  여부 확인
      if (store.$auth.loggedIn) {
        // auth token 추가
        request.headers.common.Authorization =
          store.getters['myAuth/getAuthorization']
      }
      console.log(
        'plugins/axios.js onRequest:\naxios 리퀘스트 인터셉트 내용',
        request
      )
      return request
    },
    (error) => {
      console.error(
        'plugins/axios.js/onRequestError:\naxios 리퀘스트 에러 내용',
        error
      )
      return Promise.reject(error)
    }
  )

  // response 를 처리하는 interceptors
  api.interceptors.response.use(
    (response) => {
      console.log('plugins/axios.js onResponse:\n', response)
      // 실제 데이터는 response.response.data.data 에 들어있음
      return new Promise((resolve) => resolve(response.data))
    },
    (error) => {
      console.log('plugins/axios.js onResponseError:\n', error)
      console.log(error.data)
      // redirect('/errors/' + error.response.status)
      return Promise.reject(error)
    }
  )
  /**
   * 로그인한 고객의 카트를 불러온다
   * @returns { Promise } 카트를 반환하는 프로미스 객체
   */
  const getMyCart = function () {
    return new Promise((resolve, reject) => {
      api
        .get('/cart/my')
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  }
  /**
   * 상품을 가져온다
   * @param id { Number } 상품 아이디
   * @returns { Promise } 상품을 반환하는 프로미스 객체
   */
  const getProductById = function (id) {
    return new Promise((resolve, reject) => {
      api
        .get('/products/' + id)
        .then((data) => {
          console.log('plugins/apis getProductById:\n 서버에서 받은 상품', data)
          resolve(data)
        })
        .catch((error) => reject(error))
    })
  }
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
  const getProductByQuery = function (query, pagination) {
    if (!pagination.page || pagination.page < 1) pagination.page = 1
    if (!pagination.size) pagination.size = 10
    if (!pagination.order) pagination.order = 'product_id'
    if (!pagination.by) pagination.by = 'ASC'

    const bulkSize = 10
    const bulkLoadPagination = {
      page: parseInt((pagination.page - 1) / bulkSize) * bulkSize + 1,
      size: pagination.size * bulkSize,
      order: pagination.order,
      by: pagination.by,
    }
    if (lastPagination === bulkLoadPagination)
      return Promise.resolve(returnPageData(pagination))
    console.log('캐시에 해당 데이터가 없습니다. 새로 받아옵니다')
    return new Promise((resolve, reject) => {
      const queryParam = getRequestParam({ ...query, ...bulkLoadPagination })
      api
        .get('/products?' + queryParam)
        .then((data) => {
          data.last_page = parseInt((data.total - 1) / pagination.size) + 1
          cachedProducts = Object.assign({ ...data })
          console.log(
            '상품 개수',
            data.total,
            '페이지 당 개수',
            pagination.size,
            '마지막페이지',
            cachedProducts.last_page
          )
          console.log(data.last_page)
          resolve(returnPageData(pagination))
        })
        .finally(() => {
          lastQuery = query
          lastPagination = pagination
          console.log(lastQuery, lastPagination)
        })
    })
  }
  let lastQuery = null
  let lastPagination = null
  let cachedProducts = {}
  function returnPageData(pagination) {
    return {
      contents: cachedProducts.contents.filter(
        (item, index) =>
          index >= (pagination.page - 1) * pagination.size &&
          index < pagination.page * pagination.size
      ),
      last_page: cachedProducts.last_page,
      current_page: pagination.page,
      total: cachedProducts.total,
    }
  }
  const apis = { getMyCart, getProductById, getProductByQuery }
  inject('apis', apis)
}

/**
* currentFilter
을 request param 으로 바꿔주는 메소드
* @param conditions { Object } 쿼리와 페이지네이션 모두
* @returns requestParameters { String }
*/
function getRequestParam(conditions) {
  return Object.entries(conditions)
    .filter((v) => v[1] !== null && v[1] !== undefined)
    .map((v, index) => {
      if (v[1].isArray) return v[0] + '=' + v[1].join(',')
      else return v[0] + '=' + v[1]
    })
    .join('&')
}
