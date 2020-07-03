<template>
	<div
		class="fixed block w-12 h-12 md:w-20 md:h-20 flex justify-center items-center rounded-full bg-white dark:bg-blackop-40 cursor-pointer"
		style="right: 2rem; bottom: 2rem;" @click='goTop'
	>
		<span>⤒</span>
	</div>
</template>

<script>
export default {
	methods: {
		goTop() {
			window.scroll({
				top: 0,
				left: 0,
				behavior: 'smooth'
			})
		}
	}
}
</script>

<style>

</style>
