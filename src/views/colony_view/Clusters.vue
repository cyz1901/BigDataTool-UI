<template>
  <v-main style="padding-left: 0; padding-top: 0; margin-left: 0">
    <v-app-bar
      color="grey darken-3"
      dark
      :dense="true"
      style="height: 48px"
    >
<!--Dialog      -->
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
            新建一个集群
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
    <v-container fluid>
      <v-row :dense="true">
<!--Card        -->
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
          style="margin-top: 20px"
        >
          <v-card
            class="mx-auto"
            max-width="344"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">
                  OVERLINE
                </div>
                <v-list-item-title class="headline mb-1">
                  Headline 5
                </v-list-item-title>
                <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                tile
                size="80"
                color="grey"
              ></v-list-item-avatar>
            </v-list-item>

            <v-card-actions>
              <v-btn
                outlined
                rounded
                text
                @click="onDetailCluster(card)"
              >
                Button
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <router-view></router-view>
  </v-main>
</template>

<script>
export default {
  name: 'Clusters',
  data: () => ({
    collapseOnScroll: true,
    dialog: false,
    cards: [
      { title: 'Pre-fab homes', src: '/webtest', flex: 3 },
      { title: 'Favorite road trips', src: '/clusters/colony', flex: 3 },
      { title: '1', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3 },
      { title: '2', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3 },
      { title: '3', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3 },
      { title: '4', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3 }
    ]
  }),
  methods: {
    onDetailCluster (card) {
      console.log(window.location.href)
      this.$router.replace({name:'colony'})
    }
  }
}
</script>

<style scoped>

</style>
