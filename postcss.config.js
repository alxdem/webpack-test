// yarn add postcss-loader autoprefixer cssnano css-mqpacker --dev

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('css-mqpacker'), // Плагин для медиа-запросов
    require('cssnano')({
      preset: [
        'default', {
          discardComments: {
            removeAll: true
          }
        }
      ]
    }),
  ]
}