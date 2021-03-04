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
            <v-form ref="configForm">
              <v-text-field
                label="集群名称"
                v-model="configForm.name"
                clearable
                style="width: 250px"
              ></v-text-field>
              <v-select
                label="选择需要部署的节点"
                multiple
                :items="nodes"
                v-model="configForm.nodeList"
                chips
                hint="What are the target regions"
                persistent-hint
                style="width: 400px"
              ></v-select>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
      <v-btn color="primary" @click="e6 = 2"> 继续 </v-btn>
      <v-btn text> 返回 </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 2" step="2"> 配置节点类型 </v-stepper-step>
    <v-stepper-content step="2">
      <v-card color="grey darken-4" class="mb-12">
        <v-card-text>
          <form ref="nodeTypeForm">
            <v-select
              label="选择NameNode"
              :items="nodes"
              v-model="configForm.nameNode"
              chips
              hint="What are the target regions"
              persistent-hint
              style="width: 400px"
            ></v-select>
          </form>
        </v-card-text>
      </v-card>
      <v-btn color="primary" @click="e6 = 3"> Continue </v-btn>
      <v-btn text> Cancel </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 3" step="3"> 选择组件 </v-stepper-step>
    <v-stepper-content step="3">
      <v-card color="grey darken-4" class="mb-12">
        <v-card-text>
          <v-data-table
            :headers="componentMsg.header"
            :items="componentMsg.data"
            hide-default-footer
          >
            <template v-slot:item.version="{ item }" style="width: 100px">
              <v-select
                :items="nodes"
                label="Standard"
              ></v-select>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
      <v-btn color="primary" @click="e6 = 4"> Continue </v-btn>
      <v-btn text @click="e6 = 2"> Cancel </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 4" step="4">
      Select an ad format and name ad unit
    </v-stepper-step>
    <v-stepper-content step="4">
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
      <v-btn color="primary" @click="e6 = 5"> Continue </v-btn>
      <v-btn text> Cancel </v-btn>
    </v-stepper-content>

    <v-stepper-step step="5"> View setup instructions </v-stepper-step>
    <v-stepper-content step="5">
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
      <v-btn color="primary" @click="e6 = 5"> Continue </v-btn>
      <v-btn text> Cancel </v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
export default {
  name: 'colony',
  data () {
    return {
      e6: 1,
      nodes: ['node1', 'node2'],
      name: 'helloworld',
      componentJs: {},
      configForm: {
        name: '',
        nodeList: []
      },
      nodeTypeForm: {
        nameNode: ''
      },
      componentMsg: {
        header: [
          {
            text: 'Name',
            value: 'name'
          },
          {
            text: 'Des',
            value: 'des'
          },
          { text: 'Version',
            value: 'version'
          },
        ],
        data: [
          {
            name: 'hadoop',
            des: 'xxxxx'
          }
        ]
      },
    }
  }
}
</script>

<style scoped>
</style>
