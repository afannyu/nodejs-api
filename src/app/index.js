const Koa = require('koa')
const app = new Koa()

// 注册koaBody中间件，解析请求体中的body，挂载到ctx.request.body上
const { koaBody } = require('koa-body')
app.use(koaBody())

// 导入路由
const userRoute = require('../router/user.route')
app.use(userRoute.routes()).use(userRoute.allowedMethods())

const goodsRoute = require('../router/user.route')
app.use(goodsRoute.routes()).use(goodsRoute.allowedMethods())

// 导入koa-json-error中间件，然后注册该中间件
// const error = require('koa-json-error')
// app.use(error())
const errHandle = require('./errHandle')
app.on('error', errHandle)

module.exports = app