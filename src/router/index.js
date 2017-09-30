import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Estates from '@/components/Estates'
import Estate from '@/components/Estate'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Profile from '@/components/Profile'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/estates/:location/:start/:end',
      name: 'Estates',
      component: Estates
    },
    {
      path: '/estates/:location',
      name: 'EstatesAll',
      component: Estates
    },
    {
      path: '/estate/:id',
      name: 'Estate',
      component: Estate
    },
    {
      path: '/home',
      name: 'Home',
      component: Hello
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/profile/:user',
      name: 'Profile',
      component: Profile
    }
  ]
})
