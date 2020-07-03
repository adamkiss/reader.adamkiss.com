/**
 * Archiveofourown.org
 * test: https://archiveofourown.org/works/24903724/chapters/60262057
 */
const axios = require('axios')
const cheerio = require('cheerio')

module.exports = {
	match: ({url}) => url.includes('archiveofourown.org/works/'),
	getUrl: ({url}) => {
		const urlParts = url.split('/works/')[1].split('/chapters/').filter(i => i)
		const [story, chapter] = [...urlParts, false]
		return chapter ? `/ao3/${story}/${chapter}` : `/ao3/${story}`
	},

	getRequestUrl: ({story, chapter = false}) => chapter
		? `https://archiveofourown.org/works/${story}/chapters/${chapter}/?view_adult=true`
		: `https://archiveofourown.org/works/${story}/?view_adult=true`,
	get: async url => {
		const page = await axios.get(url)
		const $ = await cheerio.load(page.data)

		console.log(page)

		const data = {
			url,
			title: $('h2.title').text(),
			author: $('a[rel=author]').text(),
			content: $('#chapters .userstuff').html(),
			download: `https://archiveofourown.org${$('a[href*=".epub"]').attr('href')}`,
			oneshot: true
		}

		const $chapterSelectEl = $('#chapter_index select')
		if ($chapterSelectEl.length === 0) {
			return data
		}

		data.oneshot = false
		const chapters = []

		$chapterSelectEl.first().children().each((i, $el) => {
			chapters.push({
				name: $el.children[0].data,
				index: i + 1,
				id: $el.attribs.value,
				current: 'selected' in $el.attribs
			})
		})
		data.chapters = chapters
		data.currentChapter = chapters.filter(ch => ch.current)[0]

		return data
	}
}
