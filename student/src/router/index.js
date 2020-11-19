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
            import ( /* webpackChunkName: "about" */ '../views/Alter.vue')
    }, {
        path: '/add',
        name: 'Add',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Add.vue')
    }, {
        path: '/total',
        name: 'Total',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Total.vue')
    }, {
        path: '/query',
        name: 'Query',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Query.vue')
    }

]

const router = new VueRouter({
    routes
})

export default router