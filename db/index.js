/*
 * @Author: nlqs
 * @Date: 2024-05-26 18:00:52
 * @Description: 数据库配置及连接
 */
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/vynoBlog')

const db = mongoose.connection

db.on('open', () => {
  console.log('成功连接到 MongoDB 数据库')
})

db.once('error', err => {
  console.log('MongoDB 连接失败~', err)
})