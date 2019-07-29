const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const APP_DIR = path.resolve(__dirname, '../src')

module.exports = () => {
  const { NODE_ENV } = process.env

  return merge([
    {
      entry: ['core-js/stable', 'regenerator-runtime/runtime', APP_DIR],
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.(scss|css)$/,
            use: [
              NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
              'css-loader',
              'postcss-loader',
              'sass-loader'
            ]
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          filename: './index.html'
        }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
        }),
        new CopyWebpackPlugin([{ from: 'src/assets' }])
      ],
      output: {
        path: path.join(__dirname, '..', 'dist'),
        publicPath: '/'
      //   filename: '[name].bundle.js',
      //   chunkFilename: '[name].chunk.bundle.js',
      //   path: path.resolve(__dirname, '..', 'dist'),
      //   publicPath: '/',
      },
      devServer: {
        contentBase: './src/assets'
      }
    }
  ])
}
