<template>
  <v-card color="grey darken-4">
    <v-container >
      <v-chart class="chart" :option="option" />
    </v-container>
  </v-card>
</template>

<script>

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart,LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridSimpleComponent,
  GridComponent,
  MarkLineComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

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
]);

export default {
  name: "ColonyMonitor",
  components: {
    VChart
  },
  data() {
    return {
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true
        }]
      }
    };
  }
};
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
