const { DatabaseLayer } = require('./database-layer')

let db = {
  User: {
    create: jest.fn()
  }
}
const dbLayer = DatabaseLayer(db)

afterEach(() => {
  db.User.create.mockClear()
})

describe('database-layer', () => {
  describe('register()', () => {
    
    it('should not call user create given invalid credential', () => {
      const credential = { email: null, password: '' }
      expect(async () => { await dbLayer.register(credential) }).rejects
      expect(db.User.create).not.toBeCalled()
    })
    
    it('should reject given invalid credential', () => {
      const credential = { email: null, password: '' }
      expect(async () => { await dbLayer.register(credential) }).rejects
    })

    it('should create a new account awaiting email confirmation', async () => {
      const credential = { email: "kunal.v.mandalia@gmail.com", password: 'unit-test-password' }
      db.User.create.mockReturnValueOnce({ dataValues: { email: credential.email }})
      const result = await dbLayer.register(credential)
      expect(result).toEqual(credential.email)
    })
  })

  describe('confirmAccount()', () => {
    it('should reject given invalid confirmation code', async () => {
      const confirmationCode = null
      expect(async () => { await dbLayer.confirmAccount(confirmationCode) }).rejects
    })

    it('should update user account status to CONFIRMED and return TRUE', async () => {
      const confirmationCode = 'VALID_TEST_CONFIRMATION_CODE'
      
      // todo: verify ORM called with update request
      const result = await dbLayer.confirmAccount(confirmationCode)
      expect(result).toEqual(true)
    })
  })
})
