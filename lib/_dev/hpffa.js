const hpffa = require('../provider-hpffa')
// const story = '24903724'
// const chapter = '60262057'

// https://hpfanficarchive.com/stories/viewstory.php?sid=435&textsize=0&chapter=2
const story = '435'
const chapter = '1'

; (async () => {
	const result = await hpffa.get(hpffa.getRequestUrl({story, chapter}))
	console.log(result)
})()
