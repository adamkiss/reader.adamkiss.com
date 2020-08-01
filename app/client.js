/**
 * imports
 */
import { createStoreon } from 'storeon'
import Navaid from 'navaid'
import {on} from 'delegated-events'

import {$, loader} from './utils'

/**
 * store
 */
const store = {
	app: createStoreon([store => {
		store.on('@init', () => ({
			icon: '🕶',
			title: 'Reader',
			loading: true,
			loaderCentered: true
		}))
		store.on('setIconDark', ({icon}, setToDark) => ({
			icon: setToDark ? '👓' : '🕶'
		}))
		store.on('setTitle', ({title}, newTitle) => ({title: newTitle}))
		store.on('startLoading', ({ loading }) => ({ loading: true }))
		store.on('stopLoading', ({loading}) => ({loading: false}))
		store.on('@changed', state => {
			$('title').innerText = `${state.icon} ${state.title}`
			$('#app').classList.toggle('blurry-fuck', state.loading)
			$('#loader').classList.toggle('opacity-0', !state.loading)
		})
	}])
}

/**
 * router
 */
const router = new Navaid();
const routes = {
	'/': async () => await import('./routes/welcome.js'),

	'/ffnet/:story/:chapter': async () => await import('./routes/ffnet.js'),
	'/hpffa/:story/:chapter': async () => await import('./routes/hpffa.js'),
	'/ao3/:story': async () => await import('./routes/ao3.js'),
	'/ao3/:story/:chapter': async () => await import('./routes/ao3.js'),

	'/ffnet/:story': async() => ({default: ({params}) => router.route(`/ffnet/${params.story}/1`)}),
	'/hpffa/:story': async() => ({default: ({params}) => router.route(`/hpffa/${params.story}/1`)}),

	'/*': async () => await import('./routes/default.js'),
}
for (const [route, loadView] of Object.entries(routes)) {
	router.on(route, async params => {
		const view = (await loadView()).default
		view({router, store, params})
	})
}
router.listen()

/**
 * app level listeners
 */
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
prefersDark.addListener(({matches}) => {
	store.app.dispatch('setIcon', matches)
})
on('click', '#scroll-to-top', _ => window.scroll({
	top: 0,
	left: 0,
	behavior: 'smooth'
}))
on('click', '.js-scroll-to-toc', _ => window.scroll({
	top: $('#toc').offsetTop - 40,
	left: 0,
	behavior: 'smooth'
}))
loader($('#loader .relative'))
