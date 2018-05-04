// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import { Pagination,Message,Select,Option,MessageBox} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { createRouter } from './router'

Vue.prototype.axios = axios

Vue.use(Pagination);
Vue.use(Select);
Vue.use(Option);
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
/**
 * 挂载全局变量
 */
let GLOBALDATA = {
    imgOrigin:process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://image.lcddjm.com'
}
Vue.prototype.GLOBALDATA = GLOBALDATA; 
Vue.prototype.HOST =  process.env.NODE_ENV === 'development' ? 'http://localhost:8083' : 'https://api.lcddjm.com';


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