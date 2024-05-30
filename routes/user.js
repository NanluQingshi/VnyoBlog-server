/*
 * @Author: nlqs
 * @Date: 2024-05-26 18:35:00
 * @Description: 用户接口
 */
const express = require('express')
const uuid = require('node-uuid')
const router = express.Router()
const UserModel = require('../models/userSchema')
const Token = require('../utils/token')

// 用户注册
router.post('/register', async (req, res) => {
  const { username, password } = req.body
  try {
    const doc = await UserModel.findOne({ username })
    const _id = uuid()
    if (!doc) {
      await UserModel.create({ _id, username, password })
      return res.send({
        // 701 操作成功
        code: 701,
        msg: "注册成功~",
        data: {}
      })
    } else {
      return res.send({
        code: 701,
        msg: '该用户已存在!',
        data: {}
      })
    }
  } catch (err) {
    return res.status(500).send({
      // 700 操作失败
      code: 700,
      msg: err.message,
      data: {}
    })
  }
})

// 用户登录
router.post('/login', async (req, res) => {
  try {
    // 从请求体中获取数据
    const { username, password } = req.body
    // 从数据库中查找用户文档
    const doc = await UserModel.findOne({ username })
    // 文档存在且匹配的上
    if (doc !== null && doc.username === username && doc.password === password) {
      // 生成加密的 token
      const token = Token.tokenEncryption(doc._id, Token.SECRET_KEY)
      // 更新用户 token
      await UserModel.updateOne(
        { _id: doc._id },
        {
          '$set': { // 更新用户 token
            token
          }
        }
      )
      return res.send({
        code: 701,
        msg: '登录成功~',
        data: {
          token,
          username: doc.username
        }
      })
    } else if (doc === null) {
      return res.send({
        code: 700,
        msg: '该用户不存在!',
        data: {}
      })
    } else {
      return res.send({
        code: 700,
        msg: '用户名或密码错误!',
        data: {}
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({
      code: 700,
      msg: err.message,
      data: {}
    })
  }
})

// 获取用户信息
router.get('/getInfo', async (req, res) => {
  const tokenObj = Token.tokenVerification(req)
  console.log(tokenObj)
  if (tokenObj === Token.ERROR_MESSAGE) {
    return res.send({
      code: 701,
      msg: '无效 token',
      data: {}
    })
  }
  const _id = tokenObj._id
  try {
    const doc = await UserModel.findOne({ _id })
    return res.send({
      code: 701,
      msg: '获取用户信息成功~',
      data: {
        userInfo: {
          username: doc.username,
          gender: doc.gender,
          age: doc.age,
          gender: doc.gender,
          collections: doc.collections,
          likes: doc.likes,
          articles: doc.articles
        }
      }
    })
  } catch (err) {
    return res.send({
      code: 700,
      msg: '用户名或密码错误!',
      data: {}
    })
  }
})

// 修改用户信息
router.post('/update', async (req, res) => {
  const tokenObj = Token.tokenVerification(req)
  if (tokenObj === Token.ERROR_MESSAGE) {
    res.send({
      code: 701,
      msg: '无效 token',
      data: {}
    })
  }
  const user_id = tokenObj._id
  const { username, gender, age, email } = req.body
  try {
    await UserModel.updateOne(
      { _id: user_id },
      {
        "$set": {
          username,
          gender,
          age,
          email
        }
      }
    )
    res.send({
      code: 701,
      msg: '信息修改成功~',
      data: {
        userInfo: {
          username,
          gender,
          age,
          email
        }
      }
    })
  } catch (err) {
    res.status(500).send({
      code: 700,
      msg: err.message,
      data: {}
    })
  }
})

module.exports = router