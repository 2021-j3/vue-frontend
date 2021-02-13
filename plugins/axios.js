import axios from 'axios'

const api = axios.create({
  baseURL: 'api',
})

api.defaults.timeout = 5000

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
    return response
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default api
