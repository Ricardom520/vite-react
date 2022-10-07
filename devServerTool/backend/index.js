const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
  res.header("Content-Type", "application/json;charset=utf-8")
  next()
})

app.get('/getLocalFolder', async function (req, res) {
  const readFile = async (filePath, abPath) => {
    const content = []
    const files = await fs.readdirSync(path.join(filePath))

    for (let i = 0; i < files.length; i++) {
      const _abPath = '/' + files[i]
      const _path = filePath + _abPath
      
      const stat = await fs.statSync(_path)

      if (stat && stat.isDirectory()) {
        const children = await readFile(_path, abPath + _abPath)
        content.push({
          name: files[i],
          type: 0,
          path: abPath + _abPath,
          children: children
        })
      } else {
        content.push({
          name: files[i],
          type: 1,
          path: abPath + _abPath,
        })
      }
    }

    return content
  }

  const filesRes = await readFile('../../src', '')

  res.send({
    success: 0,
    data: filesRes
  })
})

app.get('/getLocalFileDetail', async function (req, res) {
  console.log(req.headers)
})

const server = app.listen(8081, function () {

  var port = server.address().port

  console.log("应用实例，访问地址为 http://localhost:%s", port)
})