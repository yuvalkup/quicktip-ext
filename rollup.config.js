import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
    }),
    terser(),
    copy({
      targets: [
        { src: 'style.css', dest: 'dist' },
        { src: 'manifest.json', dest: 'dist' },
        { src: 'src/sw.js', dest: 'dist' },
        { src: 'src/options/', dest: 'dist' },
      ]
    }),
  ],
};
