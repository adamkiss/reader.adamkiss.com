import { loadView } from '../utils'

const providers = [
	{ // Fanfiction.net
		match: url => url.includes('fanfiction.net/s/'),
		getUrl: url => {
			const urlParts = url.split('/s/')[1].split('/').filter(i => i)
			const [story, chapter] = [...urlParts, '1'].slice(0, 2)
			return `/ffnet/${story}/${chapter}`
		}
	}, { // AO3
		match: url => url.includes('archiveofourown.org/works/'),
		getUrl: url => {
			const urlParts = url.split('/works/')[1].split('/chapters/').filter(i => i)
			const [story, chapter] = [...urlParts, false]
			return chapter ? `/ao3/${story}/${chapter}` : `/ao3/${story}`
		},
	}, { // HPFFA
		match: url => url.includes('hpfanficarchive.com/stories/viewstory.php'),
		getUrl: url => {
			/* holy fuck balls */
			const q = (new URL(document.location)).searchParams
			const sid = q.get('sid')
			const chapter = q.get('chapter')

			if (!sid) return '/'
			return `/hpffa/${sid}/${chapter || 1}`
		},
	}
]

export default async function defaultRoute({router, store, params}) {
	store.app.dispatch('startLoading')
	let redirect

	const url = document.location.search ? params.wild + document.location.search : params.wild
	providers.forEach(provider => {
		if (provider.match(url)) {
			redirect = provider.getUrl(url)
			store.app.dispatch('setTitle', `Redirecting to ${redirect}…`)
			router.route(redirect)
		}
	})

	await loadView({func: 'default', params: {url}, store})
}
