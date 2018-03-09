const db = require('./database-layer')

const Resolver = databaseLayer => {
  // register: ({credential: { email, password }},)
  // todo: clarify gql function signature
  return {
    register: async ({credentail}) => {
      const result = await databaseLayer.register(credentail)
      return result
    },
    confirmAccount: async ({confirmationCode}) => {
      const result = await databaseLayer.confirmAccount(confirmationCode)
      return result
    }
  }
}

const resolver = Resolver(db)

module.exports = {
  Resolver,
  resolver
}
