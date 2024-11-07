import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

instance.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer 745cb6ba-0f6c-4675-b94e-03322b34fc8b`

  return config
})

export default instance
