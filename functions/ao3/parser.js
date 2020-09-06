const got = require('got')
const cheerio = require('cheerio')
const load = async url => {
	console.info(`→ ${url}`)

	return await cheerio.load(
		(await got(url)).body
	)
}

module.exports = async ({ story, chapter = null }) => {
	const url = chapter
		? `https://archiveofourown.org/works/${story}/chapters/${chapter}/?view_adult=true`
		: `https://archiveofourown.org/works/${story}/?view_adult=true`
	const $ = await load(url)

	const data = {
		url,
		download: `https://archiveofourown.org${$('a[href*=".epub"]').attr('href')}`,
		story: story,
		chapter: chapter || false,
		title: $('h2.title').text(),
		author: $('a[rel=author]').text(),
		content: chapter === null
			? $('[role="article"] .userstuff').html()
			: $('.userstuff[role="article"]').html(),
		oneshot: true,
		prev: false,
		next: false
	}

	const $chapterSelectEl = $('#chapter_index select')
	if ($chapterSelectEl.length === 0) {
		return data
	}

	data.oneshot = false
	const chapters = []

	$chapterSelectEl.first().children().each((i, $el) => {
		const ch = {
			name: $el.children[0].data,
			index: i + 1,
			id: $el.attribs.value,
			current: 'selected' in $el.attribs
		}
		chapters.push({ ...ch, link: `/ao3/${data.story}/${ch.id}` })
	})

	data.chapters = chapters
	data.currentChapter = chapters.filter(ch => ch.current)[0]
	data.headline = data.currentChapter.name

	if (data.currentChapter.index > 1) {
		data.prev = `/ao3/${data.story}/${chapters[data.currentChapter.index - 2].id}`
	}
	if (data.currentChapter.index < data.chapters.length) {
		data.next = `/ao3/${data.story}/${chapters[data.currentChapter.index].id}`
	}

	return data
}
