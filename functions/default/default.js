const template = require('./template.js')
const parse = require('./parser.js')
const layout = require('../shared/layout')
const redirects = require('./redirects')

exports.handler = async (event, context) => {
	try {
		const url = event.path.slice(1)

		if (Location = redirects.find(url)) {
			return {statusCode: 301, headers: {Location}}
		}

		const parsed = await parse({url})
		const {title} = parsed
		return { statusCode: 200, body: layout(title, template(parsed)) }
	} catch (err) {
		console.error(err)
		return { statusCode: 500, body: err.message || err }
	}
}
