import {createStoreon} from 'storeon'
import html from '../../site/welcome.html'
import {$app, $, isValid} from '../utils'
import {on} from 'delegated-events'

export default function welcome ({router, store}) {
	store.welcome = createStoreon([store => {
		store.on('@init', () => ({url: ''}))
		store.on('set', ({url}, setTo) => ({url: setTo}))
	}])
	on('keyup', '#welcome-url', event => store.welcome.dispatch('set', event.target.value))
	store.welcome.on('@changed', state => {
		const $submit = $('#welcome-submit')

		if (isValid(state.url) && $submit.disabled) {
			$submit.disabled = false;
		} else if (!isValid(state.url) && !$submit.disabled) {
			$submit.disabled = true;
		}
	})
	on('submit', '#welcome-form', e => {
		e.preventDefault()
		router.route(`/${store.welcome.get().url}`)
	})

	$app(html)
	store.app.dispatch('setTitle', 'Welcome to Reader')
	store.app.dispatch('stopLoading')
}
