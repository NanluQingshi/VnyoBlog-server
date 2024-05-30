/*
 * @Author: NanluQingshi
 * @Date: 2024-05-30 15:27:10
 * @Description: 博客接口
 */
const express = require('express')
const uuid = require('node-uuid')
const dayjs = require('dayjs')
const BlogModel = require('../models/blogSchema')
const UserModel = require('../models/userSchema')
const Token = require('../utils/token')

// 创建路由实例
const router = express.Router()

// 发布博客
router.post('/publish', async (req, res) => {
  // 发布博客前先进行身份认证
  const tokenObj = Token.tokenVerification(req)
  if (tokenObj === Token.ERROR_MESSAGE) {
    return res.send({
      code: 701,
      msg: '无效 token',
      data: {}
    })
  }

  const user_id = tokenObj._id
  // 记得用 await
  const doc = await UserModel.findOne({ _id: user_id })
  // console.log(doc)
  // 从请求体中取出数据
  const { title, label, cover, content } = req.body

  const blog_id = uuid()  // 博客 id

  // 插入到博客表中
  try {
    const blog = new BlogModel({
      _id: blog_id,
      title,
      cover,
      content,
      label,
      author: user_id
    })
    await blog.save()
    res.send({
      code: 701,
      msg: '博客发布成功',
      data: {
        author: doc.username,
        title: blog.title,
        cover: blog.cover,
        content: blog.content,
        label: blog.label
      }
    })
  } catch (err) {
    return res.status(500).send({
      code: 700,
      msg: err.message,
      data: {}
    })
  }

  // 插入到用户表中

})

module.exports = router