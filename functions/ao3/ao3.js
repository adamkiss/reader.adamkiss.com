const parse = require('./parser')
const template = require('./template')

exports.handler = async event => {
	try {
		const req = JSON.parse(event.body)
		// bounce errors
		if (event.httpMethod !== 'POST') {
			return { statusCode: 405, body: 'Method Not Allowed', headers: { Allow: 'Get' } }
		}
		if (!'story' in req) {
			return { statusCode: 400, body: 'Story # is missing' }
		}

		const parsed = await parse(req)
		const rendered = template(parsed)
		return {
			statusCode: 200,
			body: JSON.stringify({
				title: parsed.title + (parsed.oneshot ? '' : `, ${parsed.currentChapter.name}`),
				html: rendered
			})
		}


	} catch (err) {
		console.error(err)
		return { statusCode: 500, body: err.message || err }
	}
}
