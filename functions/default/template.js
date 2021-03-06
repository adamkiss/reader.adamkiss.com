const {html} = require('fake-lit')
const {scrollToTop, reader} = require('../shared/components')

module.exports = d => html`
	<header class='px-8 py-4 sm:py-6 md:py-8 lg:py-12 text-center'>
		<h1 class='tracking-wider font-headline text-3xl leading-tight'>${d.title}</h1>
		<p class='flex items-center justify-center'><span class='italic text-sepia-500 dark:text-gray-400'>from </span><a class='italic underline' href='${d.url}' target='_blank'>${d.domain}</a><span class='px-2 text-base'>◆</span><a href='/'>home</a></p>
	</header>

	<hr class='border-sepia-200 dark:border-gray-700' />

	${reader(d.content, d.headline)}

	<hr class='border-sepia-200 dark:border-gray-700' />

	<div class="flex justify-center items-center px-8 py-16">
		<a href='/'>Back home</a><span class='px-4 text-base'>◆</span><a href='${d.url}' class='underline' target='_blank'>Visit original</a>
	</div>

	${scrollToTop()}
`
