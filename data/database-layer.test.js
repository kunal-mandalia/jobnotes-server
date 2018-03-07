const { databaseLayer } = require('./database-layer')

const mockORM = {}
const dbLayer = databaseLayer(mockORM)

describe('database-layer', () => {
  describe('register()', () => {
    it('should reject given invalid Credential', async () => {
      const credential = { email: null, password: '' }
      await expect(dbLayer.register(credential)).rejects
    })

    it('should create a new account awaiting email confirmation', async () => {
      const credential = { email: "kunal.v.mandalia@gmail.com", password: 'unit-test-password' }
      const result = await dbLayer.register(credential)
      expect(result).toEqual(credential.email)
    })
  })
})
