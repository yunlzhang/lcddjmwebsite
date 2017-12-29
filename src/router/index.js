import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/Signup';
import Signin from '@/components/Signin';
import User from '@/components/User';
import Blog from '@/components/Blog';
import Notfind from '@/components/Notfind';
import Edit from '@/components/Edit';


Vue.use(Router)
let router = new Router({
	mode: 'history',
	routes: [{
		path:'*',
		name:'',
		component:Notfind
	},{
		path: '/',
		name: 'blog',
		component: Blog
	},{
		path: '/signup',
		name: 'signup',
		component: Signup
	}, {
		path: '/signin',
		name: 'signin',
		component: Signin
	},{
		path: '/edit',
		name: 'edit',
		component: Edit
	}
	]
});
router.beforeEach((to, from, next) => {
	if (sessionStorage.getItem('isLogin') && ~['signin', 'signup'].indexOf(to.name)) {
		next({
			path:'/'
		});
	}
	next();
})
export default router;
