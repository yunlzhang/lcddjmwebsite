import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/Signup';
import Signin from '@/components/Signin';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },{
      path: '/signin',
      name: 'signin',
      component: Signin
    }
  ]
})
