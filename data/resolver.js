const db = require('./database-layer').databaseLayer

const Resolver = databaseLayer => {
  // register: ({credential: { email, password }},)
  // todo: clarify gql function signature
  return {
    register: async ({credential}) => {
      const result = await databaseLayer.register(credential)
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
