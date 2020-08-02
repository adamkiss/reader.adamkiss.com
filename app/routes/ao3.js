import { loadView } from '../utils'

export default async function ao3({ store, params }) {
	store.app.dispatch('startLoading')

	await loadView({func: 'ao3', params, store})
}
