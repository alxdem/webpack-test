const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/'
};

module.exports = {

  externals: {
    paths: PATHS
  },

  entry: {
    app: PATHS.src
  },
  output: {
    // filename: '[name].js',
    filename: `${PATHS.assets}js/[name].[hash].js`,
    path: PATHS.dist,
    publicPath: '/' // Нужен для dev-сервера
  },
  // Помещаем код всех библиотек (то, что мы не меняем часто) в отдельный файл vendors.js
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        }
      }
    }
  },
  module: {
    rules: [{
        test: /\.js$/, // Какие файлы обрабатываем
        loader: 'babel-loader', // Через что обрабатываем
        exclude: '/node_modules' // Исключаем папку с файлами
      },
      {
        test: /\.(png|jpg|gif|svg)$/, // Какие файлы обрабатываем
        loader: 'file-loader', // Через что обрабатываем
        options: {
          name: '[name].[ext]' // ext - берем раснирение из test
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: `${PATHS.src}/js/postcss.config.js`
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: `${PATHS.src}/js/postcss.config.js`
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }]
  },

  // Регистрируем все наши плагины здесь
  plugins: [
    new MiniCssExtractPlugin({
      // filename: '[name].css',
      filename: `${PATHS.assets}css/[name].[hash].css`,
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
      filename: './index.html'
    }),
    // Копируем картинки
    new CopyWebpackPlugin([
      {
        from: `${PATHS.src}/images`, // Откуда копируем
        to: `${PATHS.assets}images` // Куда
      },
      {
        from: `${PATHS.src}/static`, // Откуда копируем
        to: '' // Куда
      },
    ]),
  ],
};