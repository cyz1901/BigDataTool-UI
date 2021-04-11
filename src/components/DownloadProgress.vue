<template>
  <v-container>
    <v-row>
      <v-col>
        <h6>总进度 {{nowlDownloadSize}}/{{totalDownloadSize}}</h6>
        <v-progress-linear :value="nowlDownloadSize/totalDownloadSize * 100"
                           style="width: 70%">
        </v-progress-linear>
      </v-col>
      <v-col>
        <h6>组件数量 {{nowComponents}}/{{totalComponents}} </h6>
        <v-progress-linear :value="nowComponents/totalComponents * 100"
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
    totalComponents: {
      type: Number
    },
    nowComponents: {
      type: Number
    },
    totalDownloadSize: {
      type: Number
    },
    nowlDownloadSize: {
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
