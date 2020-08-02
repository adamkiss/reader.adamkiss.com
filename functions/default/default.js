const template = require('./template.js')
const parse = require('./parser.js')

exports.handler = async (event, context) => {
	try {
		const req = JSON.parse(event.body)
		// bounce errors
		if (event.httpMethod !== 'POST') {
			return { statusCode: 405, body: 'Method Not Allowed', headers: { Allow: 'Get' } }
		}
		if (!'url' in req) {
			return { statusCode: 400, body: 'URL is missing' }
		}


		const parsed = await parse(req.url)
		const rendered = template(parsed)
		return {
			statusCode: 200,
			body: JSON.stringify({ title: parsed.title, html: rendered })
		}


	} catch (err) {
		console.error(err)
		return { statusCode: 500, body: err.message || err }
	}
}
