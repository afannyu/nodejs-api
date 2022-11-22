// 导入koa框架，是一个类，再去实例化一个koa对象
const Koa = require('koa')
const { KoaBody } = require('koa-body')

const app = new Koa()
console.log(app)
// app.use(KoaBody())

// 导入路由
const userRoute = require('./router/user.route')
app.use(userRoute.routes()).use(userRoute.allowedMethods())

app.listen(3000, () => {
  console.info('http://localhost:3000')
})