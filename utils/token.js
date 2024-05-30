/*
 * @Author: nlqs
 * @Date: 2024-05-26 23:25:23
 * @Description: Token 工具
 */
// 导入模块
const jwt = require('jsonwebtoken')

// 创建 Token 对象
const Token = {
  /* 加密密钥 */
  SECRET_KEY : 'This is My Blog',

  /* 错误信息 */
  ERROR_MESSAGE : 'token is error',

  /**
   * @description: 加密 token
   * @param {*} _id ：要加密的数据-用户文档 id
   * @param {*} jwt_key - 加密所使用的密钥
   * @return {*}
   */  
  tokenEncryption(_id, jwt_key) {
    // 对 _id 进行加密
    let token = jwt.sign(
      { _id },
      jwt_key,
      // 设置过期时间 2 h
      { expiresIn: 60 * 60 * 2 }
    )
    return token
  },

  /**
   * @description: 解密 token
   * @param {*} token
   * @param {*} jwt_key
   * @return {*}
   */  
  tokenDecryption(token, jwt_key) {
    try {
      // 解密 token，解出来的是 { _id, iat, exp }
      let secretKey = jwt.verify(token, jwt_key)
      console.log(secretKey)
      return secretKey
    } catch(err) {
      console.log(err)
      return this.ERROR_MESSAGE
    }
  },

  /**
   * @description: token 校验
   * @param {*} req - 请求
   * @return {*}
   */  
  tokenVerification(req) {
    console.log('req.headers.token: ', req.headers.token)
    return this.tokenDecryption(req.headers.token, this.SECRET_KEY)
  }
}

module.exports = Token