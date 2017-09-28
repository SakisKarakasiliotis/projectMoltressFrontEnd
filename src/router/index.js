import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Estates from '@/components/Estates'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/estates/:location',
      name: 'Estates',
      component: Estates
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
    }
  ]
})
