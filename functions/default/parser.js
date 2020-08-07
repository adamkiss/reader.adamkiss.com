const { parse } = require('@jbrayton/mercury-parser')

module.exports = async ({url}) => await parse(url)
