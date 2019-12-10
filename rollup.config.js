import vue from "rollup-plugin-vue";
// import typescript from "rollup-plugin-typescript";
// import { terser } from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";
import css from "rollup-plugin-css-only";
import rimraf from "rimraf";
import babel from "rollup-plugin-babel";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

rimraf.sync("rollup-dist");
export default {
  input: "src/main.ts",
  output: {
    dir: "rollup-dist",
    format: "esm",
    entryFileNames: "[name]-[hash].js",
    chunkFileNames: "[name]-[hash].js"
  },
  plugins: [
    resolve({ extensions }),
    // typescript(),
    babel({
      extensions,
      presets: ["@vue/cli-plugin-babel/preset"],
      runtimeHelpers: true,
      include: ["src/**/*"],
      exclude: ["node_modules/**"]
    }),
    css({ output: "rollup-dist/bundle.css" }),
    vue({ css: false })
    // terser()
  ]
};
