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
        <v-list-item
          v-for="item in clustersData"
          three-line>
          <v-container>
            <v-col>
              <v-row>
                <v-list-item-content>
                  <div class="overline mb-4">OVERLINE</div>
                  <v-list-item-title class="headline mb-1">
                    {{item.title}}
                  </v-list-item-title>
                  <!--            <v-list-item-subtitle-->
                  <!--              >Greyhound divisely hello coldly-->
                  <!--              fonwderfully</v-list-item-subtitle-->
                  <!--            >-->
                </v-list-item-content>
                <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
              </v-row>
            </v-col>
            <v-col>
              <v-card-actions>
                <v-btn outlined rounded text @click="onColonyOperation(item)">
                  集群操作
                </v-btn>
<!--                <v-btn outlined rounded text @click="onDetailCluster(item)">-->
<!--                  集群监控-->
<!--                </v-btn>-->
              </v-card-actions>
            </v-col>
          </v-container>
        </v-list-item>
      </v-card>
    </v-container>
    <router-view></router-view>
  </v-main>
</template>

<script>
var _this
export default {
  name: 'Clusters',
  data: () => ({
    collapseOnScroll: true,
    dialog: false,
    clusterSign: true,
    card: [
      { title: 'Pre-fab homes', src: '/webtest', flex: 3 }
    ],
    clustersData: [
    ]
  }),
  mounted () {
    _this = this
    this.init()
  },
  methods: {
    onNewClusters () {
      this.$router.replace({ name: 'colonydeploy' })
    },

    // onDetailCluster (card) {
    //   console.log(window.location.href)
    //   this.$router.replace({ name: 'colonyMonitor' })
    // },
    onColonyOperation (card) {
      console.log(card.nameNodeName)
      this.$router.push({ name: 'colonyOperation',params: {key: card.nameNodeName} })
    },
    init () {
      // if (this.clusterSign === true) {
      //   console.log('tr')
      // } else {
      //   console.log('fa')
      //   this.$router.replace({ name: 'clustersHelp' })
      // }
      this.$axios.get('/api/v1/clusters').then(res => {
        _this.clustersData = res.data.data.map(x=>{
          return{
            title: x.colonyName,
            nameNodeName: x.nameNodeName,
            flex: 3
          }
        })
        console.log(_this.clustersData)
      })
    }
  }
}
</script>

<style scoped>
</style>
