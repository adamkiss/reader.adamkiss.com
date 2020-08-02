import { loadView } from '../utils'


export default async function defaultRoute({router, store, params}) {
	store.app.dispatch('startLoading')
	let redirect

	const url = document.location.search ? params.wild + document.location.search : params.wild

	await loadView({func: 'default', params: {url}, store})
}
