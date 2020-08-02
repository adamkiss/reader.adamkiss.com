const {getRequest} = require('../shared/utils')
const parse = require('./parser')
const template = require('./template')
const sharedTemplate = require('../shared/template')

exports.handler = async event => {
	try {
		// bounce errors
		if (typeof (req = getRequest(event, 'story')) === 'function') {
			return req()
		}

		const parsed = await parse(req)
		const rendered = template(parsed)
		const title = parsed.title + (parsed.oneshot ? '' : `, ${parsed.currentChapter.name}`)
		const body = ('reader' in req)
			? sharedTemplate(title, rendered)
			: JSON.stringify({title, html: rendered})
		return { statusCode: 200, body }
	} catch (err) {
		console.error(err)
		return {statusCode: 500, body: err.message || err}
	}
}
