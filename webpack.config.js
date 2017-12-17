const dts = require('dts-bundle');

class DtsBundlePlugin {
  apply(compiler) {
    compiler.hooks.done.tap({
      name: 'DtsBundlePlugin',
      stage: Infinity
    }, dts.bundle.bind(null, {
      name: 'snowplow-analytics-sdk',
      main: './dist/index.d.ts',
      out: 'index.d.ts',
      removeSource: true,
      outputAsModuleFolder: true
    }));
  }
}

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  target: 'node',
  context: __dirname,
  resolve: {
    extensions: ['.ts'],
  },
  output: {
    libraryTarget: 'commonjs',
    filename: 'index.js'
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' },
    ]
  },
  plugins: [
    new DtsBundlePlugin(),
  ],
};
