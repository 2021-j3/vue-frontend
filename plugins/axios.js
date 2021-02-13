export default function ({ $axios }, inject) {
  const api = $axios.create({
    baseURL: '/api',
    headers: {
      common: {
        Accept: 'application/json',
      },
    },
    timeout: 5000,
  })

  api.interceptors.request.use(
    (request) => {
      console.log('request:', request)
      return request
    },
    (error) => {
      console.log('request error:', error)
      return Promise.reject(error)
    }
  )

  api.interceptors.response.use(
    (response) => {
      console.log('response:', response)
      return new Promise((resolve) => resolve(response.data))
    },
    (error) => {
      console.log(error)
      return Promise.reject(error)
    }
  )
  inject('api', api)
}
