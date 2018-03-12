const { DatabaseLayer } = require('./database-layer')

let db = { query: jest.fn() }
const dbLayer = DatabaseLayer(db)

afterEach(() => {
  db.query.mockClear()
})

describe('database-layer', () => {
  describe('register()', () => {
    it('should reject given invalid Credential', async () => {
      const credential = { email: null, password: '' }
      await expect(dbLayer.register(credential)).rejects
    })

    it('should create a new account awaiting email confirmation', async () => {
      const credential = { email: "kunal.v.mandalia@gmail.com", password: 'unit-test-password' }
      db.query.mockReturnValueOnce(credential.email)
      const result = await dbLayer.register(credential)
      expect(result).toEqual(credential.email)
    })
  })

  describe('confirmAccount()', () => {
    it('should reject given invalid confirmation code', async () => {
      const confirmationCode = null
      await expect(dbLayer.confirmAccount(confirmationCode)).rejects
    })

    it('should update user account status to CONFIRMED and return TRUE', async () => {
      const confirmationCode = 'VALID_TEST_CONFIRMATION_CODE'
      
      // todo: verify ORM called with update request
      const result = await dbLayer.confirmAccount(confirmationCode)
      expect(result).toEqual(true)
    })
  })
})
