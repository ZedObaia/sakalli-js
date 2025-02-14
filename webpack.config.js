const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'sakalli.umd.js',
    library: 'Sakalli',
    libraryTarget: 'var'
  },
};