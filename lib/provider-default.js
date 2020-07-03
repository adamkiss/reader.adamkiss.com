/**
 * Default provider
 */
const {parse} = require('@jbrayton/mercury-parser')
module.exports = {
	match: () => null,
	getUrl: () => null,
	getRequestUrl: ({url}) => url,
	get: async url => {
		return await parse(url)
	}
}
