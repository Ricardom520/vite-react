import path from 'path/posix'
import { Plugin } from 'vite'
const pkg = require('../package.json')
const fs = require('fs')

function modifyDistPath(): Plugin {
  return {
    name: 'modifyDistPath',
    closeBundle() {
      /** 转移html文件 */
      fs.mkdir(path.join(`./dist/project/${pkg.name}/pc/html/`), function (err: Error) {
        if (err) {
          return console.error(err)
        }

        fs.renameSync(
          path.join(`./dist/index.html`),
          path.join(`./dist/project/${pkg.name}/pc/html/index.html`)
        )
      })

      /** 转移manifest文件 */
      fs.mkdir(path.join(`./dist/project/${pkg.name}/pc/assets/`), function (err: Error) {
        if (err) {
          return console.error(err)
        }

        fs.renameSync(
          path.join(`./dist/rev-manifest.json`),
          path.join(`./dist/project/${pkg.name}/pc/assets/rev-manifest.json`)
        )
      })
    }
  }
}

export default modifyDistPath
