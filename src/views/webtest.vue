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
export default {
  name: 'webtest',
  data: () => ({
    thriftConnection: null
  }),
  created () {
    this.init()
  },
  methods: {
    init () {
      console.log("yes")
    },

    onn () {
      const thrift = require('thrift')
      var HadoopDownloadService = require('../gen-nodejs/HadoopDownloadService')
      var ttypes = require('../gen-nodejs/hadoopDownload_types')

      var transport = thrift.TBufferedTransport;
      var protocol = thrift.TBinaryProtocol;

      var connection = thrift.createConnection("127.0.0.1", 9090, {
        transport : transport,
        protocol : protocol
      });


      var client = thrift.createClient(HadoopDownloadService, connection);

      console.log(client)

      client.get("hadoop", function(err, message) {
        if (err) {
          console.log("InvalidOperation " + err);
          connection.end()
        } else {
          console.log('Whoa? You know how to divide by zero?');
          console.log(message.hadoopMap)
          connection.end()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
