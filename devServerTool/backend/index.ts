const express = require('express')

const app = express()

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
  res.header("Content-Type", "application/json;charset=utf-8")
  next()
})

app.get('/getLocalFolder', function (req, res) {
  console.log('进来了')
  res.send({
    success: 0
  })
})

const server = app.listen(8081, function () {

  var port = server.address().port

  console.log("应用实例，访问地址为 http://localhost:%s", port)
})