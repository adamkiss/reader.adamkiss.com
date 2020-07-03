<template>
	<div>{{ story }}, {{ chapter }}</div>
</template>

<script>
export default {
	asyncData ({params}) {
		return {
			story: params.story,
			chapter: params.chapter
		}
	}
}
</script>

<style>

</style>
