const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * @typedef {Object} Env
 * @property {'node' | 'browser'} type
 *
 *
 * @param {Env} env
 *
 * @return {import('webpack').Configuration}
 */
module.exports = env => ({
  entry: {
    app: './src/index.ts'
  },

  output: {
    filename: env.type === 'browser' ? 'app.[contenthash:10].js' : 'app.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    library: {
      type: env.type === 'browser' ? 'module' : 'commonjs2'
    }
  },

  module: {
    rules: [
      {
        loader: 'ts-loader',
        test: /\.ts$/,
        options: {
          configFile: `tsconfig.${env.type === 'browser' ? 'esm' : 'cjs'}.json`
        }
      }
    ]
  },

  plugins: [new HtmlWebpackPlugin({})],

  devtool: 'inline-source-map',

  mode: 'development',

  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    compress: false,
    port: 9000,
    client: {
      overlay: true
    }
  }
});
