import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'development'?"http://localhost:3000":"";
axios.defaults.baseURL = baseURL

//请求拦截器
axios.interceptors.request.use(config => config)


//响应拦截器
axios.interceptors.response.use(
  res => res.data,
  err => {
      console.log("请求失败", err)
      return new Promise(()=>{})
  }
)

export default axios