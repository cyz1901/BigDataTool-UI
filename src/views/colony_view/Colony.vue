<template>
  <v-stepper v-model="e6" vertical>
    <v-stepper-step :complete="e6 > 1" step="1">
      集群初始化
      <small>Summarize if needed</small>
    </v-stepper-step>
    <v-stepper-content step="1">
      <v-card color="grey darken-4" class="mb-12">
        <v-card-text>
          <v-container fluid>
            <v-text-field
              label="集群名称"
              clearable
              style="width: 250px"
            ></v-text-field>

            <v-select
              label="选择需要部署的节点"
              multiple
              chips
              hint="What are the target regions"
              persistent-hint
              style="width: 400px"
            ></v-select>
          </v-container>
        </v-card-text>
      </v-card>
      <v-btn color="primary" @click="e6 = 2"> Continue </v-btn>
      <v-btn text> Cancel </v-btn>
    </v-stepper-content>
    <v-stepper-step :complete="e6 > 2" step="2"> 版本选择 </v-stepper-step>
    <v-stepper-content step="2">
      <v-card color="grey darken-4" class="mb-12">
        <v-card-text>
          <v-progress-linear
            color="primary"
            buffer-value="0"
            stream
            style="margin-bottom: 30px"
          ></v-progress-linear>
          <v-textarea
            outlined
            name="input-7-4"
            label="输出日志"
            value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
            :disabled="true"
          ></v-textarea>
        </v-card-text>
      </v-card>
      <v-btn color="primary" @click="e6 = 3"> Continue </v-btn>
      <v-btn text> Cancel </v-btn>
    </v-stepper-content>
    <v-stepper-step :complete="e6 > 3" step="3"> 组件部署 </v-stepper-step>
    <v-stepper-content step="3">
      <v-card color="grey darken-4" class="mb-12">
        <v-card-text>
          <v-progress-linear
            color="primary"
            buffer-value="0"
            stream
            style="margin-bottom: 30px"
          ></v-progress-linear>
          <v-textarea
            outlined
            name="input-7-4"
            label="输出日志"
            value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
            :disabled="true"
          ></v-textarea>
        </v-card-text>
      </v-card>
      <v-btn color="primary" @click="e6 = 4"> Continue </v-btn>
      <v-btn text> Cancel </v-btn>
    </v-stepper-content>
    <v-stepper-step :complete="e6 > 4" step="4">
      Select an ad format and name ad unit
    </v-stepper-step>
    <v-stepper-content step="4">
      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
      <v-btn color="primary" @click="e6 = 5"> Continue </v-btn>
      <v-btn text> Cancel </v-btn>
    </v-stepper-content>
    <v-stepper-step step="5"> View setup instructions </v-stepper-step>
    <v-stepper-content step="5">
      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
      <v-btn color="primary" @click="e6 = 1"> Continue </v-btn>
      <v-btn text> Cancel </v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
export default {
  name: 'colony',
  data () {
    return {
      e6: 1
    }
  }
}
</script>

<style scoped>
</style>
