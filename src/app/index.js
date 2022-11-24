const path = require('path')
const koaStatic = require('koa-static')

const Koa = require('koa')
const app = new Koa()

// 注册koaBody中间件，解析请求体中的body，挂载到ctx.request.body上
const { koaBody } = require('koa-body')
app.use(koaBody())

// 配置koa-body，使得文件可以上传
app.use(
  koaBody({
    multipart: true,
    formidable: {
      // 在配制选项option里，不建议使用相对路径
      // 在option里的相对路径，不是相对当前的文件，而是相对process.cwd()
      uploadDir: path.join(__dirname, '../upload'),
      keepExtensions: true
    }
  })
  // koaBody将文件上传之后会将文件的信息挂载在ctx.request.files里面
)

// koaStatic中需要传一个路径，表示将哪个路径作为静态资源的路径
app.use(koaStatic(path.join(__dirname, '../upload')))

// 导入路由
const router = require('../router/index')
app.use(router.routes()).use(router.allowedMethods())

// 导入koa-json-error中间件，然后注册该中间件
// const error = require('koa-json-error')
// app.use(error())
const errHandle = require('./errHandle')
app.on('error', errHandle)

module.exports = app