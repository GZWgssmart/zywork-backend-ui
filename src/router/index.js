import Vue from 'vue'
import Router from 'vue-router'

import login from '@/views/login'
import register from '@/views/register'
import home from '@/views/home'
import homeIndex from '@/views/homeIndex'
import users from '@/views/users'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login1',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: '/index',
          name: 'homeIndex',
          component: homeIndex
        },
        {
          path: '/users',
          name: 'users',
          component: users
        }
      ]
    }
  ]
})
