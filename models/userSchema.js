/*
 * @Author: nlqs
 * @Date: 2024-05-26 18:35:31
 * @Description: 用户表
 */
// 导入 mongoose 库
const mongoose = require('mongoose')
// 定义 Schema 对象，用于定义文档结构
const Schema = mongoose.Schema

const userSchema = new Schema({
  _id: String,
  username: String,
  password: String,
  age: {
    type: Number,
    default: 0
  },
  gender: {
    type: String,
    default: '暂无'
  },
  email: {
    type: String,
    default: '暂无'
  },
  token: {
    type: String,
    defaule: ''
  },
  // 收藏
  collections: [],
  // 点赞
  likes: [],
  // 博客
  articles: []
})

// 创建 UserModel 模型。模型会映射到 user 集合
const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel