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
// import ColonyMonitor from '@/views/colony_view/ColonyMonitor'

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
          // {
          //   path: 'colonymonitor',
          //   name: 'colonymonitor',
          //   component: ColonyMonitor
          // }
        ]
      },
      {
        path: '/webtest',
        name: 'webtest',
        component: webtest
      },
      {
        path: '/settingView',
        component: SettingView,
        children: [
          {
            path: '',
            name: 'setting',
            component: Setting
          }
        ]
      }
    ]
  }
]
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
