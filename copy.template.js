const {readFileSync, writeFileSync} = require('fs')

const template = [
	`
	const {html} = require("fake-lit")

	module.exports = (title, content) => html\``,
	readFileSync('./dist/index.html')
		.toString()
		.replace(/<title.*?\/title>/g, '<title>${title}</title>')
		.replace(/(namespace="content">)[\s\S]*(<\/div>)[\s\S]*?<div data-content-end=""><\/div>/g, '$1$${content}$2'),
		// .replace(/<div data-from[\s\S]*?data-to=""><\/div>/igm, '${content}'),
	'`'
].join('')

writeFileSync('./functions/shared/layout.js', template)
