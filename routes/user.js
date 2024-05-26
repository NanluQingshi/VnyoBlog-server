/*
 * @Author: nlqs
 * @Date: 2024-05-26 18:35:00
 * @Description: 用户接口
 */
const express = require('express')
const uuid = require('node-uuid')
const UserModel = require('../models/userSchema')
const router = express.Router()

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
        msg: "注册成功~"
      })
    } else {
      return res.send({
        code: 701,
        msg: '该用户已存在!'
      })
    }
  } catch(err) {
    return res.status(500).send({
      // 700 操作失败
      code: 700,
      msg: err.message
    })
  }
})

module.exports = router