const { createUser } = require('../service/user.service')

class UserController {
  async register (ctx, next) {
    // 获取数据
    const { user_name, password } = ctx.request.body

    // 进行错误处理
    // 合法性
    if (!user_name || !password) {
      console.info('用户名或者密码为空', ctx.request.body)
      ctx.status = 400
      ctx.body = {
        code: '10001',
        message: '用户名或者密码为空',
        result: ''
      }
    }
    // 合理性
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
  }
  async login (ctx, next) {
    ctx.body = '登录成功'
  }
}

module.exports = new UserController()