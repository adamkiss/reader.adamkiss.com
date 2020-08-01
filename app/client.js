import { createStoreon } from 'storeon'
import Navaid from 'navaid'
import {on} from 'delegated-events'

import {$} from './utils'

const store = {
	app: createStoreon([store => {
		store.on('@init', () => ({
			icon: '🕶',
			title: 'Reader'
		}))
		store.on('setIconDark', ({icon}, setToDark) => ({
			icon: setToDark ? '👓' : '🕶'
		}))
		store.on('setTitle', ({title}, newTitle) => ({title: newTitle}))
		store.on('@changed', state => {
			$('title').innerText = `${state.icon} ${state.title}`
		})
	}])
}

const routes = {
	'/': async () => await import('./routes/welcome.js'),
	'/*': async () => await import('./routes/fallback.js'),
}
const router = new Navaid();
for (const [route, loadView] of Object.entries(routes)) {
	router.on(route, async params => {
		const view = (await loadView()).default
		view({router, store, params})
	})
}
router.listen()

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
prefersDark.addListener(({matches}) => {
	store.app.dispatch('setIcon', matches)
})
on('click', '#scroll-to-top', _ => window.scroll({
	top: 0,
	left: 0,
	behavior: 'smooth'
}))
