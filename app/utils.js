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

