const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin =require('mini-css-extract-plugin');

module.exports = {
  entry: './src/asset/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
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
      template : './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css'
    })
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