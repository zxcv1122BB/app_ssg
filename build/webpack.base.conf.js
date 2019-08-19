'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
// const glob = require('globby');
const webpack = require('webpack')
const vueLoaderConfig = require('./vue-loader.conf')

const ExtractTextPlugin = require("extract-text-webpack-plugin")

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// getEntry().forEach((item, i) => {
//   webpackconfig.module.rules.push({
//     test: new RegExp('src' + '(\\\\|\/)' + item + '(\\\\|\/)' + 'css' + '(\\\\|\/)' + '.*\.(css|scss)$'),
//     use: pageExtractCssArray[i].extract({
//       fallback: 'style-loader',
//       use: ['css-loader', 'postcss-loader', 'sass-loader']
//     })
//   })
// })
module.exports = {
  externals: {
    'vue': 'Vue',
    "element-ui": "ELEMENT"
    // 'axios': 'axios',
    // 'iview': 'iview'
  },
  context: path.resolve(__dirname, '../'),
  entry:{
    vendor: ['vue'],
    app: './src/main.js',
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
      //  path: config.build.assetsRoot,
    // filename: process.env.NODE_ENV === 'production' ? '[name].js?[chunkhash]' : '[name].js',
    // chunkFilename: 'chunk[id].js?[chunkhash]',
    // publicPath: process.env.NODE_ENV === 'production'
    //   ? config.build.assetsPublicPath
    //   : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json','.css'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'mui': path.resolve(__dirname, '../static/js/mui.min.js'),
      // 'base': path.resolve(__dirname, '../static/css/base.css'),

    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig

      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      // {
      //   test: /\.css$/,
      //   include: path.resolve(__dirname, "../src/main.js"),
      //   loader: ['style-loader', 'css-loader']
      // },
      // {
      //   test: /\.css$/,
      //   include: path.resolve(__dirname, "../src/components/"),
      //   loader: ['style-loader', 'css-loader']
      // },
      // {
      //   test: /\.css$/,
      //   include: path.resolve(__dirname, "../src/style/"),
      //     loader: ExtractTextPlugin.extract({
      //       use: [
      //         {
      //           loader: 'css-loader'
      //         }
      //       ]
      //     })
      //  },
    ]
  },

  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  plugins: [


    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",

      // filename: "vendor.js"
      // (Give the chunk a different name)

      minChunks: Infinity,
      // (with more entries, this ensures that no other module
      //  goes into the vendor chunk)
    }),
    // new webpack.optimize.CommonsChunkPlugin('common.js',['main','index']),
    // pageExtractCssArray
    // new webpack.optimize.CommonsChunkPlugin('common.js'),
    // new webpack.ProvidePlugin({
      // jQuery: 'jquery',
      // $: 'jquery',
    //   mui: 'mui'
    // }),

    // new ExtractTextPlugin({ filename: utils.assetsPath('css/[name].[contenthash].css'), allChunks: true })
    // new webpack.LoaderOptionsPlugin({
    //       test: /\.vue$/,
    //       options: {
    //         vue: {
    //           loaders: {
    //             css: ExtractTextPlugin.extract({
    //               fallback: 'vue-style-loader',
    //               use: 'css-loader',
    //               publicPath: "../"
    //             }),
    //           }
    //         }
    //       }
    // })
    // new webpack.optimize.CommonsChunkPlugin('common.js'), // 默认会把所有入口节点的公共代码提取出来,生成一个common.js

  ]
}
