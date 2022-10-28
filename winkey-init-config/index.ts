import path from 'path'
import { OutgoingHttpHeaders, Server } from 'node:http'
import {
  UserConfigExport,
  loadEnv,
  ConfigEnv,
  CorsOptions,
  WatchOptions,
  PluginOption,
  CSSOptions
} from 'vite'
import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'
import tsconfigPaths from 'vite-tsconfig-paths'
import StylelintPlugin from 'vite-plugin-stylelint'
import { createHtmlPlugin } from 'vite-plugin-html'
import modifyDistPath from './plugins/modifyDistPath'
import { cwd } from './js/consts'
const fs = require('fs')

const { exec } = require('child_process')

const IS_WINDOWS = process.platform == 'win32'
const IS_LINUX = process.platform === 'linux'

const runCMD = (str: any, iEnv?: any, iPath?: any, showOutput?: any, newWindow?: any) => {
  const myCmd = exec
  const runner = (next: any, reject: any) => {
    if (typeof iEnv === 'string') {
      newWindow = showOutput
      showOutput = iPath
      iPath = iEnv
      iEnv = null
    }

    if (showOutput === undefined) {
      showOutput = true
    }

    if (!str) {
      return reject('没任何 cmd 操作')
    }

    if (!/Array/.test(Object.prototype.toString.call(str))) {
      str = [str]
    }

    if (iPath && !fs.existsSync(path)) {
      return reject(`runCMD 当前目录不存在：${iPath}`)
    }

    let iCmd = str.join(' && ')

    if (newWindow) {
      if (IS_WINDOWS) {
        iCmd = `cmd /k start cmd /k ${iCmd}`
      } else if (IS_LINUX) {
        iCmd = `${iCmd}`
      } else {
        iCmd = `osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' -e 'delay 0.2' -e 'tell application "Terminal" to do script "cd ${iPath} && ${iCmd}" in selected tab of the front window'`
      }
    }

    const child = myCmd(
      iCmd,
      {
        maxBuffer: 2000 * 1024,
        cwd: iPath || '',
        env: iEnv
      },
      (err: any, stdout: any) => {
        if (err) {
          if (showOutput) {
            console.log('cmd运行 出错')
            console.log(err.stack)
          }
          reject(err)
        } else {
          next(stdout)
        }
      }
    )

    child.stdout.setEncoding('utf8')

    if (showOutput) {
      child.stdout.pipe(process.stdout)
      child.stderr.pipe(process.stderr)
    }

    if (newWindow && IS_WINDOWS) {
      next()
    }
  }

  return new Promise(runner)
}

// runCMD('node ./winkey_tool/server/index.ts')

export interface WinkeyProjectConfig {
  /** 根目录 */
  root?: string
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
  /**  */
  cacheDir?: string
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
  /** 服务端开发 */
  server?: {
    /** 本地开发端口号 */
    port?: number
    /** 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。 */
    strictPort?: boolean
    /** 需要一个合法可用的证书。 */
    https?: boolean
    /** 在开发服务器启动时自动在浏览器中打开应用程序。 */
    open?: string | boolean
    /** 为开发服务器配置 CORS。 */
    cors?: boolean | CorsOptions
    /** 指定服务器响应的 header。 */
    headers?: OutgoingHttpHeaders
    /** 禁用或配置 HMR 连接（用于 HMR websocket 必须使用不同的 http 服务器地址的情况）。 */
    hmr?:
      | boolean
      | {
          protocol?: string
          host?: string
          port?: number
          path?: string
          timeout?: number
          overlay?: boolean
          clientPort?: number
          server?: Server
        }
    /** 传递给 chokidar 的文件系统监听器选项。 */
    watch?: WatchOptions
  }
  /** 是否启用样式模块化 */
  cssModules?: boolean
  /** 设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息 */
  clearScreen?: boolean
  /** 小于此阈值的导入或引用资源将内联为 base64 编码 */
  limitSize?: number
  /** 输出目录 */
  outDir?: string
  /** 自定义插件 */
  plugins?: PluginOption[]
  /** 自定义css */
  css?: CSSOptions
  /** 是否启用小助手 */
  winkeyTool?: boolean
}

const IMAGES_REGEXP = ['png', 'jpg', 'jpge', 'gif', 'svga']

export const initWinkeyConfig = (
  winkeyConfig: WinkeyProjectConfig,
  viteConfig?: {
    mode: string
    command: string
    ssrBuilr: boolean
  }
) => {
  const localConfig = winkeyConfig

  /** 基础路径 */
  const BASE_PROJECT_PATH = localConfig?.dest?.basePath || './'
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
  /** 输出目录 */
  const OUTDIR_PATH = localConfig?.outDir || './dist/'

  const config: UserConfigExport = {
    /** 根目录 */
    root: localConfig.root || './',
    // /** 存储缓存文件的目录。 */
    cacheDir: localConfig.cacheDir || 'node_modules/.vite',
    clearScreen: localConfig.clearScreen || false,
    /** 出口文件 */
    build: {
      outDir: path.join(cwd, OUTDIR_PATH),
      emptyOutDir: true,
      manifest: 'rev-manifest.json',
      assetsInlineLimit: 4096,
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
      port: localConfig.server?.port || 5000
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
      modifyDistPath({
        root: OUTDIR_PATH + BASE_PROJECT_PATH,
        outDir: OUTDIR_PATH,
        html: HTML_PATH,
        assets: '/assets'
      }),
      react(),
      tsconfigPaths(),
      StylelintPlugin({
        fix: true,
        quiet: true
      })
    ]
  }

  /** 合并plugin */
  config.plugins = Object.assign(config.plugins as PluginOption[], localConfig.plugins || [])
  /** 合并css */
  config.css = Object.assign(config.css as CSSOptions, localConfig.css || {})

  const { mode, command } = viteConfig as ConfigEnv
  const env = loadEnv(mode, process.cwd())
  const isBuild = command === 'build'

  if (isBuild) {
    config.base = '/' + BASE_PROJECT_PATH
    // 压缩 Html 插件
    config.define = {
      'process.env.NODE_ENV': '"production"'
    }
  } else {
    config.plugins = [
      ...config.plugins,
      createHtmlPlugin({
        inject: {
          data: {
            ...env,
            devServerToolScript: localConfig.winkeyTool
              ? `<script type="module" src="/winkey_tool/js/index.js"></script>`
              : '',
            devServerToolCss: localConfig.winkeyTool
              ? `<link href="/winkey_tool/css/index.css" rel="stylesheet" >`
              : ''
          }
        }
      })
    ]
  }

  return config
}
