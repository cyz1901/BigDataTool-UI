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
        <v-card style="width: 30%">
          <v-container
            class="d-flex justify-center mb-6"
            style="padding-top: 100px"
          >
            <v-form ref="loginForm">
              <v-text-field
                label="帐号"
                hide-details="auto"
                v-model="loginForm.name"
              ></v-text-field>
              <v-text-field
                label="密码"
                hide-details="auto"
                v-model="loginForm.passworld"
              ></v-text-field>
              <v-btn
                style="margin-top: 20px; width: 100%"
                @click="login"
                :loading="loading"
                >登陆</v-btn
              >
            </v-form>
          </v-container>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      buttonStatus: '',
      loading: false,
      loginForm: {
        name: '',
        passworld: ''
      }
    }
  },

  methods: {
    login () {
      this.loading = true
      this.$axios.post('/api/v1/colony', this.loginForm).then(res => {
        if (res.data.status === 'success') {
          this.$router.push({ name: 'home' })
        } else {
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
