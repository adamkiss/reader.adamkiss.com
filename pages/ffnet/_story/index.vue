<template></template>

<script>
export default {
	asyncData({redirect, params}) {
		redirect(`/ffnet/${params.story}/1`)
		return
	}
}
</script>

<style>

</style>
