/**
 * Archiveofourown.org
 */
module.exports = {
	match: ({url}) => url.includes('archiveofourown.org/works/'),
	getUrl: ({url}) => {
		const urlParts = url.split('/works/')[1].split('/chapters/').filter(i => i)
		const [story, chapter] = [...urlParts, false]
		return chapter ? `/ao3/${story}/${chapter}` : `/ao3/${story}`
	}
}
