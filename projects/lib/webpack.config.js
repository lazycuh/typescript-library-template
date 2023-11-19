/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

/**
 * @typedef {Object} Env
 * @property {'esm' | 'cjs'} module
 *
 * @param {Env} env
 *
 * @returns {import('webpack').Configuration}
 */
module.exports = env => {
  const rootFolder = path.resolve(__dirname, '..', '..');
  const distFolder = path.resolve(rootFolder, 'dist');
  const outputFolder = path.resolve(distFolder, env.module);

  return {
    devtool: 'source-map',

    entry: makeEntries(),

    experiments: {
      outputModule: true
    },

    externals: [nodeExternals()],

    mode: 'development',

    module: {
      rules: [
        {
          test: /\.[tj]s$/,
          loader: 'ts-loader',
          options: {
            configFile: `tsconfig.${env.module}.json`
          }
        }
      ]
    },

    output: {
      filename: '[name].js',
      clean: true,
      path: outputFolder,
      library: {
        type: env.module === 'esm' ? 'module' : 'commonjs2'
      }
    },

    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'package.json'),
            to: distFolder
          },
          {
            from: path.resolve(rootFolder, 'README.md'),
            to: distFolder
          },
          {
            from: path.resolve(rootFolder, 'LICENSE'),
            to: distFolder
          },
          {
            from: path.resolve(rootFolder, 'docs'),
            to: path.resolve(distFolder, 'docs'),
            noErrorOnMissing: true
          },
          copyAll(`build/${env.module}/**/*.js`, distFolder, env.module),
          copyAll(`build/${env.module}/**/*.js.map`, distFolder, env.module),
          copyAll('build/**/*.d.ts', distFolder, 'types')
        ]
      })
    ],

    resolve: {
      alias: {},
      extensions: ['.ts', '.js'],
      symlinks: false
    },

    stats: 'errors-warnings'
  };
};

function makeEntries() {
  const entries = {};

  return entries;
}

/**
 *
 * @param {string} globPattern The pattern to search for files by
 * @param {string} distFolder The full path to `dist` folder
 * @param {string} subfolder The name of the subfolder under `dist` to copy into
 *
 * @returns {import('copy-webpack-plugin').Pattern}
 */
function copyAll(globPattern, distFolder, subfolder) {
  return {
    from: globPattern,
    to({ absoluteFilename = '' }) {
      const pathAfterBuildFolder = absoluteFilename.split('build')[1].substring(1);

      return path.resolve(distFolder, subfolder, pathAfterBuildFolder.replace(/\w+[\\/]/, ''));
    }
  };
}
