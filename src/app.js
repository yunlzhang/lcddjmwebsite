// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import $http from 'vue-resource'
import { Pagination,Message,Select,Option } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { createRouter } from './router'

Vue.prototype.axios = axios

Vue.use($http)
Vue.use(Pagination);
Vue.use(Select);
Vue.use(Option);
Vue.prototype.$message = Message;

Vue.config.productionTip = false;
/* eslint-disable no-new */


export function createApp(){
  const router = createRouter()
  const app = new Vue({
    // el: '#app',
    // template: '<App/>',
    // components: { App },
    router,
    render:h => h(App)
    
  })
  return {app,router};
}