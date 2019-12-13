// import css from 'rollup-plugin-css-only';
import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript';
// import { terser } from "rollup-plugin-terser";
import resolve from 'rollup-plugin-node-resolve';
import rimraf from 'rimraf';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import progress from 'rollup-plugin-progress';
import environmentPlugin from './lib/environment-plugin';
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
    environmentPlugin(environment),
    progress(),
    resolve({ extensions }),
    typescript(),
    babel({
      extensions,
      presets: ['@vue/cli-plugin-babel/preset'],
      runtimeHelpers: true,
      include: ['src/**/*'],
      exclude: ['node_modules/**']
    }),
    // minimuze: true
    postcss({ extract: true }),
    // css(),
    vue({ css: false })
    // terser()
  ]
};
