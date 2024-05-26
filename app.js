const express = require('express')
const app = express()
// MongoDB 数据库
require('./db/index')
// 用户路由
const userRouter = require('./routes/user')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/user', userRouter)

module.exports = app;
