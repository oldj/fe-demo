const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    'dot-line': './pages/dot-line/entry.js',
    'rule-visualization': './pages/rule-visualization/src/main.js'
  },

  output: {
    path: path.resolve(path.join(__dirname, 'pages'), 'dist'), // string
    filename: '[name].bundle.js' // string
  },

  module: {

    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }, {
        test: /\.less$/,
        loader: ['style-loader', 'css-loader', 'less-loader'],
        exclude: /node_modules/
      }, {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        use: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      }
    ]

    /* Advanced module configuration (click to show) */
  },

  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)

    modules: [
      'node_modules',
      path.resolve(__dirname, 'app')
    ],
    // directories where to look for modules

    extensions: ['.js', '.json', '.jsx', '.css'],
    // extensions that are used

    alias: {}
  },

  performance: {
    hints: 'warning', // enum
    maxAssetSize: 200000, // int (in bytes),
    maxEntrypointSize: 400000, // int (in bytes)
    assetFilter: function (assetFilename) {
      // Function predicate that provides asset filenames
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
    }
  },

  devtool: 'source-map', // enum
  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed.

  context: __dirname, // string (absolute path!)
  // the home directory for webpack
  // the entry and module.rules.loader option
  //   is resolved relative to this directory

  target: 'web', // enum
  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules

  stats: 'errors-only',
  // lets you precisely control what bundle information gets displayed

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true
      }
    }),
    new webpack.BannerPlugin(`[name].js by oldj`)
  ]
}
