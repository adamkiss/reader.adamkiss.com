/**
 * Fanfiction.net
 */
const axios = require('axios')
const cheerio = require('cheerio')
module.exports = {
	match: ({url}) => url.includes('fanfiction.net/s/'),
	getUrl: ({url}) => {
		const urlParts = url.split('/s/')[1].split('/').filter(i => i)
		const [story, chapter] = [...urlParts, '1'].slice(0, 2)
		return `/ffnet/${story}/${chapter}`
	},

	getRequestUrl: ({story, chapter = 1}) => `https://www.fanfiction.net/s/${story}/${chapter}/`,
	get: async url => {
		const page = await axios.get(url)
		const $ = await cheerio.load(page.data)

		const data = {
			url,
			title: $('#profile_top > b').text(),
			author: $('a[href^="/u/"]').text(),
			content: $('#storytext').html(),
			oneshot: true
		}

		const $chapterSelectEl = $('#chap_select')
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
