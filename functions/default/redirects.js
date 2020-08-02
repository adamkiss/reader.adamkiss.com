module.exports = {
	list: [
		{ // Fanfiction.net
			match: url => url.includes('fanfiction.net/s/'),
			get: url => {
				const urlParts = url.split('/s/')[1].split('/').filter(i => i)
				const [story, chapter] = [...urlParts, '1'].slice(0, 2)
				return `/ffnet/${story}/${chapter}`
			}
		}, { // AO3
			match: url => url.includes('archiveofourown.org/works/'),
			get: url => {
				const urlParts = url.split('/works/')[1].split('/chapters/').filter(i => i)
				const [story, chapter] = [...urlParts, false]
				return chapter ? `/ao3/${story}/${chapter}` : `/ao3/${story}`
			},
		}, { // HPFFA
			match: url => url.includes('hpfanficarchive.com/stories/viewstory.php'),
			get: url => {
				/* holy fuck balls */
				const q = (new URL(document.location)).searchParams
				const sid = q.get('sid')
				const chapter = q.get('chapter')

				if (!sid) return '/'
				return `/hpffa/${sid}/${chapter || 1}`
			},
		}
	],
	find(url) {
		return this.list.reduce(
			(result, redirect) => result || redirect.match(url) && redirect.get(url)
		, false)
	}
}
