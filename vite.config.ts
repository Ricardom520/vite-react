import path from 'path'
import { UserConfigExport, ConfigEnv, loadEnv } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'
import tsconfigPaths from 'vite-tsconfig-paths'
import { createHtmlPlugin } from 'vite-plugin-html'
import viteMockPlugin from './plugins/modifyDistPath'
import ServeEditPlugin from './plugins/serverEdit'

const pkg = require('./package.json')

const BASE_PROJECT_PATH = `project/${pkg.name}/pc/`

const IMAGES_REGEXP = ['png', 'jpg', 'jpge', 'gif', 'svga']

const config: UserConfigExport = {
  /** 入口文件 */
  build: {
    outDir: path.join(__dirname, './dist/'),
    emptyOutDir: true,
    manifest: 'rev-manifest.json',
    rollupOptions: {
      output: {
        entryFileNames: BASE_PROJECT_PATH + 'js/[name]-[hash].js',
        assetFileNames: (val) => {
          const works = val.name?.split('.')
          let ext = 'asset'

          if (works) {
            ext = works[works.length - 1]
          }

          if (IMAGES_REGEXP.includes(ext)) {
            ext = 'images'
          }

          return BASE_PROJECT_PATH + ext + '/[name]-[hash].[ext]'
        }
      }
    }
  },
  /** 开发配置 */
  server: {
    host: '0.0.0.0',
    port: 5000
  },
  /** 路径设置 */
  resolve: {
    alias: [
      {
        find: '~@',
        replacement: path.join(__dirname, './src/components/')
      },
      {
        find: '~',
        replacement: path.join(__dirname, './src/')
      }
    ]
  },
  /** 导入 .css 文件将会把内容插入到 <style> 标签中，同时也带有 HMR 支持。也能够以字符串的形式检索处理后的、作为其模块默认导出的 CSS。 */
  css: {
    modules: {
      // css模块化 文件以.module.[css|less|scss]结尾
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      hashPrefix: 'winkey'
    },
    /** 指定传递给 CSS 预处理器的选项。文件扩展名用作选项的键 */
    preprocessorOptions: {
      less: {
        /** 支持内敛JavaScript */
        javascriptEnabled: true
      }
    }
  },
  /** 插件 */
  plugins: [
    legacy({
      targets: ['Android >= 39', 'Chrome >= 39', 'Safari >= 10.1', 'iOS >= 10', '> 0.5%'],
      polyfills: ['es.promise', 'regenerator-runtime']
    }),
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.tsx', 'src/*.ts', 'src/*.tsx']
    }),
    viteMockPlugin(),
    ServeEditPlugin(),
    react(),
    tsconfigPaths()
  ]
}

export default ({ command, mode }: ConfigEnv) => {
  const { plugins = [], build = {} } = config
  const env = loadEnv(mode, process.cwd())
  const isBuild = command === 'build'

  if (isBuild) {
    config.base = '/' + BASE_PROJECT_PATH
    // 压缩 Html 插件
    config.define = {
      'process.env.NODE_ENV': '"production"'
    }
  }

  config.plugins = [
    ...plugins,
    createHtmlPlugin({
      inject: {
        data: {
          ...env,
          devServerToolScript: `<script type="module" src="/winkey_tool/index.js"></script>`,
          devServerToolCss: `<link href="/winkey_tool/index.css" rel="stylesheet" >`
        }
      }
    })
  ]

  return config
}
