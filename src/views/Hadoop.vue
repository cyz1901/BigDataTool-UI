<template>
    <v-app-bar
      color="grey darken-3"
      dark
      dense="true"
      style="height: 48px"
    >

<!--      <v-btn-->
<!--        depressed-->
<!--        small-->
<!--        color="blue"-->
<!--      >-->
<!--        New Hadoop Cluster-->
<!--      </v-btn>-->
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Open Dialog
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">集群信息</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Namenode Ip"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Port"
                    hint="9870"
                    value="9870"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
            >
              Save
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
            >
              Connect
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-app-bar>
</template>

<script>
export default {
  name: "Hadoop",
  data: () => ({
    collapseOnScroll: true,
    dialog: false,
  })
}
</script>

<style scoped>

</style>
