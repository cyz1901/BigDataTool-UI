module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    }
  },
  // // axios 配置
  devServer: {
    open: false,
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        pathRewrite: { '^/api': '/api' } // 重写之后url为 http://192.168.1.16:8085/api/xxxx
      }
    }
  },
  'transpileDependencies': [
    'vuetify'
  ]
}
