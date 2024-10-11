const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack'); // Import Webpack for the feature flags

module.exports = defineConfig({
  transpileDependencies: [],
  devServer: {
    port: 3000,  // Change this to your desired port number
    proxy: {
      '/store': {
        target: 'http://localhost:8080',
        ws: true,
        changeOrigin: true,
      }
    }
  },
  // Webpack configuration to define Vue feature flags
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        // Enable Options API (optional, based on your project needs)
        __VUE_OPTIONS_API__: true,  
        
        // Disable devtools in production
        __VUE_PROD_DEVTOOLS__: false,

        // Enable hydration mismatch details (fixes your warning)
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true
      })
    ]
  }
});
