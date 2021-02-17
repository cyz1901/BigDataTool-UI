<template>
  <v-main>
    <v-btn @click="on"> hello </v-btn>
  </v-main>
</template>

<script>
export default {
  name: 'webtest',
  data: () => ({
    thriftConnection: null
  }),
  created () {
    this.init()
  },
  mounted () {
    this.$axios.get('/api/start').then(Response => {
      console.log(Response.data)
    })
  },
  methods: {
    init () {
      console.log('yes')
    },

    on () {

    }
  }
}
</script>

<style scoped></style>
