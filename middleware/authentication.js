const jwt = require('jsonwebtoken')

/**
 * Applies decoded user token to req.user if
 * a valid JWT provided in auth header
 */
function authenticate (req, res, next) {
  const token = req.headers.authorization
  if (token) {
    const tokenValue = token.replace(/^Bearer\s/, '')
    jwt.verify(tokenValue, process.env.JWT_SECRET_KEY, (error, decoded) => {
      if (error) { return res.status(400).json({ error }) }
      req.user = decoded
      next()
    })
  } else {
    next()
  }
}

module.exports = {
  authenticate
}
