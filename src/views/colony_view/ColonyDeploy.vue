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
          <h3>选择部署方式</h3>
          <v-select>

          </v-select>
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
          <v-container>
            <v-row align="end" justify="end">
              <v-btn @click="downloadComponent" color="primary" width="150px"> 下载 </v-btn>
            </v-row>
            <v-row>
              <v-expansion-panels accordion>
                <v-expansion-panel>
                  <v-expansion-panel-header style="height: 100px">
                    <download-progress
                      name="总"
                      :nowlDownloadSize="DownloadMsg.allData.nowlDownloadSize"
                      :totalDownloadSize="DownloadMsg.allData.totalDownloadSize"
                      :nowComponents="DownloadMsg.allData.nowComponents"
                      :totalComponents="DownloadMsg.allData.totalDownloadSize"
                    ></download-progress>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-list
                      v-for="node in DownloadMsg.nodeData"
                      :key="node.name"
                    >
                      <v-container>
                        <h6>{{ node.name }}下载进度</h6>
                        <v-progress-linear
                          color="progressColor(node.status)"
                          style="width: 90%"
                          :value="node.nowlDownloadSize / node.totalDownloadSize * 100"
                        >
                        </v-progress-linear>
                      </v-container>
                    </v-list>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
          </v-container>
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
          <v-list subheader two-line>
            <v-subheader inset>Folders</v-subheader>

            <v-list-item v-for="folder in folders" :key="folder.title">
              <v-list-item-content>
                <v-list-item-title v-text="folder.title"></v-list-item-title>

                <v-list-item-subtitle
                  v-text="folder.subtitle"
                ></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1"
                    >mdi-checkbox-marked-circle</v-icon
                  >
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
var _this
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
        allData: {
          totalComponents: 0,
          nowComponents: 0,
          totalDownloadSize: 0,
          nowlDownloadSize: 0
        },
        nodeData: [
          {
            name: 'node1',
            totalDownloadSize: 0,
            nowlDownloadSize: ''
          },
          {
            name: 'node2',
            totalDownloadSize: 0,
            nowlDownloadSize: 0
          }
        ]
      },
      folders: [
        {
          subtitle: '解压组件',
          title: '解压'
        },
        {
          subtitle: '初始化集群',
          title: '初始化'
        }
      ],
      deployMsg: [
        {
          name: '',
          msg: '',
          status: ''
        }
      ]

    }
  },
  mounted () {
    _this = this
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
      // 发送namenode信息
      this.step = 3
    },
    nodeTypeBack () {
      this.step = 1
    },
    componentNext () {
      this.step = 4
      // 完成后可以下一步
    },
    componentBack () {
      this.step = 2
    },
    downloadNext () {
      this.step = 5
      // 执行各种命令 websocket 解压 改配置文件 初始化namenode 群起集群
    },
    downloadBack () {
      this.step = 3
    },

    progressColor (status) {
      if (status === 'run' || status === 'finish') {
        return 'blue'
      } else if (status === 'error') {
        return 'red'
      }
    },
    downloadComponent () {
      let resData
      // 执行下载操作
      let ws = new WebSocket('ws://localhost:8000/api/websocket/download')
      // 连接建立时触发
      ws.onopen = function () {
        // 使用连接发送数据
        ws.send('Hello!')
      }
      ws.onmessage = function (res) {
        resData = JSON.parse(res.data)
        // console.log(resData)
        // if (resData.status === 'run') {
        //   _this.DownloadMsg.nodeData = res.data.nodeData
        // } else if (resData.status === 'error') {
        //
        // } else if (resData.status === 'finish') {
        //
        // }
        _this.DownloadMsg.nodeData = resData.listDataList
        _this.DownloadMsg.allData = resData.allData
        console.log(_this.DownloadMsg.nodeData)
        alert('数据已接收...')
      }


      ws.onclose = function () {
        // 关闭 websocket
        alert('连接已关闭...')
      }
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
