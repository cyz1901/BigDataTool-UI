<template>
  <v-app>
    <v-navigation-drawer app>
      <v-list-item style="height: 48px">
        <v-list-item-avatar width="30px" @click="tologin">
          <v-img :src="require('@/assets/head.png')"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-divider></v-divider>

      <v-list :dense="true" nav>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.herf"
            link
          >
            <v-list-item-icon>
              <v-icon x-large>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app :dense="true" :flat="true"> <!-- --> </v-app-bar
    ><!-- 根据应用程序组件调整内容大小 -->
    <v-main
      ><!-- 为应用程序提供正确的插槽 -->
      <router-view></router-view>
    </v-main>
    <v-bottom-navigation app height="35px" style="justify-content: left">
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-icon color="green" v-on="on" style="padding-left: 30px">{{
            footerItems
          }}</v-icon>
        </template>
        <span>Left tooltip</span>
      </v-tooltip>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    initiallyOpen: ['public'],
    files: {
      html: 'mdi-language-html5',
      js: 'mdi-nodejs',
      json: 'mdi-code-json',
      md: 'mdi-language-markdown',
      pdf: 'mdi-file-pdf',
      png: 'mdi-file-image',
      txt: 'mdi-file-document-outline',
      xls: 'mdi-file-excel'
    },
    selectedItem: 0,
    tree: [],
    items: [
      { title: '集群', icon: 'iconfont icon-colony', herf: '/clustersView' }
      // { title: '设置', icon: 'iconfont icon-ziyuan', herf: '/settingView' },
    ],
    footerItems: 'mdi-check-circle-outline',
    right: null
  }),
  methods: {
    on () {
      var win = new BrowserWindow({
        width: 200,
        height: 200,
        titleBarStyle: 'hidden',
        frame: false
      })
      win.on('closed', function () {
        win = null
      })

      win.loadURL('https://github.com')
      win.show()
    },
    tologin () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
