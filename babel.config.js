const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3 //使用低版本js语法模拟高版本的库（垫片）
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "plugins": [
    isDev && require.resolve('react-refresh/babel'),  //开发模式，启动react热更新插件
  ].filter(Boolean) //过滤空值
}
