const db = require('./database-layer')

const Resolver = databaseLayer => {
  // register: ({credential: { email, password }},)
  // todo: clarify gql function signature
  return {
    register: async ({credentail}) => {
      const result = await databaseLayer.register(credentail)
      return result
    }
  }
}

module.exports = {
  Resolver,
  resolver: Resolver(db)
}
