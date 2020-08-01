/*
	SELECTORS
*/
export const $ = (query) => document.querySelector(query)
export const $$ = (query) => document.querySelectorAll(query)
export function $app(html) {
	if (html) {	$('#app').innerHTML = html }
	return $('#app')
}

/*
	is url valid (basic) check
*/
export const isValid = url => {
	try {
		return ['http:', 'https:'].includes((new URL(url)).protocol)
	} catch (err) {
		return false
	}
}

/*
	main view or error function
*/
import ky from "ky";
import error from "../site/error.html"
export const showOrFail = async ({store, args}) => {
	let newTitle
	try {
		const result = await ky.post(`/.netlify/functions/${args.provider}`, {json: args}).json();
		$app(result.html)
		newTitle = result.title
	} catch (err) {
		$app(error)
		$('#error-status').innerHTML = err.response.status
		$('#error-message').innerHTML = err.response.statusText
		newTitle = `Reader: Error ${err.response.status}`
	}
	store.app.dispatch('setTitle',newTitle)
	store.app.dispatch('stopLoading')
}

/*
	loader
*/
import {requestInterval} from '@essentials/request-interval'
export function loader($el) {
	const emoji = ['😎','📕','👓','🥳','🕶','📚','✨']
	let position = 0

	const anim = requestInterval(() => {
		$el.textContent = emoji[(position < emoji.length-1) ? position++ : (position = 0)]
	}, 250)
}
