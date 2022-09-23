import path from 'path'
import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  /** 入口文件 */
  root: './src/entry/index',
  /** 开发配置 */
  server: {
    host: '0.0.0.0',
    port: 5000
  },
  /** 路径设置 */
  resolve: {
    alias: [
      {
        find: "~@",
        replacement: path.join(__dirname, './src/components/')
      },
      {
        find: "~",
        replacement: path.join(__dirname, './src/')
      }
    ]
  },
  /** 导入 .css 文件将会把内容插入到 <style> 标签中，同时也带有 HMR 支持。也能够以字符串的形式检索处理后的、作为其模块默认导出的 CSS。 */
  css: {
    /** 指定传递给 CSS 预处理器的选项。文件扩展名用作选项的键 */
    preprocessorOptions: {
      less: {
        /** 支持内敛JavaScript */
        javascriptEnabled: true
      }
    },
    /** 开启模块化 */
    modules: {
      generateScopedName: '[name]__[local]__[hash:base64:5]',
      hashPrefix: 'yyl'
    }
  },
  /** 插件 */
  plugins: [
    legacy({
      targets: ['Android >= 39', 'Chrome >= 39', 'Safari >= 10.1', 'iOS >= 10', '> 0.5%'],
      polyfills: ['es.promise', 'regenerator-runtime']
    })
  ]
})