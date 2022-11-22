const { DataTypes } = require('sequelize')
const sequelize = require('../db/sequelize')

const User = sequelize.define('user', {
  user_name: {
    type: DataTypes.STRING, // 类型
    allowNull: false, // 是否为空
    unique: true,  // 是否具有唯一性
    comment: '用户名，唯一的'  // 备注
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: '密码'
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0, // 默认值
    comment: '是否为管理员，1是，0不是'
  }
}, {
  freezeTableName: true,
  timestamps: false
})

// 强制同步数据库
// User.sync({ force: true })

// 将User导出
module.exports = User