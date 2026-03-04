import axios from 'axios'

const http = axios.create({
  baseURL: '/marketing',
  timeout: 8000
})

http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
)

export default http
