// 导入koa-router
const Router = require('koa-router')
const { userValidator, verifyUser, cryptPassword, verifyLogin } = require('../middleware/user.middleware')
const { register, login } = require('../controller/user.controller')
const router = new Router({ prefix: '/user' })

// 注册接口 post /user/
router.post('/register', userValidator, verifyUser, cryptPassword, register)

// 登录接口
router.post('/login', userValidator, verifyLogin, login)

module.exports = router