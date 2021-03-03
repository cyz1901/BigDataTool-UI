<template>
  <v-app>
    <v-navigation-drawer :absolute="true" app>
      <v-list-item>
        <v-list-item-content style="height: 48px">
          <v-list-item-title> Application </v-list-item-title>
          <v-list-item-subtitle> subtext </v-list-item-subtitle>
        </v-list-item-content>
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
    <v-footer app>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-icon color="green" v-bind="attrs" v-on="on">{{
            footerItems
          }}</v-icon>
        </template>
        <span>Left tooltip</span>
      </v-tooltip>
    </v-footer>
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
      { title: 'Colony', icon: 'iconfont icon-colony', herf: '/clustersView' },
      { title: 'Photos', icon: 'mdi-image', herf: '/webtest' },
      { title: 'About', icon: 'mdi-help-box', herf: '/about' }
      // { title: 'Tbout', icon: 'mdi-help-box', herf: '/clusters/colony' }
    ],
    footerItems: 'mdi-help-box',
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
    }
  }
}
</script>
