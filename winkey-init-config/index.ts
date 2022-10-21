import path from 'path'
import { UserConfigExport, ConfigEnv, loadEnv } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'
import tsconfigPaths from 'vite-tsconfig-paths'
import StylelintPlugin from 'vite-plugin-stylelint'
import { createHtmlPlugin } from 'vite-plugin-html'

export interface WinkeyProjectConfig {
  /** 项目名称 */
  name?: string
  /** 项目工具 */
  workflow: 'vite'
  /** 项目环境 */
  platform?: 'pc' | 'mobile'
  /** 版本号 */
  version?: string
  /** 是否使用yarn */
  yarn?: boolean
  /** 打包配置 */
  dest?: {
    /** 基础路径 */
    basePath?: string
    /** js文件路径 */
    jsPath?: string
    /** css文件路径 */
    cssPath?: string
    /** html文件路径 */
    htmlPath?: string
    /** 图片文件路径 */
    imagesPath?: string
    /** manifast文件路径 */
    revPath?: string
  }
  /** alias 配置 */
  alias?:
    | {
        /** 根目录 */
        srcRoot?: string
      }
    | {
        find: string
        replacement: string
      }[]
  /** 本地开发端口号 */
  port?: number
  /** 是否启用样式模块化 */
  cssModules?: boolean
}

type EnvType<T> = T extends infer P ? P : never

const IMAGES_REGEXP = ['png', 'jpg', 'jpge', 'gif', 'svga']

export const initWinkeyConfig = (
  val: (obj: { env: EnvType<NodeJS.ProcessEnv> }) => WinkeyProjectConfig,
  command?: string
) => {
  console.log(command)
  const localConfig = val({ env: process.env })

  /** 基础路径 */
  const BASE_PROJECT_PATH = path.resolve(localConfig?.dest?.basePath || './')
  /** css文件路径 */
  const CSS_PATH = localConfig?.dest?.cssPath || 'css'
  /** js文件路径 */
  const JS_PATH = localConfig?.dest?.jsPath || 'js'
  /** html文件路径 */
  const HTML_PATH = localConfig?.dest?.htmlPath || 'html'
  /** 图片文件路径 */
  const IMG_PATH = localConfig?.dest?.imagesPath || 'images'
  /** alias 基础路径 */
  const ALIAS_ROOT_PATH =
    (
      localConfig?.alias as {
        srcRoot: string
      }
    ).srcRoot || './src/'

  const config: UserConfigExport = {
    /** 出口文件 */
    build: {
      outDir: path.resolve(__dirname, './dist/'),
      emptyOutDir: true,
      manifest: 'rev-manifest.json',
      rollupOptions: {
        output: {
          entryFileNames: BASE_PROJECT_PATH + 'js/[name]-[hash].js',
          assetFileNames: (val) => {
            const works: string[] | undefined = val.name?.split('.')

            if (works) {
              const type = works[works.length - 1]

              if (type === 'css') {
                return BASE_PROJECT_PATH + CSS_PATH + '/[name]-[hash].[ext]'
              }

              if (type === 'js') {
                return BASE_PROJECT_PATH + JS_PATH + '/[name]-[hash].[ext]'
              }

              if (IMAGES_REGEXP.includes(type)) {
                return BASE_PROJECT_PATH + IMG_PATH + '/[name]-[hash].[ext]'
              }
            }

            const ext = 'assets'

            return BASE_PROJECT_PATH + ext + '/[name]-[hash].[ext]'
          }
        }
      }
    },
    /** 开发配置 */
    server: {
      host: '0.0.0.0',
      port: 9999
    },
    /** 路径设置 */
    resolve: {
      alias: Array.isArray(localConfig?.alias)
        ? localConfig.alias
        : [
            {
              find: '~@',
              replacement: path.join(ALIAS_ROOT_PATH + 'components/')
            },
            {
              find: '~',
              replacement: path.join(ALIAS_ROOT_PATH)
            }
          ]
    },
    /** 导入 .css 文件将会把内容插入到 <style> 标签中，同时也带有 HMR 支持。也能够以字符串的形式检索处理后的、作为其模块默认导出的 CSS。 */
    css: {
      modules: localConfig.cssModules
        ? {
            // css模块化 文件以.module.[css|less|scss]结尾
            generateScopedName: '[name]__[local]___[hash:base64:5]',
            hashPrefix: 'winkey'
          }
        : false,
      /** 指定传递给 CSS 预处理器的选项。文件扩展名用作选项的键 */
      preprocessorOptions: {
        less: {
          /** 支持内敛JavaScript */
          javascriptEnabled: true
        },
        scss: {
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
      react(),
      tsconfigPaths(),
      StylelintPlugin({
        fix: true,
        quiet: true
      })
    ]
  }

  const { plugins = [], build = {} } = config
  // const env = loadEnv(mode, process.cwd())
  // const isBuild = command === 'build'

  // if (isBuild) {
  //   config.base = '/' + BASE_PROJECT_PATH
  //   // 压缩 Html 插件
  //   config.define = {
  //     'process.env.NODE_ENV': '"production"'
  //   }
  // }
  console.log('localConfig:', localConfig)
  return localConfig
}

export default () => {
  return {
    server: {
      host: '0.0.0.0',
      port: 5010
    }
  }
}
