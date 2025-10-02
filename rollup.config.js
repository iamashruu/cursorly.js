import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

export default {
  input: './src/index.js',
  output: {
    file: 'dist/cursorly.min.js',
    format: 'iife',   // <- browser-ready IIFE
    name: 'Cursorly', // <- optional, window.Cursorly will work
    sourcemap: true
  },
  plugins: [
    resolve(),
    json(),
    terser()
  ]
};
