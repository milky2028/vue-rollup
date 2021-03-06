import vue from 'rollup-plugin-vue';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import rimraf from 'rimraf';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import progress from 'rollup-plugin-progress';
import environmentPlugin from './lib/environment-plugin';
import html, { makeHtmlAttributes } from '@rollup/plugin-html';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import omt from '@surma/rollup-plugin-off-main-thread';
// import css from 'rollup-plugin-css-chunks';
import { minify } from 'html-minifier';
import { readFileSync } from 'fs';
import assetsPlugin from './lib/assetsPlugin';

if (!process.env.MODE) {
  throw new Error('No environment mode specified');
}

function createTemplate({ attributes, files, publicPath }) {
  const scripts = (files.js || [])
    .filter(({ fileName }) => !fileName.includes('worker'))
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.script);
      return `<script src="${publicPath}${fileName}"${attrs}></script>`;
    })
    .join('\n');
  return minify(
    readFileSync('./public/index.html', 'utf-8').replace('${scripts}', scripts),
    {
      removeAttributeQuotes: true,
      removeComments: true,
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeEmptyAttributes: true
    }
  );
}

rimraf.sync('rollup-dist');
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const environment = readFileSync(
  `./environments/${process.env.MODE}.ts`,
  'utf-8'
);
export default [
  {
    input: {
      main: 'src/main.ts'
    },
    output: {
      dir: 'rollup-dist',
      format: 'amd',
      entryFileNames: '[name]-[hash].js',
      chunkFileNames: '[name]-[hash].js'
    },
    context: 'self',
    plugins: [
      progress(),
      resolve({ extensions }),
      commonjs(),
      assetsPlugin('src/assets'),
      environmentPlugin(environment),
      typescript(),
      vue(),
      babel({
        extensions,
        presets: ['@vue/cli-plugin-babel/preset'],
        runtimeHelpers: true,
        exclude: ['node_modules/**']
      }),
      omt(),
      replace({
        'process.env.NODE_ENV': "'production'",
        'process.env.BASE_URL': "'/'"
      }),
      html({
        attributes: {
          html: {
            lang: 'en'
          }
        },
        template: createTemplate
      }),
      // css({ chunkFileNames: 'chunk-[hash].css', entryFileNames: '[name]-[hash].css' }),
      postcss({ minimize: true }),
      terser({
        output: {
          comments: false
        }
      })
    ]
  },
  {
    input: {
      sw: 'sw/sw.ts'
    },
    output: {
      dir: 'rollup-dist',
      format: 'esm'
    },
    context: 'self',
    plugins: [
      progress(),
      typescript(),
      babel({
        extensions,
        runtimeHelpers: true,
        presets: ['@babel/preset-env'],
        exclude: ['node_modules/**']
      }),
      terser({
        output: {
          comments: false
        }
      })
    ]
  }
];
