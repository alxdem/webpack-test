const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

// Объединяем код из baseWebpackConfig и тот, что передаем здесь
const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: []
});

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig);
});