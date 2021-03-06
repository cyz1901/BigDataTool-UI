<template>
  <v-stepper v-model="step" vertical>
    <v-stepper-step :complete="step > 1" step="1"> 集群初始化 </v-stepper-step>
    <v-stepper-content step="1">
      <v-card color="grey darken-4" class="card">
        <v-card-text>
          <v-container fluid>
            <v-form ref="deployRequest">
              <h3>输入集群名称</h3>
              <v-text-field
                label="集群名称"
                v-model="deployRequest.colonyName"
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

    <v-stepper-step :complete="step > 2" step="2"> 选择组件 </v-stepper-step>
    <v-stepper-content step="2">
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
              <v-select
                :items="item.version"
                v-model="item.chooseVersion"
                label="Standard"
              ></v-select>
            </template>
          </v-data-table>
          <h3>选择部署方式</h3>
          <v-select
            @change="showFile"
            style="width: 30%"
            :items="deploySelect.deployWay"
            v-model="deployRequest.deployWay"
          >
          </v-select>
          <h3>选择部署类型</h3>
          <v-select
            @change="showSecondaryNameNode"
            style="width: 30%"
            :items="deploySelect.deployType"
            v-model="deployRequest.deployType"
          >
          </v-select>
          <template v-if="deployDistributeShow">
            <h3>选择分发的文件</h3>
            <v-file-input
              v-model="fileUpload"
              label="分发组件选择"
              style="width: 30%"
            ></v-file-input>
          </template>
        </v-card-text>
      </v-card>
      <v-btn
        color="primary"
        :loading="componentNextButtonLoading"
        :disabled="componentNextButtonDisabled"
        @click="componentNext"
        class="button"
      >
        继续
      </v-btn>
      <v-btn color="secondary" @click="componentBack" class="button">
        上一步
      </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="step > 3" step="3">
      配置节点类型
    </v-stepper-step>
    <v-stepper-content step="3">
      <v-card color="grey darken-4" class="card">
        <v-card-text>
          <form ref="nodeTypeForm">
            <h3>选择NameNode的节点</h3>
            <v-select
              label="NameNode"
              :items="nodes"
              item-text="hostname"
              v-model="nodesMsg.nameNode"
              chips
              persistent-hint
              style="width: 30%"
            ></v-select>
            <template v-if="secondaryNameNodeShow">
              <h3>选择SecondaryNameNode的节点</h3>
              <v-select
                label="SecondaryNameNode"
                :items="nodes"
                item-text="hostname"
                v-model="nodesMsg.secondaryNameNode"
                chips
                persistent-hint
                style="width: 30%"
              ></v-select>
            </template>
          </form>
        </v-card-text>
      </v-card>
      <v-btn color="primary" @click="nodeTypeNext" class="button"> 继续 </v-btn>
      <v-btn color="secondary" class="button" @click="nodeTypeBack">
        上一步
      </v-btn>
    </v-stepper-content>
    <v-stepper-step :complete="step > 4" step="4">
      下载或分发组件
    </v-stepper-step>
    <v-stepper-content step="4">
      <v-card color="grey darken-4" class="mb-12">
        <v-card-text>
          <v-container>
            <v-row align="end" justify="end">
              <v-btn
                @click="downloadComponent"
                width="150px"
                style="margin-bottom: 20px"
              >
                {{ deployBtnName }}
              </v-btn>
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
                      :totalComponents="DownloadMsg.allData.totalComponents"
                    ></download-progress>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-list
                      v-for="node in DownloadMsg.nodeData"
                      :key="node.name"
                    >
                      <v-container>
                        <h6>
                          {{ node.name }}{{ deployRequest.deployWay }}进度
                        </h6>
                        <v-progress-linear
                          color="progressColor(node.status)"
                          style="width: 90%"
                          :value="
                            (node.nowlDownloadSize / node.totalDownloadSize) *
                            100
                          "
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
            :value="deployProgress"
            stream
            style="margin-bottom: 30px; margin-top: 50px"
          ></v-progress-linear>
          <v-list subheader two-line>
            <v-subheader inset></v-subheader>

            <v-list-item v-for="folder in deployMsg" :key="folder.title">
              <v-list-item-content>
                <v-list-item-title v-text="folder.title"></v-list-item-title>

                <v-list-item-subtitle
                  v-text="folder.subtitle"
                ></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon>
                  <v-icon :color="deployIconColour(folder.status)">{{
                    deployIconStatus(folder.status)
                  }}</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
      <v-btn
        color="primary"
        @click="deploy"
        class="button"
        :disabled="deployButtonDisabled"
        :loading="deployButtonLoading"
      >
        {{ deployButtonData }}
      </v-btn>
      <v-btn color="secondary" class="button" @click="step = 4"> 上一步 </v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
import DownloadProgress from '@/components/DownloadProgress'
import { conversion } from '@/utils/calculation'
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
      deployProgress: 0,
      deployBtnName: '',
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
        ],
        nameNode: '',
        secondaryNameNode: ''
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
      componentDownloadRequest: '',
      componentDistribute: null,
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
        ],
        status: ''
      },
      deploySelect: {
        deployWay: [
          '下载',
          '分发'
        ],
        deployType: [
          '单机',
          '分布式'
        ]
      },
      deployMsg: [
        {
          title: '解压',
          subtitle: '解压组件',
          status: 'defeat'
        },
        {
          title: '配置',
          subtitle: '更改配置文件',
          status: 'defeat'
        },
        {
          title: '初始化',
          subtitle: '初始化集群',
          status: 'defeat'
        }
      ],
      deployRequest: {
        colonyName: '',
        deployWay: '',
        deployType: '',
        nodeData: [],
        componentData: []
      },
      fileUpload: null,
      deployDistributeShow: false,
      secondaryNameNodeShow: false,
      deployButtonData: '部署',
      deployButtonDisabled: false,
      deployButtonLoading: false,
      componentNextButtonDisabled: false,
      componentNextButtonLoading: false
    }
  },
  mounted () {
    _this = this
    this.init()
  },
  methods: {
    init () {
      this.$axios.get('/api/v1/colony').then(res => {
        this.nodesMsg.data = res.data.data.nodesMsgList
        this.componentMsg.data = res.data.data.componentMsgList
      })
    },
    colonyInitNext () {
      this.step = 2
      this.nodes = this.nodesMsg.data.filter(function (value) {
        if (value.choose === true) {
          return value
        }
      })
    },
    componentNext () {
      // 完成后可以下一步
      this.componentDownloadRequest = this.componentMsg.data.map(function (value) {
        if (value.choose === true) {
          return {
            name: value.name,
            version: value.chooseVersion
          }
        }
      })
      console.log(this.fileUpload)
      if (this.deployRequest.deployWay === '下载') {
        this.deployBtnName = '下载'
        this.step = 3
      } else if (this.deployRequest.deployWay === '分发') {
        this.deployBtnName = '分发'
        this.componentNextButtonLoading = true
        this.componentNextButtonDisabled = true
        var formData = new window.FormData()
        if (this.fileUpload !== null) {
          formData.append('fileUpload', this.fileUpload)
          this.componentDistribute = this.fileUpload.name
        }
        this.$axios.post('/api/v1/colony/file', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          _this.componentNextButtonDisabled = false
          _this.componentNextButtonLoading = false
          this.step = 3
        })
      }
    },
    componentBack () {
      this.step = 1
    },
    nodeTypeNext () {
      // 发送namenode信息
      this.step = 4
    },
    nodeTypeBack () {
      this.step = 2
    },
    showSecondaryNameNode () {
      if (this.deployRequest.deployType === '单机') {
        this.secondaryNameNodeShow = false
      } else if (this.deployRequest.deployType === '分布式') {
        this.secondaryNameNodeShow = true
      }
    },

    showFile () {
      if (this.deployRequest.deployWay === '下载') {
        this.deployDistributeShow = false
      } else if (this.deployRequest.deployWay === '分发') {
        this.deployDistributeShow = true
      }
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
    showDeployWay () {

    },
    downloadComponent () {
      let resData
      // 判断是下载还是分发
      if (this.deployRequest.deployWay === '下载') {
        // 执行下载操作
        let ws = new WebSocket('ws://localhost:8000/api/websocket/download')
        // 连接建立时触发
        ws.onopen = function () {
          // 使用连接发送数据
          ws.send(JSON.stringify(_this.componentDownloadRequest))
        }
        ws.onmessage = function (res) {
          resData = JSON.parse(res.data)
          console.log(resData)
          if (resData.status === 'run') {
            _this.DownloadMsg.nodeData = resData.listDataList
            _this.DownloadMsg.allData = resData.allData
            console.log(_this.DownloadMsg.nodeData)
          } else if (resData.status === 'error') {

          } else if (resData.status === 'finish') {
            _this.DownloadMsg.nodeData = resData.listDataList
            _this.DownloadMsg.allData = resData.allData
            console.log(_this.DownloadMsg.nodeData)
            ws.close()
          }
        }
      } else if (this.deployRequest.deployWay === '分发') {
        // 执行下载操作
        let ws = new WebSocket('ws://localhost:8000/api/websocket/distribute')
        // 连接建立时触发
        ws.onopen = function () {
          // 使用连接发送数据
          ws.send(JSON.stringify(_this.componentDistribute))
        }
        ws.onmessage = function (res) {
          resData = JSON.parse(res.data)
          console.log(resData)
          if (resData.status === 'run') {
            _this.DownloadMsg.nodeData = resData.listDataList
            _this.DownloadMsg.allData = resData.allData
            console.log(_this.DownloadMsg.nodeData)
          } else if (resData.status === 'error') {

          } else if (resData.status === 'finish') {
            _this.DownloadMsg.nodeData = resData.listDataList
            _this.DownloadMsg.allData = resData.allData
            console.log(_this.DownloadMsg.nodeData)
            ws.close()
          }
        }
      }
    },

    deploy () {
      if (this.deployButtonData === '部署') {
        // 按钮效果
        this.deployButtonDisabled = true
        this.deployButtonLoading = true
        // 构造部署数据
        let resData
        this.deployRequest.nodeData = this.nodesMsg.data
        console.log(this.nodesMsg.nameNode)
        this.deployRequest.nodeData.map((value, index) => {
          if (value.hostname === this.nodesMsg.nameNode) {
            value.nodeType = 'nameNode'
          } else {
            value.nodeType = 'dataNode'
          }
          delete value.choose
        })
        console.log(this.deployRequest.nodeData)
        this.deployRequest.componentData = this.componentDownloadRequest
        this.deployRequest.nameNode = this.nodesMsg.nameNode
        this.deployRequest.secondaryNameNode = this.nodesMsg.secondaryNameNode

        // 执行部署操作
        let ws = new WebSocket('ws://localhost:8000/api/websocket/deploy')
        // 连接建立时触发
        ws.onopen = function () {
          // 使用连接发送数据
          ws.send(JSON.stringify(_this.deployRequest))
          console.log(_this.deployRequest)
        }
        ws.onmessage = function (res) {
          resData = JSON.parse(res.data)
          console.log(resData)
          if (resData.title === 'extract') {
            _this.deployMsg[0].status = resData.status
            _this.deployMsg[0].subtitle = resData.subtitle
            _this.deployProgress = 30
          } else if (resData.title === 'configure') {
            _this.deployMsg[1].status = resData.status
            _this.deployMsg[1].subtitle = resData.subtitle
            _this.deployProgress = 60
          } else if (resData.title === 'init') {
            _this.deployMsg[2].status = resData.status
            _this.deployMsg[2].subtitle = resData.subtitle
            _this.deployProgress = 90
          } else if (resData.title === 'close') {
            _this.deployProgress = 100
            _this.deployButtonDisabled = false
            _this.deployButtonLoading = false
            _this.deployButtonData = '完成'
            console.log('close')
            ws.close()
            alert('deploy连接已关闭...')
          }
        }
      } else {
        console.log('完成')
      }
    },
    deployNamenode () {
      console.log('type')
    },
    deployIconColour (status) {
      if (status === 'defeat') {
        return 'grey lighten-1'
      } else if (status === 'success') {
        return 'blue'
      } else if (status === 'error') {
        return 'red'
      }
    },
    deployIconStatus (status) {
      if (status === 'error') {
        return 'mdi-alert-circle'
      } else {
        return 'mdi-checkbox-marked-circle'
      }
    },
    conversionKb (param) {
      let a = conversion(param)
      return a
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
  margin-top: 15px;
}
</style>
