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

    },

    onn () {
      const thrift = require('thrift')
      var HelloWorldService = require('../gen-nodejs/HelloWorldService')
      var ttypes = require('../gen-nodejs/hello_types')

      var transport = thrift.TBinaryProtocol
      console.log(transport)
      // var protocol = thrift.TBinaryProtocol
      // console.log(typeof thrift)
      console.log(typeof thrift)
      var tt = thrift.createConnection('localhost', 9090)

      // connection.on('error', function(err) {
      //   assert(false, err)
      // })

      // client.say("LOL", function(err, message) {
      //   console.log('15-10=' + message);

      //   client.getStruct(1, function(err, message){
      //     console.log('Check log: ' + message.value);

      //     //close the connection once we're done
      //     connection.end();
      //   })
      // })

      // console.log(thriftConnection)
    }
  }
}
</script>

<style scoped>

</style>
