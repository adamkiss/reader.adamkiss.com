<template>
	<div>{{ story }}</div>
</template>

<script>
export default {
	asyncData ({params}) {
		return {
			story: params.story
		}
	}
}
</script>

<style>

</style>
