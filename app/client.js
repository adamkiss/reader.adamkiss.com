import ky from 'ky'
import Navaid from 'navaid'

const store = {}

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
