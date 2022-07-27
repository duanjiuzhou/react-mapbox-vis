import babel from "rollup-plugin-babel"; // es6 --> es5 做兼容
import nodeResolve from "@rollup/plugin-node-resolve"; // 插件允许加载第三方模块
import commonjs from "@rollup/plugin-commonjs"; // 插件将它们转换为ES6版本
import typescript from "typescript";
import rollupTypescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser"; // ES6 +的JavaScript解析器，mangler和压缩器工具包
import postcss from 'rollup-plugin-postcss'// 编译css
import replace from "@rollup/plugin-replace"; // 替换代码中的变量为指定值
import sourceMaps from "rollup-plugin-sourcemaps"; // 能生成 sourcemaps 文件
import peerDepsExternal from "rollup-plugin-peer-deps-external"; // 自动外部化peerDependencies的rollup捆绑
import builtins from "rollup-plugin-node-builtins";

const { name, version, author, main, module } = require("./package.json");

// 代码头
const banner = `/*!
 * ${name} v${version} by ${author}
 * (c) 2022-${new Date().getFullYear()} 
 * Released under the MIT License.
 */`;

const isDev = process.env.NODE_ENV === "development" ? true : false;

export default {
  input: "src/index.ts",
  output: [
    {
      file: main,
      format: "cjs",
      name,
      sourcemap: false,
      banner
    },
    {
      file: module,
      format: "es",
      name,
      sourcemap: false,
      banner
    }
  ],
  watch: {
    include: "./src/**",
    exclude: "node_modules/**"
  },
  // external: ["react", "react-dom", 'mapbox-gl'], // 去除第三方库打包
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      __buildDate__: () => JSON.stringify(new Date()),
      preventAssignment: true
    }),
    postcss({
      plugins: [
        require('postcss-inline-svg'),
        require('cssnano')
      ]
    }),
    peerDepsExternal(),
    nodeResolve(),
    commonjs(),
    builtins(),
    rollupTypescript({
      typescript,
      useTsconfigDeclarationDir: true
    }),
    babel({
      exclude: "node_modules/**"
    }),
    terser({
      compress: {
        drop_console: isDev ? false : true
      }
    }),
    sourceMaps()
  ]
};
