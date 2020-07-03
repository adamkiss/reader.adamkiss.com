/**
 * hpfanficarchive.com
 */
const axios = require('axios')
const cheerio = require('cheerio')

 module.exports = {
	match: ({url}) => url.includes('hpfanficarchive.com/stories/viewstory.php'),
	getUrl: ({url}) => {
		const sid = RegExp(/sid=(\d+)/).exec(url)
		const chapter = RegExp(/chapter=(\d+)/).exec(url)

		if (!sid) return '/'
		return `/hpffa/${sid[1]}/${chapter && chapter[1] || 1}`
	},

	 getRequestUrl: ({story, chapter = 1}) => `https://hpffa.adamkiss.com/?story=${story}&chapter=${chapter}`,
	get: async url => {
		const page = await axios.get(url, {
			headers: {
				'User-Agent': 'Reader 0.3.1/Mozilla compatible'
			},
			withCredentials: true
		})
		const $ = await cheerio.load(page.data)

		const data = {
			url,
			title: $('#pagetitle a').eq(0).text(),
			author: $('#pagetitle a').eq(1).text(),
			content: $('#story > span').html(),
			oneshot: true
		}

		const $chapterSelectEl = $('select[name=chapter]')
		if ($chapterSelectEl.length === 0) {
			return data
		}

		data.oneshot = false
		const chapters = []

		$chapterSelectEl.first().children().each((i, $el) => {
			chapters.push({
				name: $el.children[0].data,
				index: $el.attribs.value,
				current: 'selected' in $el.attribs
			})
		})
		data.chapters = chapters
		data.currentChapter = chapters.filter(ch => ch.current)[0]

		return data
	}
}
