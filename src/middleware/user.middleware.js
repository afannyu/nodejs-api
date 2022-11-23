const { getUserInfo } = require('../service/user.service')
const bcrypt = require('bcryptjs')
const { userFormateError, userAlreadyExisted, userRegisterError, userDoesNotExist, userLoginError, invalidPassword } = require('../constant/err.type')
// 验证器
const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  // 进行错误处理，验证合法性
  if (!user_name || !password) {
    console.error('用户名或者密码为空', ctx.request.body)
    ctx.app.emit('error', userFormateError, ctx)
    return
  }
  await next()
}

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body
  // 合理性，如果用户名存在就继续判断合理性，根据用户名查询用户信息
  try {
    const res = await getUserInfo({ user_name })
    if (res) {
      console.error('用户名已经存在', { user_name })
      ctx.app.emit('error', userAlreadyExisted, ctx)
      return
    }
  } catch (err) {
    ctx.app.emit('error', userRegisterError, ctx)
    return
  }

  await next()
}

// 密码的加密
const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  ctx.request.body.password = hash

  await next()
}

// 用户登录时判断
const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  try {
    // 判断用户是否存在（不存在：报错）
    const res = await getUserInfo({ user_name })
    if (!res) {
      console.error('用户不存在', { user_name })
      ctx.app.emit('error', userDoesNotExist, ctx)
      return
    }
    // 判断密码是否匹配（不匹配：报错）
    if (!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit('error', invalidPassword, ctx)
      return
    }
  } catch (err) {
    console.error(err)
    ctx.app.emit('error', userLoginError, ctx)
    return
  }
  await next()
}

module.exports = {
  verifyUser, userValidator, cryptPassword, verifyLogin
}