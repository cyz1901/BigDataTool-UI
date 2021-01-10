<template>
  <v-stepper
    v-model="e6"
    vertical
  >
    <v-stepper-step
      :complete="e6 > 1"
      step="1"
    >
      选择集群组件
      <small>Summarize if needed</small>
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card
        color="grey darken-4"
        class="mb-12"
      >
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <v-checkbox
                  v-model="ex4"
                  label="red"
                  color="red"
                  value="red"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="ex4"
                  label="red darken-3"
                  color="red darken-3"
                  value="red darken-3"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <v-checkbox
                  v-model="ex4"
                  label="indigo"
                  color="indigo"
                  value="indigo"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="ex4"
                  label="indigo darken-3"
                  color="indigo darken-3"
                  value="indigo darken-3"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <v-checkbox
                  v-model="ex4"
                  label="orange"
                  color="orange"
                  value="orange"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="ex4"
                  label="orange darken-3"
                  color="orange darken-3"
                  value="orange darken-3"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>

            <v-row class="mt-12">
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <v-checkbox
                  v-model="ex4"
                  label="primary"
                  color="primary"
                  value="primary"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="ex4"
                  label="secondary"
                  color="secondary"
                  value="secondary"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <v-checkbox
                  v-model="ex4"
                  label="success"
                  color="success"
                  value="success"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="ex4"
                  label="info"
                  color="info"
                  value="info"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <v-checkbox
                  v-model="ex4"
                  label="warning"
                  color="warning"
                  value="warning"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="ex4"
                  label="error"
                  color="error"
                  value="error"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
      <v-btn
        color="primary"
        @click="e6 = 2"
      >
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 2"
      step="2"
    >
      Configure analytics for this app
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card
        color="grey darken-4"
        class="mb-12"
      >
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
            disabled=":true"
          ></v-textarea>
        </v-card-text>
      </v-card>
      <v-btn
        color="primary"
        @click="e6 = 3"
      >
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 3"
      step="3"
    >
      Select an ad format and name ad unit
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
      ></v-card>
      <v-btn
        color="primary"
        @click="e6 = 4"
      >
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step step="4">
      View setup instructions
    </v-stepper-step>
    <v-stepper-content step="4">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
      ></v-card>
      <v-btn
        color="primary"
        @click="e6 = 1"
      >
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
export default {
  name: "colony",
  data() {
    return {
      e6: 1,
    };
  },
};
</script>

<style scoped>
</style>
