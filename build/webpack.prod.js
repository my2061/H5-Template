/**
 * webpack.prod.js
 * @description: 打包环境配置
 */

const baseConfig = require("./webpack.base");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
// const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");  //清理无用的css样式代码
// const globAll = require("glob-all");  //配合PurgeCSSPlugin插件全局查找
const CompressionPlugin = require("compression-webpack-plugin");
const WebpackBar = require("webpackbar");

module.exports = merge(baseConfig, {
  mode: "production",
  output: {
    publicPath: "/lottery/",
  },
  plugins: [
    new WebpackBar({
      color: "magenta",
      basic: false,
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[contenthash:4]-[name].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist"),
          filter: (source) => {
            return !source.includes("index.html");
          },
        },
      ],
    }),
    new CompressionPlugin({
      test: /.(js|css)$/,
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /.(js|css)$/,
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: 2,
        },
        default: {
          minChunks: 2,
          priority: 1,
          reuseExistingChunk: true,
        },
      },
    },
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"],
          },
        },
      }),
    ],
  },
});
