'use strict'
const path = require('path')
const config = require('../config')
const packageConfig = require('../package.json')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const glob = require('glob')
// 页面模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹
const PAGE_PATH = path.resolve(__dirname, '../src/pages')
// 用于做相应的merge处理
const merge = require('webpack-merge')

exports.getStaticPath = function () {
  if(process.env.NODE_ENV === 'production'){
    return require('./path').staticPath
  }else{
    return '/'
  }
}

const entryFilesSearch = () => {
  const isPrd = process.env.NODE_ENV === 'production'
  if (isPrd) {
    return glob.sync(PAGE_PATH + '/**/*.js')
  } else {
    /**
     * demo : npm run dev -- --devPages=act/a20181029shuang11,shop/hot
     * 多个页面用逗号(,)隔开
     */
    let devPages = process.argv.find(item => item.indexOf('--devPages=') > -1)
    return devPages ? [[]].concat(devPages.split('=')[1].split(',')).reduce((base, next) => {
      return base.concat(glob.sync(PAGE_PATH + '/' + (next || '') + '/**/*.js'))
    }) : glob.sync(PAGE_PATH + '/**/*.js')
  }
}

const entryFiles = entryFilesSearch()
//多入口配置
// 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在
// 那么就作为入口处理
exports.entries = function () {
  const map = {}
  entryFiles.forEach((filePath) => {
    const rPath = path.dirname(filePath).split('/src/pages/')[1]
    const pathArr = filePath.split('/'), last = pathArr[pathArr.length - 1], lastSecond = pathArr[pathArr.length - 2],
      filename = last.split('.')[0]
    if (filename === lastSecond || filename === 'index') {
      map[rPath] = filePath
    }
  })
  return map
}

//多页面输出配置
// 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中
exports.htmlPlugin = function () {
  const arr = []
  entryFiles.forEach(filePath => {
    let pathArr = path.relative(PAGE_PATH, filePath).split(path.sep) // shop/goodsDetails/index.js
    let filename = pathArr[pathArr.length - 2] // 用最后一层的目录名作文件名 如 goodsDetails
    const rPath = pathArr.slice(0, -2).join('/') // 倒数第二层目录作输出的目录 如输出到 shop/ 下 前面拼上dist 最后是 /dist/shop/goodsDetail.html
    let conf = {
      // 模板来源
      template: 'template.html',
      // 文件名称
      filename: rPath + '/' + filename + '.html',

      // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      chunks: ['manifest', 'vendor', 'commons', rPath + '/' + filename],//这是找js目录下的 shop/goodsDetails.js
      inject: false
    }

    if (process.env.NODE_ENV === 'production') {
      conf = merge(conf, {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        staticPath:config.build.assetsPublicPath,
        chunksSortMode: 'dependency'
      })
    } else {
      conf = merge(conf, {
        staticPath:config.dev.assetsPublicPath,
        chunksSortMode: 'dependency'
      })
    }
    arr.push(new HtmlWebpackPlugin(conf))
  })
  return arr
}

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function () {

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = [{
      loader: 'css-loader'
    }, {
      loader: 'postcss-loader'
    }]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: loaderOptions
      })
    }

    if (process.env.NODE_ENV === 'production') {
      loaders.unshift({
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: config.build.assetsPublicPath,
        }
      })
    } else {
      loaders.unshift({
        loader: 'vue-style-loader'
      })
    }

    return loaders

  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {indentedSyntax: true}),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
