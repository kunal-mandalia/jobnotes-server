// Setup interface to postgres interaction
// resolver will call these functions instead of
// directly accessing the db

// Import database connection
const db = {}

/**
 * 
 * @param {Object} credential: {email, password}
 * @return {String} email
 */
function register(credential) {
  const { email, password } = credential
  // if !username ... throw error, bubbles up to graphql?

  // success
  return email
}

module.exports = {
  register,
}