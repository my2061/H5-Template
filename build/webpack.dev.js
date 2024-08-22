/**
 * webpack.dev.js
 * @description: 开发环境配置
 */

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    port: 1114,
    compress: false,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "../public"),
    },
    // proxy: {
    //   "/activity-api": {
    //     target: "http://10.100.119.57:8777",
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
  stats: "minimal",
  plugins: [new ReactRefreshWebpackPlugin()],
});
