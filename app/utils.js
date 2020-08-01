export const $ = (query) => document.querySelector(query)
export const $$ = (query) => document.querySelectorAll(query)

export function app(html) {
	if (html) {	$('#app').innerHTML = html }
	return $('#app')
}

export const isValid = url => {
	try {
		return ['http:', 'https:'].includes((new URL(url)).protocol)
	} catch (err) {
		return false
	}
}

import ky from "ky";
import error from "../site/error.html"
export const showOrFail = async ({store, args}) => {
	try {
		const result = await ky.post('/.netlify/functions/get', {json: args}).json();
		console.log(result)
		app(result.html)
		store.app.dispatch('setTitle', result.title)
	} catch (err) {
		app(error)
		$('#error-status').innerHTML = err.response.status
		$('#error-message').innerHTML = err.response.statusText
		store.app.dispatch('setTitle', `Reader: Error ${err.response.status}`)
	}
}

