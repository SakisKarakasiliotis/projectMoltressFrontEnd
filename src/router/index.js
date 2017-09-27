import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Estates from '@/components/Estates'
import Estate from '@/components/Estate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/estates',
      name: 'Estates',
      component: Estates
    }
  ]
})
