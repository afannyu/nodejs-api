// 导入koa-router
const Router = require('koa-router')
const router = new Router({ prefix: '/user' })

// 假设数据库
const db = [
  { id: 1, name: 'xiaomi', age: 90 },
  { id: 2, name: 'xiaotang', age: 20 },
  { id: 3, name: 'xiaoyu', age: 13 }
]

// 获取用户信息 get /user
router.get('/', (ctx) => {
  const { start, end } = ctx.query
  const res = db.filter((item) => item.age >= start && item.age <= end)
  res.length === 0 ? ctx.throw(404) : (ctx.body = res)
})

// 根据id获取用户信息 get /user/:id
router.get('/:id', (ctx) => {
  const id = ctx.params.id
  const res = db.filter((item) => item.id === Number(id))
  if (!res[0]) ctx.throw(404)
  ctx.body = res[0]
})

// post /user
router.post('/', (ctx) => {
  const req = ctx.request.body
})

module.exports = router