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
    <div style="display: flex; margin: 20px">
      <v-card style="width: 30%; height: 100%; margin-right: 10px;margin-top: 12px">
        <v-container style="margin-top: 30px">
          <v-row>
            <v-col cols="2" offset-md="1">
              <v-icon x-large> iconfont icon-hadoop </v-icon>
            </v-col>
            <v-col align-self="center">
              <h4>{{ nameNodeName }}</h4>
            </v-col>
            <v-col align-self="center">
              <v-icon :color="colonyIconColor" style="padding-left: 30px">{{
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
              <v-btn color="primary" dark @click="operationColony">
                {{ colonyStatusButton }}
              </v-btn>
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
          <v-row  no-gutters justify="center" style="padding-top: 30px">
            <v-col  cols="10">
              <v-text-field
                label="File Src"
                v-model="fileSrc"
                append-outer-icon="mdi-send"
                @click:append-outer="getFileList"
              >
              </v-text-field>
            </v-col>
            <v-col align-self="center">
              <v-btn>
                <v-icon>
                  mdi-cloud-upload
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row justify="center" style="margin-top: 50px">
            <v-col>
              <v-data-table
                :headers="items.headers"
                :items="items.data"
                item-key="name"
                dense
                show-select
              >
              </v-data-table>
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
      headers: [
        {
          text: 'Name',
          value: 'pathSuffix'
        },
        {
          text: 'Owner',
          value: 'owner'
        },
        {
          text: 'Group',
          value: 'group'
        },
        {
          text: 'Permission',
          value: 'permission'
        },
        {
          text: 'BlockSize',
          value: 'blockSize'
        },
        {
          text: 'Replication',
          value: 'replication'
        }

      ],
      data: [

      ]
    }

  }),
  mounted () {
    this.nameNodeName = this.$route.params.key
    this.updateColony()
    this.init()
  },
  methods: {
    init () {
      this.getFileList()
    },
    operationColony () {
      if (this.colonyOperationStatus === 'start') {
        this.$axios.put('/api/v1/colonyOperation/colony/stop').then(res => {
          this.colonyStatus = res.data.data
          console.log(this.colonyStatus)
          this.updateColonyStatus()
          // setTimeout(()=> this.getFileList(),1000)
        })
      } else if (this.colonyOperationStatus === 'stop') {
        this.$axios.put('/api/v1/colonyOperation/colony/start').then(res => {
          this.colonyStatus = res.data.data
          console.log(this.colonyStatus)
          this.updateColonyStatus()
          // setTimeout(()=> this.getFileList(),1000)
        })
      }
    },
    getFileList () {
        this.$axios.put('/api/v1/colonyOperation/file?fileAddr='+this.fileSrc).then(res => {
          console.log(res.data.data)
          this.items.data = res.data.data
      })
    },
    updateColony () {
      this.$axios.get('/api/v1/colonyOperation/colony').then(res => {
        this.colonyStatus = res.data.data
        this.updateColonyStatus()
      })
    },
    updateColonyStatus () {
      if (this.colonyStatus === 'stop') {
        this.colonyIconColor = ''
        this.colonyStatusButton = '启动集群'
        this.colonyOperationStatus = 'stop'
      } else if (this.colonyStatus === 'alive') {
        this.colonyIconColor = 'primary'
        this.colonyStatusButton = '关闭集群'
        this.colonyOperationStatus = 'start'
      } else if (this.colonyStatus === 'error') {
        this.colonyIconColor = 'red'
        this.colonyStatusButton = '启动集群'
      } else if (this.colonyStatus === 'warning') {

      }
    },
  }
}
</script>

<style scoped>
</style>
