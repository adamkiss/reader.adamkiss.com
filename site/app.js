import barba from '@barba/core';
import {requestInterval, clearRequestInterval} from '@essentials/request-interval'
import {requestTimeout, clearRequestTimeout} from '@essentials/request-timeout'
import {on} from 'delegated-events'

// fancy speed
barba.init()
barba.hooks.before(() => loader(true))
barba.hooks.after(() => {
	loader(false)
	window.scrollTo(0,0)
})

// fancy loader
const $loader = document.querySelector('#loader')
export function loader(start = true) {
	const emoji = ['😎','📕','👓','🥳','🕶','📚','✨']
	let position = 0

	if (start) {
		window.loader = clearRequestTimeout(requestTimeout(() => {
			window.loader = clearRequestInterval(requestInterval(() => {
				$loader.querySelector('.emoji').textContent = emoji[(position < emoji.length - 1) ? position++ : (position = 0)]
			}, 250))
			$loader.classList.remove('opacity-0')
		}))
	} else {
		if (typeof window.loader === 'function') window.loader()
		$loader.classList.add('opacity-0')
	}
}

// fancy shortcuts
on('click', '#scroll-to-top', _ => window.scroll({
	top: 0,
	left: 0,
	behavior: 'smooth'
}))
on('click', '.js-scroll-to-toc', _ => window.scroll({
	top: document.querySelector('#toc').offsetTop - 40,
	left: 0,
	behavior: 'smooth'
}))

// fancy welcome checks
 const isValid = url => {
	try {
		return ['http:', 'https:'].includes((new URL(url)).protocol)
	} catch (err) {	return false }
}
const $submit = document.querySelector('#welcome-submit')
on('keyup', '#welcome-url', event => {
	$submit.disabled = !isValid(event.target.value)
})
on('submit', '#welcome-form', event => {
	event.preventDefault()
	barba.go(`/${document.querySelector('#welcome-url').value}`)
})
