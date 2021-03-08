<template>
  <v-stepper v-model="step" vertical>
    <v-stepper-step :complete="step > 1" step="1"> 集群初始化 </v-stepper-step>
    <v-stepper-content step="1">
      <v-card color="grey darken-4" class="card">
        <v-card-text>
          <v-container fluid>
            <v-form ref="colonyInitForm">
              <h3>输入集群名称</h3>
              <v-text-field
                label="集群名称"
                v-model="colonyInitForm.name"
                clearable
                style="width: 250px"
              ></v-text-field>
              <h3>选择需要部署的节点</h3>
              <v-data-table
                :headers="nodesMsg.header"
                :items="nodesMsg.data"
                hide-default-footer
              >
                <template v-slot:item.choose="{ item }">
                  <v-simple-checkbox v-model="item.choose"></v-simple-checkbox>
                </template>
              </v-data-table>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
      <v-btn color="primary" @click="colonyInitNext" class="button">
        继续
      </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="step > 2" step="2">
      配置节点类型
    </v-stepper-step>
    <v-stepper-content step="2">
      <v-card color="grey darken-4" class="card">
        <v-card-text>
          <form ref="nodeTypeForm">
            <h3>选择NameNode的节点</h3>
            <v-select
              label="NameNode"
              :items="nodes"
              item-text="hostname"
              v-model="nodeTypeForm.nameNode"
              chips
              persistent-hint
              style="width: 400px"
            ></v-select>
          </form>
        </v-card-text>
      </v-card>
      <v-btn color="primary" @click="nodeTypeNext" class="button"> 继续 </v-btn>
      <v-btn color="secondary" class="button" @click="nodeTypeBack">
        上一步
      </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="step > 3" step="3"> 选择组件 </v-stepper-step>
    <v-stepper-content step="3">
      <v-card color="grey darken-4" class="mb-12">
        <v-card-text>
          <h3>选择需要部署的组件</h3>
          <v-data-table
            :headers="componentMsg.header"
            :items="componentMsg.data"
            hide-default-footer
            v-ripple="false"
          >
            <template v-slot:item.choose="{ item }">
              <v-simple-checkbox v-model="item.choose"></v-simple-checkbox>
            </template>
            <template v-slot:item.version="{ item }">
              <v-select :items="item.version" label="Standard"></v-select>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
      <v-btn color="primary" @click="componentNext" class="button">
        继续
      </v-btn>
      <v-btn color="secondary" @click="componentBack" class="button">
        上一步
      </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="step > 4" step="4">
      下载并分发组件
    </v-stepper-step>
    <v-stepper-content step="4">
      <v-card color="grey darken-4" class="mb-12">
        <v-card-text>
          <v-expansion-panels accordion>
            <v-expansion-panel>
              <v-expansion-panel-header style="height: 100px">
                <download-progress
                  name="总"
                  :download-progress="5"
                  :componentProgerss="10"
                ></download-progress>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list v-for="node in DownloadMsg.data" :key="node.name">
                  <v-container>
                    <h6>{{ node.name }}下载进度</h6>
                    <v-progress-linear style="width: 90%"> </v-progress-linear>
                  </v-container>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
      </v-card>
      <v-btn color="primary" @click="downloadNext" class="button"> 继续 </v-btn>
      <v-btn color="secondary" class="button" @click="downloadBack">
        上一步
      </v-btn>
    </v-stepper-content>

    <v-stepper-step step="5"> 构建集群 </v-stepper-step>
    <v-stepper-content step="5">
      <v-card color="grey darken-4" class="mb-12">
        <v-card-text>
          <v-progress-linear
            color="primary"
            buffer-value="0"
            stream
            style="margin-bottom: 30px; margin-top: 50px"
          ></v-progress-linear>
          <v-list
      subheader
      two-line
    >
      <v-subheader inset>Folders</v-subheader>

      <v-list-item
        v-for="folder in folders"
        :key="folder.title"
      >

        <v-list-item-content>
          <v-list-item-title v-text="folder.title"></v-list-item-title>

          <v-list-item-subtitle v-text="folder.subtitle"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-checkbox-marked-circle</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
        </v-card-text>
      </v-card>
      <v-btn color="primary" @click="step = 5" class="button"> 继续 </v-btn>
      <v-btn color="secondary" class="button" @click="step = 4"> 上一步 </v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
import DownloadProgress from '@/components/DownloadProgress'
export default {

  name: 'colonydeploy',
  components: {
    DownloadProgress
  },
  data () {
    return {
      step: 1,
      name: 'helloworld',
      componentJs: {},
      nodes: [],
      colonyInitForm: {
        name: '',
        nodeList: []
      },
      nodeTypeForm: {
        nameNode: ''
      },
      nodesMsg: {
        header: [
          {
            name: 'Choose',
            value: 'choose',
            sortable: false,
            align: 'start'

          },
          {
            text: 'HostName',
            value: 'hostname'
          },
          {
            text: 'Ip',
            value: 'ip'
          }
        ],
        data: [
        ]
      },
      componentMsg: {
        header: [
          {
            name: 'Choose',
            value: 'choose',
            sortable: false,
            align: 'start'

          },
          {
            text: 'Name',
            value: 'name'
          },
          {
            text: 'Des',
            value: 'des'
          },
          {
            text: 'Version',
            value: 'version',
            width: 300
          }
        ],
        data: [
        ]
      },
      DownloadMsg: {
        data: [
          {
            name: 'node1'
          },
          {
            name: 'node2'
          }
        ]
      },
        files: [
        {
          color: 'blue',
          icon: 'mdi-clipboard-text',
          subtitle: 'Jan 20, 2014',
          title: 'Vacation itinerary',
        },
        {
          color: 'amber',
          icon: 'mdi-gesture-tap-button',
          subtitle: 'Jan 10, 2014',
          title: 'Kitchen remodel',
        },
      ],
      folders: [
        {
          subtitle: 'Jan 9, 2014',
          title: 'Photos',
        },
        {
          subtitle: 'Jan 17, 2014',
          title: 'Recipes',
        },
        {
          subtitle: 'Jan 28, 2014',
          title: 'Work',
        },
      ]
      
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$axios.get('/api/v1/colony').then(res => {
        console.log(res.data)
        this.nodesMsg.data = res.data.data.nodesMsgList
        this.componentMsg.data = res.data.data.componentMsgList
      })
    },
    colonyInitNext () {
      this.step = 2
      // this.$axios.post('/api/v1/colony', this.nodesMsg.data).then(res => {

      // })
      this.nodes = this.nodesMsg.data.filter(function (value) {
        if (value.choose === true) {
          return value
        }
      })
      console.log(this.nodes)
    },
    nodeTypeNext () {
      this.step = 3
    },
    nodeTypeBack () {
      this.step = 1
    },
    componentNext () {
      this.step = 4
    },
    componentBack () {
      this.step = 2
    },
    downloadNext () {
      this.step = 5
    },
    downloadBack () {
      this.step = 3
    }

  }
}
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}
.button {
  width: 100px;
  margin-right: 30px;
}
h3 {
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
