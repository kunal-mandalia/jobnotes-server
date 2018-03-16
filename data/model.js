const Sequelize = require('sequelize')
const { sequelize } = require('./connection')

const User = sequelize.define('user', {
  user_id: { type: Sequelize.INTEGER, unique: true, primaryKey: true, autoIncrement: true },
  email: { type: Sequelize.STRING, unique: true },
  password: Sequelize.STRING,
  last_login: Sequelize.DATE
})

module.exports = {
  User
}
