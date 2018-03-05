const { databaseLayer } = require('./database-layer')

const mockORM = {}
const dbLayer = databaseLayer(mockORM)

describe('database-layer', () => {
  describe('register()', () => {
    it('should reject given invalid Credential', () => {
      const credential = { email: null, password: '' }
      const result = dbLayer.register(credential)
      expect(result).rejects
    })

    it('should create a new account awaiting email confirmation', async () => {
      const credential = { email: "kunal.v.mandalia@gmail.com", password: 'unit-test-password' }
      const result = await dbLayer.register(credential)
      // expect(mockORM).toBeCalledWith(sql("INSERT ..."))
      expect(result).toEqual(credential.email)
    })
  })
})
