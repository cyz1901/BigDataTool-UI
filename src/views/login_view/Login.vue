<template>
  <v-app>
    <v-content app class="d-flex align-center mb-6">
      <v-container class="d-flex justify-end mb-6">
        <v-img
          :src="require('@/assets/logo.svg')"
          class="my-3"
          contain
          height="300"
        />
        <v-card style="width: 40%">
          <v-container class="d-flex justify-center mb-6" style="padding-top:100px">
          <v-form>
          <v-text-field
            label="帐号"
            hide-details="auto"
          ></v-text-field>
          <v-text-field
            label="密码"
            hide-details="auto"
          ></v-text-field>
          <v-btn
          style="margin-top:20px"
          >登陆</v-btn>
          </v-form>
          </v-container>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Login'
}
data: () => ({

})
</script>

<style scoped>
</style>
