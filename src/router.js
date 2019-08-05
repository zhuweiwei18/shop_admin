import vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/login/login'
const Home = () => import('./components/home/Home')
const Users = () => import('./components/users/Users.vue')
const Roles = () => import('./components/roles/Roles.vue')
const Rights = () => import('./components/rights/Rights.vue')
const Categories = () => import('./components/categories/Categories.vue')
const Goods = () => import('./components/goods/Goods.vue')
const GoodsAdd = () => import('./components/goods/GoodsAdd.vue')

vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/users/:page?', component: Users },
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rights },
        { path: '/categories/:page?', component: Categories },
        { path: '/goods/:page?', component: Goods },
        { path: '/goods-add', component: GoodsAdd }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
})

export default router
