import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import * as path from "path";
import Hello from './views/Hello'


import Index from './views/colony_view/index.vue'
import About from './views/About.vue'
import webtest from "@/views/webtest";
import Clusters from './views/colony_view/Clusters.vue'

import Colony from './views/colony_view/Colony.vue'
import Test from './views/colony_view/test.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '',
        name: 'hello',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Hello
      },
      {
        path: '/clustersView',
        // name: 'clusters',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Index,
        children: [
          {
            path: '',
            name: 'test',
            component: Clusters,
          },
          {
            path: 'colony',
            name: 'colony',
            component: Colony,
          },
        ]
      },
        // {
        //   path: '/colony',
        //   name: 'colony',
        //   component: Colony,
        // },
      {
        path: '/webtest',
        name: 'webtest',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: webtest
      }
    ]
  },
]


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
  })
