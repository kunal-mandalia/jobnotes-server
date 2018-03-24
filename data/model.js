const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { sequelize } = require('./connection')
const constant = require('./constants')
const { getNowISO } = require('../util/helper')

const User = sequelize.define('users', {
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
  )}
)

// Instance methods
User.prototype.setPassword = async function (password) {
  this.password = await bcrypt.hash(password, bcrypt.genSaltSync(8))
  await this.save()
}

User.prototype.login = async function (password) {
  const isPasswordValid = await bcrypt.compare(password, this.password)
  if (isPasswordValid) {
    const token = await jwt.sign({ user_id: this.user_id }, process.env.JWT_SECRET_KEY)
    this.last_login = getNowISO()
    await this.save()
    return token
  } else {
    throw 'Bad credential'
  }
}

module.exports = {
  User
}
