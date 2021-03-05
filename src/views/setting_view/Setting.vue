<template>
<v-container style="height: 100%; width: 80%">
  <v-form ref="settingForm">
  <v-row
    align="start"
    justify="center"
    no-gutters
    v-for="item in settingForm.data"
    :key="item"
  >
    <v-col
        cols="6"
        md="6"
    >
    <v-text-field
        v-model="item.value"
        :counter="10"
        :label="item.name"
        required
    ></v-text-field>
    </v-col>
  </v-row>
  
  </v-form>
</v-container>
</template>

<script>
export default {
  name: 'Setting',
  mounted() {
    this.init()
  },
  data: () => ({
    settingForm: {
      data: [
        {
          name: 'resname',
          value: 'XXXXXXXXX'
        },
        {
          name: 'resname',
          value: 'XXXXXXXXX'
        }
      ]
    }
  }),
  methods: {
    init() {
      this.$axios.get('/api/v1/setting').then(res => {
      console.log(res.data)
      this.nodesMsg.data = res.data.nodesMsg.data
    })
    }
  }
}
</script>

<style scoped>
</style>
