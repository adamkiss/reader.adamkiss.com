/**
 * Fanfiction.net
 */
module.exports = {
	match: ({url}) => url.includes('fanfiction.net/s/'),
	getUrl: ({url}) => {
		const urlParts = url.split('/s/')[1].split('/').filter(i => i)
		const [story, chapter] = [...urlParts, '1'].slice(0, 2)
		return `/ffnet/${story}/${chapter}`
	},

	getRequestUrl: ({story, chapter}) => true,
	get: url => {
		return 'WIP'
	}
}
