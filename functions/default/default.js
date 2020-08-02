const template = require('./template.js')
const parse = require('./parser.js')

exports.handler = async (event, context) => {
	try {
		// bounce errors
		if (typeof (req = getRequest(event, 'story')) === 'function') {
			return req()
		}

		const parsed = await parse(req)
		const rendered = template(parsed)
		const {title} = parsed
		const body = ('reader' in req)
			? sharedTemplate(title, rendered)
			: JSON.stringify({title, html: rendered })
		return { statusCode: 200, body }
	} catch (err) {
		console.error(err)
		return { statusCode: 500, body: err.message || err }
	}
}
