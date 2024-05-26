const express = require('express')
// 跨域中间件
const cors = require('cors')
const app = express()

// MongoDB 数据库
require('./db/index')

// 用户路由
const userRouter = require('./routes/user')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/user', userRouter)

module.exports = app;
