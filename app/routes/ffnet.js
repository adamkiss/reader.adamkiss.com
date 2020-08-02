import { loadView } from '../utils'

export default async function ffnet({ store, params }) {
	store.app.dispatch('startLoading')

	await loadView({func: 'ffnet', params, store})
}
