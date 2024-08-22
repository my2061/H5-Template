/**
 * webpack.base.js
 * @description: 基础混合配置
 */

const chalk = require("chalk"); 
const isDev = process.env.NODE_ENV === "development"; 
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: path.join(__dirname, `../src/index.tsx`),
  output: {
    filename: "static/js/[chunkhash:4]-[name].js",
    path: path.join(__dirname, "../dist"), 
    clean: true, 
    publicPath: "/",
    assetModuleFilename: "static/assets/[chunkhash:4][ext]",
  },
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, "../src")],
        test: /.(ts|tsx)$/,
        use: "babel-loader", 
      },
      {
        include: [path.resolve(__dirname, "../src"), path.resolve(__dirname, "../node_modules/antd-mobile")],
        test: /.css$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader, 
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        include: [path.resolve(__dirname, "../src")],
        test: /.less$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpg)/, 
        type: "asset/resource", 
        generator: {
          filename: "static/images/[contenthash:4][ext]",
        },
      },
      {
        test: /\.txt/,
        type: "asset/source",
        generator: {
          filename: "static/images/[contenthash:4][ext]",
        },
      },
      {
        test: /\.gif/,
        type: "asset",
        generator: {
          filename: "static/images/[contenthash:4][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: "static/fonts/[contenthash:4][ext]", 
        },
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: "static/media/[contenthash:4][ext]", 
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".tsx", ".ts"],
    alias: {
      "@": path.join(__dirname, "../src"),
    },
    modules: [path.resolve(__dirname, "../node_modules")],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"), 
      inject: true,
    }),
    new webpack.DefinePlugin({
      "process.env.PROJECT_ENV": JSON.stringify(process.env.PROJECT_ENV),
    }),
    new webpack.DefinePlugin({
      "process.env.APP_ENV": JSON.stringify(process.env.APP_ENV),
    }),
  ],
  cache: {
    type: "filesystem",
    cacheDirectory: path.resolve(__dirname, "../temp_cache"),
  },
};

const log = console.log;
log(chalk.bgMagenta.bold("当前构建模式", process.env.NODE_ENV));
log(chalk.bgMagenta.bold("当前业务环境", process.env.PROJECT_ENV));
