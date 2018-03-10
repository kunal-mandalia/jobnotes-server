const DatabaseLayer = (ORM) => {
  return {
    /**
     * 
     * @param {Object} credential: {email, password}
     * @return {String} email
     */
    register: async function register(credential) {
      try {
        const { email, password } = credential
        if (typeof email !== 'string' || typeof password !== 'string') {
          throw 'Arguments must be type string'
        }
        // todo: create user if doesn't exist using ORM
        return email
      } catch (e) {
        throw new Error(e)
      }
    },
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
        // todo: find user based ons
        return true
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
