const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  publicPath:'./',
  // devServer:{
  //   port:8080,
  //   host:'localhost',
  //   proxy:{
  //     "/":{
  //       target:"http://localhost:8666/"
  //     }
  //   }
  // }
})