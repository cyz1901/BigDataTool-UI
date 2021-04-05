<template>
  <v-container style="margin: 0; padding: 0">
    <v-app-bar
      color="grey darken-3"
      dark
      :dense="true"
      :flat="true"
      style="height: 49px"
    >
      <v-container>
        <v-row>
          <v-col offset-md="10">
            <v-btn color="primary" dark> HadoopWebUI </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <div style="display: flex; margin: 10px">
      <v-card style="width: 30%; height: 100%; margin-right: 10px">
        <v-container style="margin-top: 20px">
          <v-row>
            <v-col cols="2" offset-md="1">
              <v-icon x-large >
                iconfont icon-hadoop
              </v-icon>
            </v-col>
            <v-col align-self="center">
              <h4>{{nameNodeName}}</h4>
            </v-col>
            <v-col  align-self="center">
              <v-icon color="primary" style="padding-left: 30px">{{
                  colonyIcon
                }}</v-icon>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-divider></v-divider>
            </v-col>
          </v-row>
          <v-row>
            <v-col offset-md="4">
              <v-btn :color=colonyIconColor dark @click="operationColony"> {{colonyStatusButton}} </v-btn>
            </v-col>
          </v-row>

        </v-container>
      </v-card>
      <v-divider vertical></v-divider>
      <v-container>
        <v-card
          style="
            padding-left: 10%;
            margin-left: 0;
            margin-right: 0;
            padding-right: 10%;
          "
        >
          <v-row justify="center" style="padding-top: 30px">
            <v-text-field label="File Src" style="width: 200px" v-model="fileSrc"> </v-text-field>
          </v-row>
          <v-row justify="center" style="margin-top: 50px">
            <v-col cols="8">
              <v-data-table
                v-model="selected"
                :headers="items.headers"
                :items="items.data"
                item-key="name"
              >
              </v-data-table>
            </v-col>
            <v-col>
              <v-divider vertical></v-divider>
            </v-col>
            <v-col>
              <p>hello</p>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'ColonyOperation',
  data: () => ({
    nameNodeName: '',
    fileSrc: '/',
    selectedItem: 1,
    colonyStatus: 'stop',
    colonyOperationStatus: 'stop',
    colonyStatusButton: '启动集群',
    colonyIcon: 'mdi-check-circle-outline',
    colonyIconColor: '',
    items: {
      headers:[
        {
          text: 'Name',
          value: 'pathSuffix'
        },
        {
          text: 'Owner',
          value: 'owner'
        },
        {
          text: 'Size',
          value: 'owner'
        },
        {
          text: 'Replication',
          value: 'replication'
        }

      ]
      ,
      data:[

      ]
    }

  }),
  mounted () {
    this.nameNodeName = this.$route.params.key
    this.init()
  },
  methods: {
    init () {
      if (this.colonyOperationStatus === 'start') {
        this.getFileList()
      }
    },
    operationColony(){
      if(this.colonyOperationStatus === "start"){
        this.$axios.put('/api/v1/colonyOperation/colony?operation=stop').then(res => {
          this.colonyStatusButton = '启动集群'
          this.colonyOperationStatus = "stop"
        })
      } else if(this.colonyOperationStatus === "stop"){
        this.$axios.put('/api/v1/colonyOperation/colony?operation=start').then(res => {
          this.colonyStatusButton = '关闭集群'
          this.colonyOperationStatus = "start"
          this.colonyStatus = 'alive'
        })
      }
      this.updateColonyStatus()
    },
    getFileList(){
      if (this.colonyStatus === "start"){
        this.$axios.get('/api/v1/colonyOperation/file').then(res => {
          console.log(res)
          this.items.data = res.data
        })
      }
    },
    updateColonyStatus(){
      if (this.colonyStatus === "stop") {
        this.colonyIconColor = 'red'
      }else if (this.colonyStatus === "alive"){
        this.colonyIconColor = 'primary'
      }else if (this.colonyStatus === "error"){

      }else if (this.colonyStatus=== "warning"){

      }
    }
  }
}
</script>

<style scoped>
</style>
