const {
  getNowISO,
  isValidEmail
} = require('../../util/helper')

const register = ({ email, password }) => {
  if (!isValidEmail(email)) {
    throw 'Invalid email address'
  }
  return `insert into users (email, password, created_on) values ('${email}', '${password}', '${getNowISO()}')`
}

module.exports = {
  register
}
