<template>
	<form @submit="submit" class="p-8 flex flex-col justify-center items-center relative h-screen">
		<h1 class='pb-4'>Enter URL and enter Reader</h1>
		<p v-if='showInvalidUrl' class='text-lg text-sepia-700 dark:text-gray-400 pt-4 pb-8'>URL '{{ url }}' is not valid.</p>
		<input class='mt-4 p-4 w-full rounded bg-white dark:bg-blackop-40 border-2 border-sepia-300 dark:border-gray-700 focus:border-sepia-500 dark:focus:border-gray-500 outline-none' type="text" name="url" v-model="url" autocomplete="off"/>
		<button class='mt-12 py-2 px-4 md:px-6 lg:px-8 rounded bg-sepia-400 dark:bg-blackop-40 disabled:opacity-25 disabled:cursor-not-allowed' :disabled="invalidUrl" type="submit">Read this page</button>
		<hr class="w-1/3 border border-sepia-200 dark:border-gray-700 my-8" />
		<p class='text-center'>Handy bookmarklet: <a class='m-2 py-2 px-4 md:px-6 lg:px-8 rounded bg-sepia-400 dark:bg-blackop-40' href="javascript:(function()%7Bwindow.location%3D%22https%3A%2F%2Freader.adamkiss.com%2F%22%2BencodeURIComponent(window.location.href)%7D)()">👓 Reader</a></p>
	</form>
</template>

<script>
const isUrlValid = require('~/lib/is-valid-url')

export default {
	data() {
		return {
			url: ''
		}
	},
	computed: {
		invalidUrl: function() {
			return !isUrlValid(this.url)
		},
		showInvalidUrl: function() {
			return this.invalidUrl && this.url !== ''
		}
	},
	methods: {
		submit: function (event) {
			event.preventDefault()

			if (this.invalidUrl) return

			this.$router.push(`/${encodeURIComponent(this.url)}`)
		}
	}
}
</script>

<style>
</style>
