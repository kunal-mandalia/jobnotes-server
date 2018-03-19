require('dotenv').config('.env.test')
const { authenticate } = require('./authentication')
const jwt = require('jsonwebtoken')

describe(`middleware`, () => {
  describe(`authenticate()`, () => {
    const req = {
      headers: {},
      body: {}
    }
    const res = {
      status: jest.fn().mockReturnValue({
        json: () => {}
      })
    }
    const next = jest.fn()

    afterEach(() => {
      res.status.mockClear()
      next.mockClear()
    })

    it(`should skip token verification when no token provided`, () => {
      authenticate(req, res, next)
      expect(req.user).toBeFalsy()
      expect(next.mock.calls).toHaveLength(1)      
    })

    // bad/malformed token
    describe(`given bad/malformed token`, () => {
      it(`should return 400 status code`, () => {
        const badToken = 'exampleOfAMalformedToken'
        req.headers.authorization = badToken
        authenticate(req, res, next)
        expect(res.status.mock.calls[0][0]).toEqual(400)
        expect(req.user).toBeFalsy()
      })
    })

    // good token
    describe(`given a valid token`, () => {
      it(`should attach decoded token to req.user so it can be used for next request`, async function () {
        const user = {
          user_id: '1234',
          name: 'Kunal Mandalia',
          email: 'kunal.v.mandalia@gmail.com'
        }
        const token = await jwt.sign(user, (process.env.JWT_SECRET_KEY || 'secret'), { expiresIn: '1m' })
        req.headers.authorization = `Bearer ${token}`
        authenticate(req, res, next)
        for (key in user) {
          expect(req.user[key]).toEqual(user[key])
        }
      })
    })
  })
})