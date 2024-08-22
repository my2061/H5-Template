/**
 * webpack.analy.js
 * @description: 性能分析配置
 */

const prodConfig = require("./webpack.prod");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); 
const smp = new SpeedMeasurePlugin();
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { merge } = require("webpack-merge");
const prodConfig = require("./webpack.prod");

module.exports = smp.wrap(
  merge(prodConfig, {
    plugins: [new BundleAnalyzerPlugin()],
  })
);
