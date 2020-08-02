const html = require('./fake-lit-html')
module.exports = {}



const reader = (content, headline) => html`
<article class="container py-16">
	${headline ? html`<h2 class="pb-4 text-center font-headline">${headline}</h2>` : ''}
	<div class="styled-html ">${content}</div>
</article>
`
module.exports.reader = reader



const scrollToTop = () => html`
<div
	class="fixed w-12 h-12 md:w-20 md:h-20 flex justify-center items-center rounded-full bg-white dark:bg-black dark:bg-opacity-50 cursor-pointer"
	style="right: 2rem; bottom: 2rem;" id='scroll-to-top'
><span>⤒</span></div>`
module.exports.scrollToTop = scrollToTop



const hr = () => html`
<hr class='border-sepia-200 dark:border-gray-700' />`
module.exports.hr = hr



const button_or_span = (text, href = null) => href
	? html`<a href='${href}' class="rounded py-2 px-6 md:px-8 bg-white dark:bg-black dark:bg-opacity-50">${text}</a>`
	: html`<span class="rounded py-2 px-6 md:px-8 dark:bg-black dark:bg-opacity-25 text-sepia-500 dark:text-gray-500" >${text}</span>`
module.exports.button_or_span = button_or_span



const prev_chapter_next = (currentChapter, chapters, prev = null, next = null) => html`
${hr()}
<div class="py-2 sm:py-4 md:py-8 flex justify-center items-center">
	${button_or_span('←', prev)}
	<span class="rounded px-8 text-sepia-700 dark:text-gray-300 cursor-pointer js-scroll-to-toc">
		<span class='font-bold text-sepia-800 dark:text-white'>${currentChapter.index}</span>/${chapters.length}<span> ▾</span>
	</span>
	${button_or_span('→', next)}
</div>
${hr()}`
module.exports.prev_chapter_next = prev_chapter_next




const toc = chapters => html`
<div class="container pt-8 pb-16" id="toc">
	<h1>Table <em>of</em> Contents:</h1>
	<ol class='list-none'>${
		chapters.map((chapter, index) => html`
			<li class='ml-6 pt-1'><a href='${chapter.link}'>
				${chapter.current
					? html`<b class='text-bold text-sepia-600 dark:text-gray-600'>${chapter.name}</b>`
					: html`<span>${chapter.name}</span>`
				}
			</a></li>
		`).join('')
	}</ol>
</div>`
module.exports.toc = toc

