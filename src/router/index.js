import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/Signup';
import Signin from '@/components/Signin';
Vue.use(Router)
let router = new Router({
  mode:'history',
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
});
router.beforeEach((to, from, next) => {
  if(sessionStorage.getItem('isLogin') && ~['signin','signup'].indexOf(to.name)){
    next(false);
    return ;
  }
  // ...
})
export default router;
