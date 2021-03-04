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

              <v-data-table
                :headers="nodesMsg.header"
                :items="nodesMsg.data"
                hide-default-footer
              >
                <template v-slot:item.choose="{ item }">
                  <v-simple-checkbox
                    v-model="item.choose"
                  ></v-simple-checkbox>
                </template>
              </v-data-table>
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
            <template v-slot:item.choose="{ item }">
              <v-simple-checkbox
                v-model="item.choose"
              ></v-simple-checkbox>
            </template>
            <template v-slot:item.version="{ item }">
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
      download and fenfa zujian 
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
            style="margin-bottom: 30px; margin-top: 50px"
          ></v-progress-linear>
          <v-expansion-panels accordion>
              <v-expansion-panel
                v-for="(item,i) in 5"
                :key="i"
              >
                <v-expansion-panel-header>
                  Item
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
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
      name: 'helloworld',
      componentJs: {},
      configForm: {
        name: '',
        nodeList: []
      },
      nodeTypeForm: {
        nameNode: ''
      },
      nodesMsg: {
        header: [
          {
            name: 'Choose',
            value: 'choose',
            sortable: false,
            align: 'start'

          },
          {
            text: 'HostName',
            value: 'hostname'
          },
          {
            text: 'Ip',
            value: 'ip'
          }
        ],
        data: [
          {
            hostname: 'node1',
            ip: '196.168.1.1',
            choose: false
          }
        ]
      },
      componentMsg: {
        header: [
          {
            name: 'Choose',
            value: 'choose',
            sortable: false,
            align: 'start'

          },
          {
            text: 'Name',
            value: 'name'
          },
          {
            text: 'Des',
            value: 'des'
          },
          { text: 'Version',
            value: 'version',
            width: 300
          },
        ],
        data: [
          {
            name: 'hadoop',
            des: 'xxxxx',
            version: '',
            choose: true
          }
        ]
      },
    }
  }
}
</script>

<style scoped>
</style>
