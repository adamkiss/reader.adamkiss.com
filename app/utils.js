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
	View stuff
*/
import ky from "ky";
import error from "../site/error.html"

export const setView = ({html, title, store}) => {
	$app(html)
	store.app.dispatch('setTitle', title)
}
export const errorView = ({err, store}) => {
	setView({html: error, title: `Reader: Error ${err.response.status}`, store})
	$('#error-status').innerHTML = err.response.status
	$('#error-message').innerHTML = err.response.statusText
}
export const loadView = async ({func, params, store}) => {
	try {
		const result = await ky.post(`/.netlify/functions/${func}/${func}`, { json: params }).json();
		setView({...result, store})
	} catch (err) {
		errorView({err, store})
	}
	store.app.dispatch('stopLoading')

	// @todo: I need to force scroll reset. why? (nanoid?)
	window.scroll({left: 0, top: 0})
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
