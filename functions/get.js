const providers = ['default', 'ffnet', 'ao3', 'hpffa'].map(p => require(`../lib/provider-${p}`))

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

		const url = providers[req.provider].getRequestUrl(req.url)
		const parsed = await providers[req.provider].get(url)
		return {
			statusCode: 200,
			body: 'ya!'
		}
	} catch (err) {
		console.error(err)

		return {
			statusCode: 500,
			body: err.message || err
		}
	}
}
