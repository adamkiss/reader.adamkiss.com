const nunjucks = require('nunjucks')
const providers = {
	default: require('../parsers/default.js'),
	// ffnet: require('../lib/provider-ffnet'),
	// ao3: require('../lib/provider-ao3'),
	// hpffa: require('../lib/provider-hpffa')
}

exports.handler = async (event, context) => {
	try {
		const req = JSON.parse(event.body)

		// Only allow POST
		if (event.httpMethod !== 'POST') {
			return {
				statusCode: 405,
				body: 'Method Not Allowed',
				headers: {Allow: 'Get'}
			}
		}

		if (!'provider' in req || !'url' in req) {
			return {
				statusCode: 400,
				body: 'Provider or URL is missing'
			}
		}

		const url = providers[req.provider].getRequestUrl(req)
		const parsed = await providers[req.provider].get(url)

		nunjucks.configure({noCache: true})
		const rendered = nunjucks.render(`./functions-templates/${req.provider}.njk`, parsed)

		return {
			statusCode: 200,
			body: JSON.stringify({title: parsed.title, html: rendered})
		}
	} catch (err) {
		console.error(err)

		return {
			statusCode: 500,
			body: err.message || err
		}
	}
}
