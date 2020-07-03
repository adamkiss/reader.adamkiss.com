module.exports = url => {
	try {
		const parsed = new URL(url)
		return ['http:', 'https:'].includes(parsed.protocol)
	} catch (err) {
		return false
	}
	return false
}
