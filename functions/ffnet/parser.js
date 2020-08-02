const got = require('got')
const cheerio = require('cheerio')
const load = async url => {
	console.info(`→ ${url}`)

	return await cheerio.load(
		(await got(url)).body
	)
}

module.exports = async ({story, chapter = 1}) => {
	const url = `https://www.fanfiction.net/s/${story}/${chapter || 1}/`
	const $ = await load(url)

	const data = {
		url,
		ficsave: `http://ficsave.xyz/?url=${encodeURIComponent(url)}&format=epub&download=yes`,
		story: story,
		chapter: parseInt(chapter, 10) || 1,
		title: $('#profile_top > b').text(),
		author: $('a[href^="/u/"]').text(),
		content: $('#storytext').html(),
		oneshot: true,
		prev: false,
		next: false
	}

	const $chapterSelectEl = $('#chap_select')
	if ($chapterSelectEl.length === 0) {
		return data
	}

	data.oneshot = false
	const chapters = []
	$chapterSelectEl.first().children().each((i, $el) => {
		const ch = {
			name: $el.children[0].data,
			index: parseInt($el.attribs.value, 10),
			current: 'selected' in $el.attribs
		}
		chapters.push({ ...ch, link: `/ffnet/${story}/${ch.index}` })
	})
	data.chapters = chapters
	data.currentChapter = chapters.filter(ch => ch.current)[0]
	data.headline = data.currentChapter.name

	if (data.chapter > 1) {
		data.prev = `/ffnet/${data.story}/${data.chapter - 1}`
	}
	if (data.chapter < data.chapters.length) {
		data.next = `/ffnet/${data.story}/${data.chapter + 1}`
	}

	return data
}
