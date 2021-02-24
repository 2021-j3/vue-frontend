export default function ({ $axios, redirect, store }, inject) {
  const api = $axios.create({
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
      if (store.$auth.loggedIn) {
        request.headers.common.Authorization =
          'Bearer ' + store.$auth.user.token
      }
      console.log('plugins/axios.js onRequest:\n', request)
      return request
    },
    (error) => {
      console.error('plugins/axios.js/onRequestError:\n', error)
      return Promise.reject(error)
    }
  )

  // response 를 처리하는 interceptors
  api.interceptors.response.use(
    (response) => {
      console.log('plugins/axios.js/onResponse:\n', response)
      // 실제 데이터는 response.response.data.data 에 들어있음
      return new Promise((resolve) => resolve(response.data))
    },
    (error) => {
      console.log('plugins/axios.js/onResponseError:\n', error)
      // redirect('/errors/' + error.response.status)
      return Promise.reject(error)
    }
  )
  inject('api', api)
}
