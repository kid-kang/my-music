import axios from 'axios'

const baseURL = "https://www.codeman.ink/api"

axios.defaults.baseURL = baseURL

//请求拦截器
axios.interceptors.request.use(config => {
  config.withCredentials=true
  if (localStorage.getItem("token")) config.token = localStorage.getItem("token")
  return config
})


//响应拦截器
axios.interceptors.response.use(
  res => res.data,
  err => {
    // console.log("请求失败", err)
    // return new Promise(() => { })
    return err.response.data
  }
)

export default axios