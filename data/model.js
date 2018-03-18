const Sequelize = require('sequelize')
const { sequelize } = require('./connection')
const constant = require('./constants')

const User = sequelize.define('user', {
  user_id: { type: Sequelize.INTEGER, unique: true, primaryKey: true, autoIncrement: true },
  email: { type: Sequelize.STRING, unique: true },
  password: Sequelize.STRING,
  last_login: Sequelize.DATE,
  confirmation_code: Sequelize.STRING,
  role: Sequelize.ENUM(
    constant.ADMIN,
    constant.USER
  ),
  status: Sequelize.ENUM(
    constant.AWAITING_CONFIRMATION,
    constant.CLOSED,
    constant.DISABLED,
    constant.REGISTERED
  )
})

module.exports = {
  User
}
