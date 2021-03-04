<template>
  <v-container>
    <v-row>
      <v-col>
        <h6>{{name}}下载进度</h6>
        <v-progress-linear :value="downloadProgress"
                           style="width: 70%">
        </v-progress-linear>
      </v-col>
      <v-col>
        <h6>组件数量</h6>
        <v-progress-linear :value="componentProgerss"
                           style="width: 70%">
        </v-progress-linear>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DownloadProgress",
  props: {
    name: {
      type: String
    },
    downloadProgress: {
      type: Number
    },
    componentProgerss: {
      type: Number
    }
  }
}
</script>

<style scoped>
h6{
  margin-bottom: 10px;
}
</style>
