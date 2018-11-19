'use strict'
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = {
  mode: 'none',
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../dist'),
        to: path.resolve(__dirname, '../../'),
        ignore: ['orderList.html']
      }
    ])
  ]
}

module.exports = config
