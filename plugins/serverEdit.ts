import { Plugin } from 'vite'

function ServeEdit(): Plugin {
  return {
    name: 'serveEdit',
    // 服务器实例
    configureServer(server) {
      // server.middlewares.use((req, res) => {
      //   // console.log(req)
      //   // console.log('====')
      //   // console.log(res)
      // })
      // // 添加中间件
      // server.middlewares.use((req, res) => {
      //   // 自定义请求处理...
      // })
      // // 匹配前缀
      // server.middlewares.use('/foo'，(req, res, next) => {
      //   // 自定义请求处理...
      // })
    },
    config(val) {
      // console.log(val.plugins)
    },
    // configResolved(val) {
    //   console.log('configResolved')
    //   console.log(val.plugins)
    // },
    // transform(code, id) {
    //   console.log('transform')
    //   return code
    // }
  }
}

export default ServeEdit