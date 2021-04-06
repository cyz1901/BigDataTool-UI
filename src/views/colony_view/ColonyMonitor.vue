<template>
  <v-container>
    <v-col>
      <v-row>
        <v-card color="grey darken-4">
          <v-chart class="chart" :option="option" />
        </v-card>
        <v-card color="grey darken-4">
          <v-chart class="chart" :option="option" />
        </v-card>
      </v-row>
      <v-row>
        <v-card color="grey darken-4">
          <v-chart class="chart" :option="option" />
        </v-card>
        <v-card color="grey darken-4">
          <v-chart class="chart" :option="option" />
        </v-card>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>

import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridSimpleComponent,
  GridComponent,
  MarkLineComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  LineChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridSimpleComponent,
  GridComponent,
  MarkLineComponent
])

export default {
  name: 'ColonyMonitor',
  components: {
    VChart
  },
  data () {
    return {
      option: {
        title: {
          text: '内存监控',
          x: 'center'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '富国',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134]
          },
          {
            name: '易方达',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234]
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.chart {
  height: 250px;
  width: 400px;
  margin-left: 10px;
}
</style>
