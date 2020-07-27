const { parse } = require('@jbrayton/mercury-parser')

module.exports = {
	getRequestUrl: ({ url }) => url,
	get: async url => await parse(url)
}
