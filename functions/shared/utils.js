module.exports.getRequest = (event, requiredKey) => {
	let req

	console.log(event)

	if ('reader' in event.queryStringParameters) {
		req = {...event.queryStringParameters}
	} else {
		if (event.httpMethod !== 'POST') {
			return () => ({ statusCode: 405, body: 'Method Not Allowed', headers: { Allow: 'Get' } })
		}

		req = JSON.parse(event.body)
	}

	if (!requiredKey in req) {
		return () => ({statusCode: 400, body: 'Story # is missing'})
	}

	return req
}
