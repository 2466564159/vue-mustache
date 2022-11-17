const { resolve } = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
  },
  devServer: {
    // 静态文件根目录
    static: resolve(__dirname, 'static'),
    // 不压缩
    compress: false,
    // 端口号
    port: 8080,
    // 自动打开浏览器
    open: true,
    devMiddleware: {
      // 虚拟打包的路径，bundle.js只在内存中生成
      publicPath: '/zx'
    }
  }
}