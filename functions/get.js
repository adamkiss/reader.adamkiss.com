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

		const provider = require(`../lib/provider-${req.provider}`)
		const url = provider.getRequestUrl(req)
		const parsed = await provider.get(url)
		return {
			statusCode: 200,
			body: JSON.stringify(parsed)
		}
	} catch (err) {
		console.error(err)

		return {
			statusCode: 500,
			body: err.message || err
		}
	}
}
