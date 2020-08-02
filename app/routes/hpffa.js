import { loadView } from '../utils'

export default async function hpffa({ store, params }) {
	store.app.dispatch('startLoading')

	await loadView({func: 'hpffa', params, store})
}
