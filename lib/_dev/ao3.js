const ao3 = require('../provider-ao3')
// const story = '24903724'
// const chapter = '60262057'

// https://archiveofourown.org/works/23591542/chapters/56606290
const story = '23591542'
const chapter = '56813284'

; (async () => {
	const result = await ao3.get(ao3.getRequestUrl({story, chapter}))
	console.log(result)
})()
