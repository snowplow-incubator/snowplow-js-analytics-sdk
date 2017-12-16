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
};
