/*
 * @Author: NanluQingshi
 * @Date: 2024-05-30 14:09:04
 * @Description: 博客文章表
 */
// 导入 mongoose 库
const mongoose = require('mongoose')
const dayjs = require('dayjs')

// 定义 Schema 对象，用于定义文档结构
const Schema = mongoose.Schema

// 定义文档 blog 的结构
const blogSchema = new Schema({
  _id: String,
  title: String,  // 标题
  author: String, // 作者
  cover: String,  // 封面路径
  content: String,  // 内容
  label: [],    // 博客标签
  collections: {  // 收藏量
    type: Number,
    default: 0
  },
  views: {  // 浏览量
    type: Number, 
    default: 0
  },
  likes: {
    type: Number,   // 点赞量
    default: 0
  },
  comments: [] // 评论
}, {
  // 自动添加 createdAt 和 updatedAt 两个字段，用于记录文档的创建时间和最后更新的时间
  timestamps: {
    currentTime: () => dayjs().format('YYYY-MM-DD HH:mm:ss')
  }
})

// 创建 BlogModel 模型，模型会映射到 blog 集合
const BlogModel = mongoose.model('blog', blogSchema)
// 导出模型
module.exports = BlogModel