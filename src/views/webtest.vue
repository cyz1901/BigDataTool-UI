<template>
  <v-main>
    <v-btn @click="on"> hello </v-btn>
  </v-main>
</template>

<script>
var _this
export default {
  name: 'webtest',
  // 其他数据。。。
  mounted () {
    _this = this
  },
  data: () => ({
    thriftConnection: null,
    DownloadMsg: {
      allData: {
        totalComponents: '',
        nowComponents: '1111',
        totalDownloadSize: '',
        nowlDownloadSize: ''
      },
      nodeData: [
        {
          name: 'node1',
          totalDownloadSize: '',
          nowlDownloadSize: ''
        },
        {
          name: 'node2',
          totalDownloadSize: '',
          nowlDownloadSize: ''
        }
      ]
    }
  }),
  methods: {
    on () {
      let ws = new WebSocket('ws://127.0.0.1:8000/api/websocket/download')
      // 连接建立时触发
      ws.onopen = function () {
        console.log('WebSocket已连接')
        // 使用连接发送数据
        ws.send(JSON.stringify(_this.DownloadMsg))
      }
      ws.onmessage = function (evt) {
        console.log(evt.data)
      }
      ws.onclose = function () {

      }
      // 完成后可以下一步
    }
  }
}

</script>

<style scoped></style>
