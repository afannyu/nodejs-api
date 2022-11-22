// servers层用于操作数据库
const User = require('../model/user.model')
class UserService {
  async createUser (user_name, password) {
    // 插入数据
    // await User.create({
    //   // 表的字段，es6语法，当key与value值相同，可以只写一个
    //   user_name: user_name,
    //   password: password
    // })

    const res = await User.create({ user_name, password })
    return res
  }
}

module.exports = new UserService()