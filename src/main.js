import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://192.168.1.100/'; //默认地址

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import uploader from 'vue-simple-uploader'
Vue.use(uploader)

import 'font-awesome/css/font-awesome.min.css'


Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
