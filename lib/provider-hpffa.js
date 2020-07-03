/**
 * hpfanficarchive.com
 */
module.exports = {
	match: ({url}) => url.includes('hpfanficarchive.com/stories/viewstory.php'),
	getUrl: ({query}) => {
		if (!'sid' in query) return '/'
		return `/hpffa/${query.sid}/${query.chapter || 1}`
	}
}
