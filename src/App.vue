<template>
  <v-app>
    <v-navigation-drawer app>
      <v-list-item>
        <v-list-item-content style="height: 48px">
          <v-list-item-title >
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
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

    <v-app-bar app dense="true">
      <!-- -->
    </v-app-bar><!-- 根据应用程序组件调整内容大小 -->
    <v-main><!-- 为应用程序提供正确的插槽 -->
<!--      <v-container fluid>-->
        <router-view></router-view>
<!--      </v-container>-->
  </v-main>
    <v-footer app>
      <button>hello</button>
    </v-footer>
  </v-app>
</template>

<script>
// import hadoopIcon from "../assets/hadoop.svg"
export default {
  // components:{
  //   hadoopIcon
  // },
  name: 'App',
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
      xls: 'mdi-file-excel',
    },
    selectedItem: 0,
    tree: [],
    items: [
      { title: 'Hadoop集群', icon: 'iconfont icon-hadoop29', herf:'hadoop' },
      { title: 'Photos', icon: 'mdi-image', herf:'webtest' },
      { title: 'About', icon: 'mdi-help-box', herf:'about' },
    ],
    right: null,
  }),
  methods: {
    on() {
      const BrowserWindow = require('electron').remote.BrowserWindow;

      var win = new BrowserWindow({
        width: 200,
        height: 200,
        titleBarStyle: 'hidden',
        frame: false
      });
      win.on('closed', function() {
        win = null;
      });

      win.loadURL('https://github.com');
      win.show();
    }
  }
}
</script>
