var path = require('path');
const MinifyPlugin = require("babel-minify-webpack-plugin");

var config = (_, argv) => {
  const isDev = argv.mode === 'development';
  return ({
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
      path: path.resolve(__dirname, './lib'),
      filename: isDev ? 'declayer.js' : 'declayer.min.js',
      library: 'declayer',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    module: {
      rules: [{
        test: /\.js$/i,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader", 
          options: {
            presets: ["@babel/preset-env"]  //Preset used for env setup
           }
        }],
      }]
    },
    plugins: isDev ? [] : [new MinifyPlugin()]
  });
};

module.exports = config;