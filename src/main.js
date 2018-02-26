// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $http from 'vue-resource'
import { Pagination,Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use($http);
Vue.use(Pagination);
Vue.prototype.$message = Message;


Vue.config.productionTip = false;
/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})