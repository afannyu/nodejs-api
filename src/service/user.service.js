// servers层用于操作数据库
const User = require('../model/user.model')
class UserService {
  // 插入数据
  async createUser (user_name, password) {
    // await User.create({
    //   // 表的字段，es6语法，当key与value值相同，可以只写一个
    //   user_name: user_name,
    //   password: password
    // })

    const res = await User.create({ user_name, password })
    return res
  }

  async getUserInfo ({ ...args }) {
    const whereOpt = { ...args }

    // 查询单条记录，找到满足条件的第一个条目
    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin'],
      where: whereOpt
    })
    console.log(whereOpt, 'whereOptwhereOptwhereOpt')

    return res ? res.dataValues : null
  }
}

module.exports = new UserService()