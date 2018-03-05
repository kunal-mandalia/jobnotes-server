const databaseLayer = (ORM) => {
  return {
    /**
     * 
     * @param {Object} credential: {email, password}
     * @return {Promise}
     */
    register: function register(credential) {
      return new Promise((resolve, reject) => {
        const { email, password } = credential
        if (typeof email !== 'string' || typeof password !== 'string') {
          reject(new Error('error: bad credentials'))
        }
        resolve(email)
      })
    }
  }
}

module.exports = {
  databaseLayer,
}
