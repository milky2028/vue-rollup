import vue from 'rollup-plugin-vue';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import rimraf from 'rimraf';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import progress from 'rollup-plugin-progress';
import environmentPlugin from './lib/environment-plugin';
import html from '@rollup/plugin-html';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
// import css from 'rollup-plugin-css-chunks';
import { readFileSync } from 'fs';

if (!process.env.MODE) {
  throw new Error('No environment mode specified');
}

rimraf.sync('rollup-dist');
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const environment = readFileSync(
  `./environments/${process.env.MODE}.ts`,
  'utf-8'
);
export default {
  input: 'src/main.ts',
  output: {
    dir: 'rollup-dist',
    format: 'esm',
    entryFileNames: '[name]-[hash].js',
    chunkFileNames: '[name]-[hash].js'
  },
  plugins: [
    progress(),
    resolve({ extensions }),
    commonjs(),
    environmentPlugin(environment),
    typescript(),
    vue(),
    babel({
      extensions,
      presets: ['@vue/cli-plugin-babel/preset'],
      runtimeHelpers: true,
      include: ['src/**/*'],
      exclude: ['node_modules/**']
    }),
    replace({ 'process.env.NODE_ENV': `'production'`, 'process.env.BASE_URL': `'/'`}),
    html({ attributes: { html: { lang: 'en' } } }),
    // css({ chunkFileNames: 'chunk-[hash].css', entryFileNames: '[name]-[hash].css' }),
    postcss({ minimize: true }),
    terser()
  ]
};

// In output, resulting index.html needs an 'app' id to mount the app. CSS chunking does not appear to work. Environment plugin needs to be tested. Is not currently working.