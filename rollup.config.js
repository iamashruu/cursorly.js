// import resolve from '@rollup/plugin-node-resolve';
// import json from '@rollup/plugin-json';
// import terser from '@rollup/plugin-terser';

// export default {
//   input: './src/index.js',
//   output: {
//     file: 'dist/cursorly.min.js',
//     format: 'iife',   // <- browser-ready IIFE
//     name: 'Cursorly', // <- optional, window.Cursorly will work
//     sourcemap: true
//   },
//   plugins: [
//     resolve(),
//     json(),
//     terser()
//   ]
// };

import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import  terser from '@rollup/plugin-terser';

const plugins = [terser(), resolve(), json()];

// 1️⃣ ESM build (for import)
const esmConfig = {
  input: './src/index.js',
  output: {
    file: 'dist/cursorly.esm.js',
    format: 'esm',
    sourcemap: true
  },
  plugins
};

// 2️⃣ UMD build (for require/import)
const umdConfig = {
  input: './src/index.js',
  output: {
    file: 'dist/cursorly.umd.js',
    format: 'umd',
    name: 'Cursorly',
    sourcemap: true
  },
  plugins
};

// 3️⃣ IIFE (browser-ready, minified)
const iifeConfig = {
  input: './src/index.js',
  output: {
    file: 'dist/cursorly.min.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [...plugins, terser()]
};

export default [esmConfig, umdConfig, iifeConfig];

