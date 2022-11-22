const { Sequelize } = require('sequelize')
const { MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PSW,
  MYSQL_DB } = require('../config/config.default')

const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PSW, {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  dialect: 'mysql'
})

// 测试连接
sequelize.authenticate()
  .then(() => console.info('数据库连接成功'))
  .catch(err => console.info('数据库连接失败', err))

// 导出sequelize实例对象
module.exports = sequelize