const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/src/index.html',
  filename: 'index.html',
  inject:   'body'
});

module.exports = {
  mode: 'development',
  entry: [__dirname + '/src/index.js'],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/'
        }
      }
    ]
  },
  output: {
    path: __dirname + '/build',
    filename: 'index.js',
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new CopyWebpackPlugin([
      {
        from: './now.json'
      }
    ]),
    new MiniCssExtractPlugin({
      filename: 'commons.css',
    })
  ]
};
