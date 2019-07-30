import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/common.css'
import axios from 'axios'
Vue.use(ElementUI)

Vue.config.productionTip = false
// 设置接口基本地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 将axios挂到vue原型上=> $axios，组件本质是vue实例所以可以直接使用原型上的成员
Vue.prototype.$axios = axios
// 请求拦截
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
// token过期问题处理
// axios.interceptors.response.use(
//   function (response) {
//     if (response.data.meta.status === 100011 && response.token) {
//       this.$router.push('/login')
//     }
//     return response
//   },
//   function (error) {
//     // Do something with response error
//     return Promise.reject(error)
//   }
// )

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
