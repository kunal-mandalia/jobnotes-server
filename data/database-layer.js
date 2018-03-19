const bcrypt = require('bcrypt')
const ORM = require('./model')
const {
  isValidEmail,
  generateRandomAlphanumericString
} = require('../util/helper')
const {
  AWAITING_CONFIRMATION,
  USER
} = require('./constants')


const DatabaseLayer = (db = ORM) => {
  return {
    /**
     * Updates user's account status to confirmed
     * @param {String} confirmationCode
     * @return {Bool} successfully confirmed account
     */
    confirmAccount: async function confirmAccount(confirmationCode) {
      try {
        if (typeof confirmationCode !== 'string') {
          throw 'Argument must be type string'
        }

        // todo: find user based ons: sequelize findOne query structure
        // db.User.findOne({

        // })
        return true
      } catch (e) {
        throw new Error(e)
      }
    },
    getUserById: async function getUserById(user_id) {
      try {
        const result = db.User.findById(user_id)
        return result
      } catch (e) {
        throw new Error(e)
      }
    },
    /**
     * 
     * @param {Object} credential: {email, password}
     * @return {String} email
     */
    register: async function register(credential) {
      try {
        if (!credential || !credential.email || !credential.password) {
          throw 'Missing args'
        }
        if (typeof credential.email !== 'string' || typeof credential.password !== 'string') {
          throw 'Invalid arg type(s)'
        }
        if (!isValidEmail(credential.email)) {
          throw 'Invalid email'
        }
        const { email, password } = credential
        const confirmationCode = generateRandomAlphanumericString()
        const hash = await bcrypt.hash(password, 10)
        const res = await db.User.create({
          email,
          password: hash,
          confirmation_code: confirmationCode,
          role: USER,
          status: AWAITING_CONFIRMATION
        })
        return res.dataValues.email
      } catch (e) {
        throw new Error(e)
      }
    }
  }
}

const databaseLayer = DatabaseLayer()
module.exports = {
  DatabaseLayer,
  databaseLayer
}
