const {getRequest} = require('../shared/utils')
const parse = require('./parser')
const template = require('./template')
const layout = require('../shared/layout')

exports.handler = async event => {
	try {
		// bounce errors
		if (typeof (req = getRequest(event, 'story')) === 'function') {
			return req()
		}

		const parsed = await parse(req)
		const title = parsed.title + (parsed.oneshot ? '' : `, ${parsed.currentChapter.name}`)
		return { statusCode: 200, body: layout(title, template(parsed))}
	} catch (err) {
		console.error(err)
		return {statusCode: 500, body: err.message || err}
	}
}
