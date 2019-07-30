import vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/home/Home'
import Login from './components/login/login'
import Users from './components/users/Users.vue'
import Roles from './components/roles/Roles.vue'
import Rights from './components/rights/Rights.vue'
vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/users', component: Users },
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rights }
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
