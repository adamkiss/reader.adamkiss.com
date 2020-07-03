const isUrlValid = require('~/lib/is-valid-url')

export default function ({params, redirect}) {
	if (!isUrlValid(params.pathMatch)) {
		redirect(400, '/')
	}
}
