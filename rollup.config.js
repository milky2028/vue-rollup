import vue from "rollup-plugin-vue";
import typescript from "rollup-plugin-typescript";
import { terser } from "rollup-plugin-terser";
import nodeResolve from "rollup-plugin-node-resolve";
import css from "rollup-plugin-css-only";

export default {
  input: "src/main.ts",
  output: {
    dir: "rollup-dist",
    format: "esm",
    entryFileNames: "[name]-[hash].js",
    chunkFileNames: "[name]-[hash].js"
  },
  plugins: [nodeResolve(), typescript(), css(), vue({ css: false }), terser()]
};
