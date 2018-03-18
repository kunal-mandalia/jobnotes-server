const getNowISO = () => {
  const d = new Date()
  return d.toISOString()
}

const isValidEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

const generateRandomAlphanumericString = (length = 10) => Math.random().toString(36).slice(length * -1);

module.exports = {
  getNowISO,
  isValidEmail,
  generateRandomAlphanumericString
}
