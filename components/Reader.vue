<template>
	<article class="container">
		<h2 v-if='headline' class="py-4 text-center font-headline">{{ headline }}</h2>
		<div class="styled-html" v-html='content'></div>
	</article>
</template>

<script>
export default {
	props: ['headline', 'content']
}
</script>

<style>

</style>
