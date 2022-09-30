import path from 'path'
import { UserConfigExport, ConfigEnv, loadEnv  } from 'vite'
import legacy from '@vitejs/plugin-legacy'
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
          let ext: string = 'asset'

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
        javascriptEnabled: true,
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
    }),
    viteMockPlugin(),
    ServeEditPlugin()
  ]
}

export default ({ command, mode }: ConfigEnv) => {
  const { plugins = [], build = {} } = config
  const env = loadEnv(mode, process.cwd());
  const isBuild = command === 'build'

  if (isBuild) {
    config.base = '/' + BASE_PROJECT_PATH
    // 压缩 Html 插件
    config.define = {
      'process.env.NODE_ENV': '"production"'
    }
  }

  config.plugins = [...plugins, createHtmlPlugin({
    inject: {
      data: {
        ...env,
        devServerToolScript: `<script type="module" src="./devServerTool/fronted/index.ts"></script>`,
        devServerToolCss: `<link href="./devServerTool/fronted/index.css" rel="stylesheet" >`
      }
    }
  })]

  return config
}