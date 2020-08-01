import { showOrFail } from '../utils'

export default async function ao3({ router, store, params }) {
	store.app.dispatch('startLoading')

	if ('chapter' in params) {
		await showOrFail({
			store,
			args: { provider: 'ao3', story: params.story, chapter: params.chapter }
		})
	} else {
		await showOrFail({
			store,
			args: { provider: 'ao3', story: params.story }
		})
	}
}
