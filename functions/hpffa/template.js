const html = require('../shared/fake-lit-html')
const { hr, prev_chapter_next, toc, scrollToTop, reader } = require('../shared/components')

module.exports = d => html`

<header class='px-8 py-4 sm:py-6 md:py-8 lg:py-12 text-center'>
	<h1 class='tracking-wider font-headline text-3xl leading-tight'>${d.title}</h1>
	<p class='italic'>by ${d.author}</p>

	<div class="flex justify-center items-center text-lg pt-2 sm:pt-4 lg:pt-8">
		<a class='underline' href="/">←</a>
		<span class='px-4 text-sm'>◆</span>
		<a target='_blank' class='underline' href="${d.url}">Original</a>
	</div>
</header>
${d.oneshot ? hr() : prev_chapter_next(d.currentChapter, d.chapters, d.prev, d.next)}

${reader(d.content, d.headline)}

${!d.oneshot ? prev_chapter_next(d.currentChapter, d.chapters, d.prev, d.next) + toc(d.chapters) : ''}

${scrollToTop()}`
