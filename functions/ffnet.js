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
			return { statusCode: 405, body: 'Method Not Allowed', headers: { Allow: 'Get' }}
		}
		if (!'story' in req) {
			return { statusCode: 400, body: 'Story # is missing' }
		}

		const url = `https://www.fanfiction.net/s/${req.story}/${req.chapter || 1}/`
		const $ = await loadAndLog(url)
		const data = {
			url,
			ficsave: `http://ficsave.xyz/?url=${encodeURIComponent(url)}&format=epub&download=yes`,
			story: req.story,
			chapter: parseInt(req.chapter, 10) || 1,
			title: $('#profile_top > b').text(),
			author: $('a[href^="/u/"]').text(),
			content: $('#storytext').html(),
			oneshot: true,
			prev: false,
			next: false
		}
		const $chapterSelectEl = $('#chap_select')
		if ($chapterSelectEl.length !== 0) {
			data.oneshot = false
			const chapters = []

			$chapterSelectEl.first().children().each((i, $el) => {
				const ch = {
					name: $el.children[0].data,
					index: parseInt($el.attribs.value, 10),
					current: 'selected' in $el.attribs
				}
				chapters.push({...ch, link: `/ffnet/${req.story}/${ch.index}`})
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
		return {statusCode: 500, body: err.message || err}
	}
}
