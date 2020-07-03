<template></template>

<script>
export default {
	asyncData({redirect, params}) {
		redirect(`/hpffa/${params.story}/1`)
		return
	}
}
</script>

<style>

</style>
