import Vue from 'vue'
import Router from 'vue-router'
/* import Signup from '@/components/Signup';
import Signin from '@/components/Signin';
import User from '@/components/User';
import Blog from '@/components/Blog';
import Notfind from '@/components/Notfind';
import Edit from '@/components/Edit'; */

const Signup = r => require.ensure([],()=>r(require('@/components/Signup')),'Signup');
const Signin = r => require.ensure([],()=>r(require('@/components/Signin')),'Signin');
const User = r => require.ensure([],()=>r(require('@/components/User')),'User');
const Blog = r => require.ensure([],()=>r(require('@/components/Blog')),'Blog');
const Notfind = r => require.ensure([],()=>r(require('@/components/Notfind')),'Notfind');
const Edit = r => require.ensure([],()=>r(require('@/components/Edit')),'Edit');
const Article = r => require.ensure([],()=>r(require('@/components/Article')),'Article');
const About = r => require.ensure([],()=>r(require('@/components/About')),'About'); 

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
	},{
		path:'/article/:id',
		name:'article',
		component:Article
	},
	{
		path:'/about',
		name:'about',
		component:About
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
