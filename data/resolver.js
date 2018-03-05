const db = require('./database-layer')

const Resolver = databaseLayer => {
  // register: ({credential: { email, password }},)
  // todo: clarify gql function signature
  return {
    register: (credentail) => {
      return databaseLayer.register(credentail)
    }
  }
}

module.exports = {
  Resolver,
  resolver: Resolver(db)
}
