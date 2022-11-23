const { createUser, getUserInfo } = require('../service/user.service')
const { userRegisterError } = require('../constant/err.type')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env

class UserController {
  async register (ctx, next) {
    // 获取数据
    const { user_name, password } = ctx.request.body
    try {
      // 操作数据库
      const res = await createUser(user_name, password)
      // 返回结果
      ctx.body = {
        code: 0,
        message: '用户注册成功',
        result: {
          id: res.id,
          user_name: res.user_name
        }
      }
    } catch (err) {
      console.log(err)
      ctx.app.emit('error', userRegisterError, ctx)
    }
  }
  async login (ctx, next) {
    const { user_name } = ctx.request.body
    // 获取用户信息（在token的payload中，记录id，user_name，is_admin）
    try {
      const { password, ...res } = await getUserInfo({ user_name })
      ctx.body = {
        code: 0,
        message: '用户登录成功',
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' })
        }
      }
    } catch (err) {
      console.error('用户登录失败', err)
    }
  }
}

module.exports = new UserController()