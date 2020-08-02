/* fakes lit-html tag so I can use VSCode html`` syntax highlighting */
module.exports = (strings, ...expressions) => {
	return strings.reduce((arr, str) => [...arr, str, expressions.shift()], []).join('')
}
