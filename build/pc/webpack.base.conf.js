'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('./config')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const glob = require('glob')

function resolve (dir) {
  return path.join(__dirname, '../../', dir)
}

let entries = getEntries(path.join(resolve('src/pc/scripts/modules') + '/**/*.js'));
console.log(entries)
let webpackConfig = {
  context: path.resolve(__dirname, '../../'),
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '^': resolve('src/'),
      '@': resolve('src/pc'),
    }
  },
  module: {
    rules: [

      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')],
        exclude:['polyfill.js']
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
      }
    ],
  },
	plugins:[
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Object.keys(entries).length
		}),

	]
}
let htmls = getEntries(path.join(resolve('src/pc/views/') + '/*.html'));
Object.keys(htmls).forEach(key =>{
	webpackConfig.plugins.push(new HtmlWebpackPlugin({
		template: `!!ejs-loader!ejs-html-loader!${htmls[key]}`,
		filename: 'views/' + key + '.html',
		chunks: ['vendor', key],
		inject: 'body',
		hash:true,
/*		minify: {
			removeComments: true,
			collapseWhitespace: true,
			removeAttributeQuotes: true
		},*/
  }))
})
function getEntries(globPath) {
	let files = glob.sync(globPath),
		entries = {};

	files.forEach(function(filepath) {

    let parseObj = path.parse(filepath);
		let basename = parseObj.name
    if(basename == 'index'){
			// 取倒数第二层(view下面的文件夹)做包名
			basename = [parseObj.dir.split('/').slice(-1),basename].join('-')
    }
		entries[basename] = filepath;
	});

	return entries;
}

module.exports = webpackConfig
