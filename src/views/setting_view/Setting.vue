<template>
  <v-container style="height: 100%; width: 80%">
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
      this.$axios.get('/api/v1/setting').then(res => {
        this.settingForm.data.push(res.data.data)
      })
    }
  }
}
</script>

<style scoped>
</style>
