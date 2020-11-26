import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Login.vue')
    }, {
        path: '/register',
        name: 'Register',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Register.vue')
    }, {
        path: '/alter',
        name: 'Alter',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Alter.vue'),
        meta:  {             requireAuth:  true         }
    }, {
        path: '/add',
        name: 'Add',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Add.vue'),
        meta:  {             requireAuth:  true         }
    }, {
        path: '/total',
        name: 'Total',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Total.vue'),
        meta:  {             requireAuth:  true         }
    }, {
        path: '/query',
        name: 'Query',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Query.vue'),
        meta:  {             requireAuth:  true         }
    }, {
        path: '/update',
        name: 'Update',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Update.vue'),
        meta:  {             requireAuth:  true         }
    }, {
        path: '/test',
        name: 'Test',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Test.vue'),
        meta:  {             requireAuth:  true         }
    }

]

const router = new VueRouter({
    routes
})

export default router

router.beforeEach((to,  from,  next)  =>  {    
    if (to.meta.requireAuth)  {  // 判断该路由是否需要登录权限
        if (sessionStorage.getItem("token")  ==  'true')  {  // 判断本地是否存在token
            next()        
        } 
        else  {             // 未登录,跳转到登陆页面       
            alert("未登录，请登录后再进行操作");            
            next({ path: '/login' })        
        } 
    } 
    else {        
        if  (sessionStorage.getItem("token")  ==  'true') {
            next();
        } else {
            next();
        }    
    }
});