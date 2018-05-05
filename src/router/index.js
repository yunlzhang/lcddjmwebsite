import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
const Signup = r => require.ensure([],()=>r(require('@/components/Signup')),'Signup');
const Signin = r => require.ensure([],()=>r(require('@/components/Signin')),'Signin');
const User = r => require.ensure([],()=>r(require('@/components/User')),'User');
const Blog = r => require.ensure([],()=>r(require('@/components/Blog')),'Blog');
const Notfind = r => require.ensure([],()=>r(require('@/components/Notfind')),'Notfind');
const Edit = r => require.ensure([],()=>r(require('@/components/Edit')),'Edit');
const Article = r => require.ensure([],()=>r(require('@/components/Article')),'Article');
const Me = r => require.ensure([],() =>r(require('@/components/Me')),'Me');
const About = r => require.ensure([],()=>r(require('@/components/About')),'About'); 

// router.beforeEach((to, from, next) => {
// 	if (sessionStorage.getItem('isLogin') && ~['signin', 'signup'].indexOf(to.name)) {
// 		next({
// 			path:'/'
// 		});
// 	}
// 	next();
// })

export function createRouter () {
	return new Router({
		mode: 'history',
		routes: [{
			path:'*',
			name:'',
			component:Notfind
		},{
			path: '/',
			name: 'blog',
			component: Blog
		}
		,{
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
			path: '/edit/:id',
			name: 'editArticle',
			component: Edit
		}
		,{
			path:'/article/:id',
			name:'article',
			component:Article
		},
		{
			path:'/me',
			name:'me',
			component:Me
		},
		{
			path:'/about',
			name:'about',
			component:About
		}
		]
	});
}