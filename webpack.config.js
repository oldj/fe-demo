const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    'dot-line': './pages/dot-line/entry.js'
  }, // string | object | array
  // Here the application starts executing
  // and webpack starts bundling

  output: {
    // options related to how webpack emits results

    path: path.resolve(path.join(__dirname, 'pages'), 'dist'), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)

    filename: '[name].bundle.js', // string
    // the filename template for entry chunks

    libraryTarget: 'umd' // universal module definition
    // the type of the exported library

    /* Advanced output configuration (click to show) */
  },

  module: {
    // configuration regarding modules

    rules: [
      // rules for modules (configure loaders, parser options, etc.)

      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        // the loader which should be applied, it'll be resolved relative to the context
        // -loader suffix is no longer optional in webpack2 for clarity reasons
        // see webpack 1 upgrade guide

        options: {
          presets: ['es2015']
        }
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
