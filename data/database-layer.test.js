const { DatabaseLayer } = require('./database-layer')

let db = {
  User: {
    create: jest.fn(),
    findById: jest.fn(),
    update: jest.fn()
  }
}
const dbLayer = DatabaseLayer(db)

afterEach(() => {
  db.User.create.mockClear()
  db.User.findById.mockClear()
})

describe('database-layer', () => {
  describe('confirmAccount()', () => {
    const VALID_TEST_CONFIRMATION_CODE = 'VALID_TEST_CONFIRMATION_CODE'
    const INVALID_TEST_CONFIRMATION_CODE = 'INVALID_TEST_CONFIRMATION_CODE'

    db.User.update.mockImplementation((values, options) => {
      if (options.where.confirmation_code === VALID_TEST_CONFIRMATION_CODE) return [1]
      return [0]
    })

    it('should reject given invalid confirmation code', async () => {
      const confirmationCode = null
      await expect(dbLayer.confirmAccount(confirmationCode)).rejects.toBeInstanceOf(Error)
    })

    it('should update user account status to CONFIRMED and return TRUE', async () => {
      const result = await dbLayer.confirmAccount(VALID_TEST_CONFIRMATION_CODE)
      expect(result).toEqual(1)
    })

    it('should update user account status to CONFIRMED and return 1', async () => {
      const result = await dbLayer.confirmAccount(VALID_TEST_CONFIRMATION_CODE)
      expect(result).toEqual(1)
    })

    it('should not update user status if confirmation code not found and return 0', async () => {
      const result = await dbLayer.confirmAccount(INVALID_TEST_CONFIRMATION_CODE)
      expect(result).toEqual(0)
    })
  })

  describe('getUserById()', () => {
    db.User.findById.mockImplementation(user_id => {
      if (user_id === 42) {
        return {
          user_id,
          email: 'mock@email.com'
        }
      }
      return null
    })

    it('should return user if found', async () => {
      const result = await dbLayer.getUserById(42)
      expect(result).toEqual({
        user_id: 42,
        email: 'mock@email.com'
      })
    })

    it('should return null if user not found', async () => {
      const result = await dbLayer.getUserById(400)
      expect(result).toEqual(null)
    })
  })

  describe('login()', () => {
    it('should throw given invalid credentials', async () => {
      const badCredential = { email: 'kunal@ltd.co', password: null }
      await expect(dbLayer.login(badCredential)).rejects.toBeInstanceOf(Error)
    })
  })

  describe('register()', () => {
    it('should not call user create given invalid credential', async () => {
      const credential = { email: null, password: '' }
      await expect(dbLayer.register(credential)).rejects.toBeInstanceOf(Error)
      expect(db.User.create).not.toBeCalled()
    })
    
    it('should reject given invalid credential', async () => {
      const credential = { email: null, password: '' }
      await expect(dbLayer.register(credential)).rejects.toBeInstanceOf(Error)
    })

    it('should create a new account awaiting email confirmation', async () => {
      const credential = { email: "kunal.v.mandalia@gmail.com", password: 'unit-test-password' }
      db.User.create.mockReturnValueOnce({ dataValues: { email: credential.email }})
      await expect(dbLayer.register(credential)).resolves.toEqual(credential.email)
    })
  })
})
