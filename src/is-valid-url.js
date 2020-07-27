export default url => {
	try {
		return ['http:', 'https:'].includes((new URL(url)).protocol)
	} catch (err) { return false }
}
