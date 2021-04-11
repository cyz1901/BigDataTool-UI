<template>
  <v-container style="height: 100%; width: 80%">
    <v-card style="padding: 30px">
      <v-form ref="settingForm">
        <v-row
          align="start"
          justify="center"
          no-gutters
          v-for="(config, i) in settingForm.data"
          :key="i"
        >
          <v-col cols="6" md="6">
            <v-text-field
              v-model="config.value"
              :label="config.name"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-row justify="center">
        <v-btn @click="updateSetting"> Save </v-btn>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Setting',
  mounted () {
    this.init()
  },
  data: () => ({
    settingForm: {
      data: [
      ]
    }
  }),
  methods: {
    init () {
      this.getSetting()
    },
    updateSetting () {
      this.$axios.post('/api/v1/setting/update', this.settingForm.data).then(res => {
        this.getSetting()
      })
    },
    getSetting () {
      this.$axios.get('/api/v1/setting/get').then(res => {
        console.log(res.data.data)
        this.settingForm.data = res.data.data
      })
    }
  }
}
</script>

<style scoped>
</style>
