import { showOrFail } from '../utils'

export default async function hpffa({ router, store, params }) {
	store.app.dispatch('startLoading')

	await showOrFail({
		store,
		args: { provider: 'hpffa', story: params.story, chapter: params.chapter }
	})
}
