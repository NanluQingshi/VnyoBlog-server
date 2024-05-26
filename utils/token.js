// 导入模块
const jwt = require('jsonwebtoken')

// 创建 Token 对象
const Token = {
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
      // 设置过期时间 5 min
      { expiresIn: 60 * 5 }
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
      // 解密 token
      let secretKey = jwt.verify(token, jwt_key)
      return secretKey
    } catch {
      return 'token is error'
    }
  }
}