<template>
  <v-main>
    <v-btn
      @click="onn">
      hello
    </v-btn>
  </v-main>
</template>

<script>
// import thrift from 'thrift'
// import { ttypes } from '../gen-nodejs/hadoopDownload_types'
// import { message } from 'node/static_codegen/test_pb.js'
export default {
  name: 'webtest',
  data: () => ({
    thriftConnection: null
  }),
  created() {
    this.init()
  },
  methods: {
    init() {
      console.log("yes")
    },

    onn() {
      // const thrift = require('thrift')
      // var HadoopDownloadService = require('../gen-nodejs/HadoopDownloadService')
      // var ttypes = require('../gen-nodejs/hadoopDownload_types')
      //
      // var transport = thrift.TBufferedTransport;
      // var protocol = thrift.TBinaryProtocol;
      //
      // var connection = thrift.createConnection("127.0.0.1", 9090, {
      //   transport : transport,
      //   protocol : protocol
      // });
      //
      //
      // var client = thrift.createClient(HadoopDownloadService, connection);
      //
      // console.log(client)
      //
      // client.get("hadoop", function(err, message) {
      //   if (err) {
      //     console.log("InvalidOperation " + err);
      //     connection.end()
      //   } else {
      //     console.log('Whoa? You know how to divide by zero?');
      //     console.log(message.hadoopMap)
      //     connection.end()
      //   }
      // })
      //1、定义service，service位于Student_grpc_pb.js中
      var service = require('@/gen/test_grpc_pb.js');
      //2、定义消息
      var message = require('@/gen/test_pb.js');
      //3、引入grpc库
      var grpc = require('grpc');
      //4、定义客户端
      var client = new service.AddServiceService('localhost:9999', grpc.credentials.createInsecure());
      //5、定义请求message（与动态生成方式不同）
      var request = new message.AddRequest();
      request.setA(1);
      request.setB(2)
      //6、调用rpc方法
      client.add(request, function (error, respData) {
        //静态调用方式是以方法调用的方式获取返回结果，因为rpc的返回值在编译期可见，而动态方式rpc返回值编辑期不可见、是通过属性的方式获取结果
        console.log(respData);//打印返回结果
      })
    }
  }
}
</script>

<style scoped>

</style>
