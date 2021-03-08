<template>
  <v-main style="padding-left: 0; padding-top: 0; margin-left: 0">
    <v-app-bar
      color="grey darken-3"
      dark
      :dense="true"
      :flat="true"
      style="height: 49px"
    >
      <!--Dialog      -->
      <v-btn color="primary" dark @click="onNewClusters"> 新建一个集群 </v-btn>
    </v-app-bar>
    <v-container fluid>
      <!--Card        -->
      <v-card class="mx-auto" height="50%" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">OVERLINE</div>
            <v-list-item-title class="headline mb-1">
              Headline 5
            </v-list-item-title>
            <v-list-item-subtitle
              >Greyhound divisely hello coldly
              fonwderfully</v-list-item-subtitle
            >
          </v-list-item-content>

          <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <v-btn outlined rounded text @click="onDetailCluster(card)">
            Button
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <router-view></router-view>
  </v-main>
</template>

<script>
export default {
  name: 'Clusters',
  created () {
    this.init()
  },
  data: () => ({
    collapseOnScroll: true,
    dialog: false,
    clusterSign: true,
    card: [
      { title: 'Pre-fab homes', src: '/webtest', flex: 3 }
    ]
  }),
  methods: {
    onNewClusters () {
      this.$router.replace({ name: 'colonydeploy' })
    },

    // onDetailCluster (card) {
    //   console.log(window.location.href)
    //   this.$router.replace({ name: 'colonymonitor' })
    // },

    init () {
      if (this.clusterSign === true) {
        console.log('tr')
      } else {
        console.log('fa')
        this.$router.replace({ name: 'clustersHelp' })
      }
    }
  }
}
</script>

<style scoped>
</style>
