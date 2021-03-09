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
      const FUNC_NAME = 'plugins/apis | api/request-onFullFilled : '
      console.log(FUNC_NAME, '리퀘스트 내용=', request)
      return request
    },
    (error) => {
      const FUNC_NAME = 'plugins/apis | api/request-onRejected : '
      console.error(FUNC_NAME, '리퀘스트 에러 내용=', error)
      return Promise.reject(error)
    }
  )

  // response 를 처리하는 interceptors
  api.interceptors.response.use(
    (response) => {
      const FUNC_NAME = 'plugins/apis | api/request-onFullFilled : '
      console.log(FUNC_NAME, '리스폰스 내용=', response)
      // 실제 데이터는 response.response.data.data 에 들어있음
      return new Promise((resolve) => resolve(response.data))
    },
    (error) => {
      const FUNC_NAME = 'plugins/apis | api/request-onRejected : '
      console.log(FUNC_NAME, '리스폰스 에러 내용=', error, error.data)
      // redirect('/errors/' + error.response.status)
      return Promise.reject(error)
    }
  )
  /// //////////////////////////////////////////////////////////////////////
  /**
   * 로그인 한다
   * @param form { Object } 로그인 폼
   * @Param form.email ( String } 회원 이메일
   * @Param form.password { String } 회원 비밀번호
   */
  const login = function (form) {
    return new Promise((resolve, reject) => {
      api
        .post('/accounts/login', form)
        .then((response) => {
          // setCookie('username', response.data.firstName)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  const logout = function () {
    return new Promise((resolve) => {
      api.post('/accounts/logout').then(() => {
        console.log('로그아웃')
        resolve()
      })
    })
  }

  const getMyAccount = function () {
    return new Promise((resolve, reject) => {
      api
        .get('/accounts/my', { withCredentials: true })
        .then((data) => resolve(data))
    })
  }

  /**
   * 주소를 생성한다
   * @param item
   * @returns { Promise }
   */
  const createAddress = function (item) {
    return new Promise((resolve, reject) => {
      api
        .post('/address', { data: item, withCredentials: true })
        .then((data) => resolve(data))
    })
  }

  /**
   * 로그인된 고객의 주소를 가져온다
   * @returns { Promise }
   */
  const getMyAddresses = function () {
    return new Promise((resolve, reject) => {
      api
        .get('/address/my', { withCredentials: true })
        .then((data) => {
          console.log(
            'plugins/apis | getMyAddresses : 서버에서 받은 카트:',
            data
          )
          resolve(data)
        })
        .catch((error) => reject(error))
    })
  }
  /**
   * 주소를 갱신한다
   * @param id {Number } 주소 아이디
   * @param address { Object } 주소 객체
   * @Param address.address_id { Number } 주소 아이디
   * @Param address.address { String } 구 주소
   * @Param address.road_address { String } 신 주소
   * @Param address.city { String } 시, 구
   * @Param address.province { String } 도, 시
   * @Param address.country { String } 국가 코드 (e.g. KR)
   * @Param address.zip_code { String } 우편번호
   * @returns {*}
   */
  const updateMyAddresses = function (id, address) {
    return new Promise((resolve, reject) => {
      api
        .get('/address/' + id, { data: address, withCredentials: true })
        .then((data) => {
          console.log(
            'plugins/apis | updateMyAddresses : 서버에서 받은 카트:',
            data
          )
          resolve(data)
        })
    })
  }
  /**
   *  주소를 삭제한다
   * @param id { Number }
   * @returns { Promise } 삭제완료
   */
  const deleteAddress = function (id) {
    return new Promise((resolve) => {
      api.delete('/address/' + id, { withCredentials: true }).then(() => {
        resolve()
      })
    })
  }
  /**
   * 로그인한 고객의 카트를 불러온다
   * @returns { Promise } 서버에서 가져온 카트
   */
  const getMyCart = function () {
    console.warn(
      'plugins/apis.js | getMyCart : "FIXME:cart는 현재 bodydata타입입니다"'
    )
    return new Promise((resolve, reject) => {
      api
        .get('/cart/my', { withCredentials: true })
        .then((data) => resolve(data.data))
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  }
  /**
   *
   * @param id { Number }
   * @param item { Object }
   * @Param item.product_id { Number }
   * @Param item.quantity { Number }
   * @returns {*}
   */
  const addItemToCart = function (id, item) {
    return new Promise((resolve, reject) => {
      api
        .post(`/carts/${id}/cartItem`, item, { withCredentials: true })
        .then((response) => response.data) // body data 사용 시
        .then((data) => {
          console.warn(
            'plugins/apis.js | addItemToCart : "FIXME: cart는 현재 bodydata타입입니다"'
          )
          console.log(
            'plugins/apis.js | addItemToCart : 서버에서 돌려준 정보는=',
            data
          )
          resolve(data)
        })
      resolve()
    })
  }

  const deleteItemFromCart = function (id, item) {
    console.warn(
      'plugins/apis.js | deleteItemFromCart :',
      `"FIXME: delete 요청시 리퀘스트바디 사용불가"`
    )
    return new Promise((resolve, reject) => {
      api.delete(`/carts/${id}/cartItem`, item)
      resolve()
    })
  }

  const getAllCategories = function () {
    return new Promise((resolve, reject) => {
      api
        .get('/categories')
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  }
  /**
   * 상품을 가져온다
   * @param id { Number } 상품 아이디
   * @returns { Promise } 서버에서 받은 상품
   */
  const getProductById = function (id) {
    return new Promise((resolve, reject) => {
      api
        .get('/products/' + id)
        .then((data) => {
          console.log(
            'plugins/apis | getProductById : 서버에서 받은 상품',
            data
          )
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
    console.log(
      'plugins/apis | getProductByQuery : ',
      '캐시에 해당 데이터가 없습니다. 새로 받아옵니다, api 파라미터',
      arguments
    )
    return new Promise((resolve, reject) => {
      const queryParam = getRequestParam({ ...query, ...pagination })
      api.get('/products?' + queryParam).then((data) => {
        resolve(data)
      })
    })
  }

  const apis = {
    login,
    logout,
    getMyAccount,
    createAddress,
    getMyAddresses,
    updateMyAddresses,
    deleteAddress,
    getMyCart,
    addItemToCart,
    deleteItemFromCart,
    getAllCategories,
    getProductById,
    getProductByQuery,
  }
  inject('apis', apis)
}

/**
* currentFilter
을 request param 으로 바꿔준다
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
