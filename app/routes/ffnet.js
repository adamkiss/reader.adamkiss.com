import { showOrFail } from '../utils'

export default async function ffnet({ router, store, params }) {
	store.app.dispatch('startLoading')

	await showOrFail({
		store,
		args: { provider: 'ffnet', story: params.story, chapter: params.chapter }
	})
}
