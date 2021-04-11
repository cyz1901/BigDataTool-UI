import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Hello from '@/views/Hello'
import ColonyIndex from '@/views/colony_view/index.vue'
import webtest from '@/views/webtest'
import Clusters from '@/views/colony_view/Clusters.vue'
import ColonyDeploy from '@/views/colony_view/ColonyDeploy.vue'
import ClustersHelp from '@/views/colony_view/ClustersHelp'
import SettingView from '@/views/setting_view/index'
import Setting from '@/views/setting_view/Setting'
import LoginView from '@/views/login_view/index'
import Login from '@/views/login_view/Login'
import ColonyMonitor from '@/views/colony_view/ColonyMonitor'
import ColonyOperation from '@/views/colony_view/ColonyOperation'

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
        component: ColonyIndex,
        children: [
          {
            path: '',
            name: 'test',
            component: Clusters
          },
          {
            path: 'colonydeploy',
            name: 'colonydeploy',
            component: ColonyDeploy
          },
          {
            path: 'clustersHelp',
            name: 'clustersHelp',
            component: ClustersHelp
          },
          {
            path: 'colonyMonitor',
            name: 'colonyMonitor',
            component: ColonyMonitor
          },
          // ColonyOperation
          {
            path: 'colonyOperation',
            name: 'colonyOperation',
            component: ColonyOperation
          }
        ]
      },
      {
        path: '/webtest',
        name: 'webtest',
        component: webtest
      }
      // TODO 等在下一版本
      /*       {
        path: '/settingView',
        component: SettingView,
        children: [
          {
            path: '',
            name: 'setting',
            component: Setting
          }
        ]
      } */
    ]
  },
  {
    path: '/loginView',
    component: LoginView,
    children: [
      {
        path: '',
        name: 'login',
        component: Login
      }
    ]
  }
]
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
