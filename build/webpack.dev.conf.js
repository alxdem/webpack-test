const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

// Объединяем код из baseWebpackConfig и тот, что передаем здесь
const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: baseWebpackConfig.externals.paths.src, // Где будем открывать Webpack
    port: 8081, // По дефолту идет 8080, но хорошая практика ставить 8081
    overlay: {
      warnings: false,
      errors: true
    }
  },
  plugins: [
    // Плагин для карты сайта
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    })
  ]
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig);
});