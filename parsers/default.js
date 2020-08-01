/**
 * Default provider
 */
const { parse } = require('@jbrayton/mercury-parser')
module.exports = {
	getRequestUrl: ({ url }) => url,
	get: async url => {
		return await parse(url)
	}
}
