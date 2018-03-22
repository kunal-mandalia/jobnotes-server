const Sequelize = require('sequelize')
const { sequelize } = require('./connection')
const constant = require('./constants')

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
  )
}, {
  // As per https://stackoverflow.com/questions/34120548/using-bcrypt-with-sequelize-model
  freezeTableName: true,
  instanceMethods: {
    generateHash(password) {
      return bcrypt.hash(password, bcrypt.genSaltSync(8));
    },
    validPassword(password) {
      return bcrypt.compare(password, this.password);
    }
  }
})

module.exports = {
  User
}
