import ky from 'ky'
import { showOrFail } from '../utils'

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
			const sid = RegExp(/sid=(\d+)/).exec(url)
			const chapter = RegExp(/chapter=(\d+)/).exec(url)
			if (!sid) return '/'
			return `/hpffa/${sid[1]}/${chapter && chapter[1] || 1}`
		},
	}
]

export default async function fallback({router, store, params}) {
	const url = params.wild
	providers.forEach(provider => {
		if (provider.match(url)) {
			const newUrl = provider.getUrl(url)
			store.app.dispatch('setTitle', `Redirecting to ${newUrl}…`)
			router.route(newUrl)
		}
	})

	await showOrFail({
		store,
		args: { provider: 'default', url: url}
	})
}
