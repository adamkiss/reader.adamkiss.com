const nunjucks = require('nunjucks')
const got = require('got')
const cheerio = require('cheerio')
nunjucks.configure(`${__dirname}/templates`, { noCache: true })

const loadAndLog = async url => {
	console.info(`→ ${url}`)
	return await cheerio.load((await got(url)).body)
}

exports.handler = async event => {
	try {
		const req = JSON.parse(event.body)
		// bounce errors
		if (event.httpMethod !== 'POST') {
			return { statusCode: 405, body: 'Method Not Allowed', headers: { Allow: 'Get' } }
		}
		if (!'story' in req) {
			return { statusCode: 400, body: 'Story # is missing' }
		}

		const url = 'chapter' in req
			? `https://archiveofourown.org/works/${req.story}/chapters/${req.chapter}/?view_adult=true`
			: `https://archiveofourown.org/works/${req.story}/?view_adult=true`
		const $ = await loadAndLog(url)
		const data = {
			url,
			download: `https://archiveofourown.org${$('a[href*=".epub"]').attr('href')}`,
			story: req.story,
			chapter: parseInt(req.chapter, 10) || false,
			title: $('h2.title').text(),
			author: $('a[rel=author]').text(),
			content: $('#chapters .userstuff').html(),
			oneshot: true,
			prev: false,
			next: false
		}

		const $chapterSelectEl = $('#chapter_index select')
		if (data.chapter !== false && $chapterSelectEl.length !== 0) {
			data.oneshot = false
			const chapters = []

			$chapterSelectEl.first().children().each((i, $el) => {
				const ch = {
					name: $el.children[0].data,
					index: i + 1,
					id: $el.attribs.value,
					current: 'selected' in $el.attribs
				}
				chapters.push({...ch, link: `/ao3/${data.story}/${ch.id}`})
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
		}


		const rendered = nunjucks.render(`ffnet.njk`, data)
		return {
			statusCode: 200,
			body: JSON.stringify({
				title: data.title + (data.oneshot ? '' : `, ${data.currentChapter.name}`),
				html: rendered
			})
		}


	} catch (err) {
		console.error(err)
		return { statusCode: 500, body: err.message || err }
	}
}
