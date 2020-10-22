const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin =require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  entry: './src/asset/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/asset'),
    filename: 'js/index.js'
  },
  module: {
    rules: [
      /*
        js兼容性处理：babel-loader @babel/preset-env
      */
      {      
        test: /\.js$/,
        exclude:/node_modules/,
        loader: 'babel-loader',
        options: {
          //预设：指示babel做怎么样的兼容处理
          presets: [
            [
              '@babel/preset-env',
              {
                //按需加载
                userBuiltIns: 'usage',
                //指定core-js版本
                corejs: {
                  version: 3
                },
                //指定兼容性做到哪个版本浏览器
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ]
        }
      }
    ],
    rules: [
      {
        test: /\.css$/,
        use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              {
                loader: 'postcss-loader',
                ident: 'postcss',
                options: {
                  postcssOptions:{
                    plugins:()=>[
                        //postcss的插件
                        require('postcss-preset-env')()
                      ],                    
                  }

                }
              }
            ]
      },
      {
        test: /\.less$/,
        use : [
                MiniCssExtractPlugin.loader,
                'css-loader',
                {
                  loader: 'postcss-loader',
                  ident: 'postcss',
                  options: {
                    postcssOptions:{
                      plugins:()=>[
                          //postcss的插件
                          require('postcss-preset-env')()
                        ],                    
                    }
  
                  }
                },
                'less-loader'
              ]
      }
    ]
  },
  plugins: [
    //详细插件配置
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: '../index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css'
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new CleanWebpackPlugin()
  ],
  mode: 'development',

  //启动devServer指令：npx webpack-dev-server
  devServer: {
    contentBase: path.resolve(__dirname,'dist'),
    //启动gzip压缩
    compress: true,
    port: 3000
  }
};