const got = require('got')
const cheerio = require('cheerio')
const load = async url => {
	console.info(`→ ${url}`)

	return await cheerio.load(
		(await got(url, {
			headers: {
				'User-Agent': 'Reader 0.3.1/Mozilla compatible'
			},
			withCredentials: true
		})).body
	)
}

module.exports = async ({story, chapter = 1}) => {
	const url = `https://hpffa.adamkiss.com/?story=${story}&chapter=${chapter}`
	const $ = await load(url)

	const data = {
		url,
		story: story,
		chapter: parseInt(chapter, 10) || 1,
		title: $('#pagetitle a').eq(0).text(),
		author: $('#pagetitle a').eq(1).text(),
		content: $('#story > span').html(),
		oneshot: true,
		prev: false,
		next: false
	}

	const $chapterSelectEl = $('select[name=chapter]')
	if ($chapterSelectEl.length === 0) {
		return data
	}

	data.oneshot = false
	const chapters = []
	$chapterSelectEl.first().children().each((i, $el) => {
		const ch = {
			name: $el.children[0].data,
			index: $el.attribs.value,
			current: 'selected' in $el.attribs
		}
		chapters.push({ ...ch, link: `/hpffa/${story}/${ch.index}` })
	})
	data.chapters = chapters
	data.currentChapter = chapters.filter(ch => ch.current)[0]
	data.headline = data.currentChapter.name

	if (data.chapter > 1) {
		data.prev = `/hpffa/${data.story}/${data.chapter - 1}`
	}
	if (data.chapter < data.chapters.length) {
		data.next = `/hpffa/${data.story}/${data.chapter + 1}`
	}

	return data
}
