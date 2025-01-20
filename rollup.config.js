'use strict';

const path = require('path');

const version = require('./package.json').version;

const resolve = _path => path.resolve(__dirname, _path);

const outputs = [
  {
    file: resolve('dist/perfect-scrollbar.js'),
    format: 'umd',
    name: 'PerfectScrollbar'
  },
  {
    file: resolve('dist/perfect-scrollbar.min.js'),
    format: 'umd',
    name: 'PerfectScrollbar',
    min: true
  },
  {
    file: resolve('dist/perfect-scrollbar.common.js'),
    format: 'cjs',
  },
  {
    file: resolve('dist/perfect-scrollbar.esm.js'),
    format: 'es',
  }
];

module.exports = outputs.map(output => {
  return {
    input: path.resolve(__dirname, `./src/index.js`),
    output,
  }
});
