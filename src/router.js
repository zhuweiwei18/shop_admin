import vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/home/Home'
import Login from './components/login/login'
vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})

export default router
