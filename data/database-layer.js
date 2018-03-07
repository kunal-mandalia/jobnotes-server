const databaseLayer = (ORM) => {
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
        return email
      } catch (e) {
        throw new Error(e)
      }
    }
  }
}

module.exports = {
  databaseLayer,
}
